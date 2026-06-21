#!/usr/bin/env bash
set -u

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HOST="${HOST:-127.0.0.1}"
PORT="${PORT:-4321}"
HEALTH_URL="http://${HOST}:${PORT}/"
STATE_DIR="${ROOT_DIR}/.astro/dev-watchdog"
SERVER_LOG="${STATE_DIR}/server.log"
WATCHDOG_LOG="${STATE_DIR}/watchdog.log"
PID_FILE="${STATE_DIR}/server.pid"
STARTUP_GRACE_SECONDS="${STARTUP_GRACE_SECONDS:-30}"
CHECK_INTERVAL_SECONDS="${CHECK_INTERVAL_SECONDS:-5}"
MAX_FAILURES="${MAX_FAILURES:-3}"

mkdir -p "$STATE_DIR"
cd "$ROOT_DIR" || exit 1

server_started_at=0
health_failures=0

log() {
  printf '[%s] %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*" | tee -a "$WATCHDOG_LOG"
}

listening_pid() {
  lsof -tiTCP:"$PORT" -sTCP:LISTEN 2>/dev/null | head -n 1 || true
}

pid_command() {
  ps -p "$1" -o command= 2>/dev/null || true
}

is_project_process() {
  local pid="$1"
  local command
  command="$(pid_command "$pid")"
  [[ "$command" == *"$ROOT_DIR"* ]]
}

health_ok() {
  curl -fsS --max-time 2 "$HEALTH_URL" >/dev/null 2>&1
}

server_pid() {
  local pid=""
  if [[ -f "$PID_FILE" ]]; then
    pid="$(cat "$PID_FILE" 2>/dev/null || true)"
  fi

  if [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null; then
    printf '%s\n' "$pid"
    return 0
  fi

  pid="$(listening_pid)"
  if [[ -n "$pid" ]] && is_project_process "$pid"; then
    printf '%s\n' "$pid"
    return 0
  fi

  return 1
}

start_server() {
  local pid
  pid="$(listening_pid)"

  if [[ -n "$pid" ]]; then
    if is_project_process "$pid"; then
      log "Port $PORT is already served by this project process $pid."
      printf '%s\n' "$pid" > "$PID_FILE"
      server_started_at="$(date +%s)"
      health_failures=0
      return 0
    fi

    log "Port $PORT is occupied by another process: $(pid_command "$pid")"
    return 1
  fi

  : > "$SERVER_LOG"
  log "Starting Astro dev server at ${HEALTH_URL}"
  npm run dev -- --host "$HOST" --port "$PORT" >> "$SERVER_LOG" 2>&1 &
  pid="$!"
  printf '%s\n' "$pid" > "$PID_FILE"
  server_started_at="$(date +%s)"
  health_failures=0
  log "Astro dev server process started with pid $pid."
}

stop_server() {
  local pid=""
  if [[ -f "$PID_FILE" ]]; then
    pid="$(cat "$PID_FILE" 2>/dev/null || true)"
  fi

  if [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null && is_project_process "$pid"; then
    log "Stopping project dev server pid $pid."
    kill "$pid" 2>/dev/null || true
    sleep 1
    kill -9 "$pid" 2>/dev/null || true
  fi

  rm -f "$PID_FILE"
}

restart_server() {
  log "Restarting Astro dev server."
  stop_server
  start_server
}

trap 'log "Stopping dev watchdog."; stop_server; exit 0' INT TERM

log "Dev watchdog started for ${ROOT_DIR}."

while true; do
  if ! pid="$(server_pid)"; then
    start_server || sleep "$CHECK_INTERVAL_SECONDS"
    sleep "$CHECK_INTERVAL_SECONDS"
    continue
  fi

  printf '%s\n' "$pid" > "$PID_FILE"

  if health_ok; then
    health_failures=0
  else
    now="$(date +%s)"
    if (( now - server_started_at < STARTUP_GRACE_SECONDS )); then
      sleep "$CHECK_INTERVAL_SECONDS"
      continue
    fi

    health_failures=$((health_failures + 1))
    log "Health check failed for ${HEALTH_URL} (${health_failures}/${MAX_FAILURES})."

    if (( health_failures >= MAX_FAILURES )); then
      restart_server
    fi
  fi

  sleep "$CHECK_INTERVAL_SECONDS"
done
