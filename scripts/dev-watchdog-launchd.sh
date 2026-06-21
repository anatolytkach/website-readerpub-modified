#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LABEL="com.readerpub.modified.dev-watchdog"
DOMAIN="gui/$(id -u)"
PLIST="${ROOT_DIR}/scripts/${LABEL}.plist"
STATE_DIR="${ROOT_DIR}/.astro/dev-watchdog"

mkdir -p "$STATE_DIR"
cd "$ROOT_DIR"

is_loaded() {
  launchctl print "${DOMAIN}/${LABEL}" >/dev/null 2>&1
}

start_service() {
  if is_loaded; then
    launchctl bootout "${DOMAIN}/${LABEL}" >/dev/null 2>&1 || true
  fi

  launchctl bootstrap "$DOMAIN" "$PLIST"
  launchctl kickstart -k "${DOMAIN}/${LABEL}"
  launchctl print "${DOMAIN}/${LABEL}" >/dev/null
  printf 'Started %s at http://127.0.0.1:4321/\n' "$LABEL"
}

stop_service() {
  if is_loaded; then
    launchctl bootout "${DOMAIN}/${LABEL}" >/dev/null
    printf 'Stopped %s\n' "$LABEL"
  else
    printf '%s is not loaded\n' "$LABEL"
  fi
}

status_service() {
  if is_loaded; then
    launchctl print "${DOMAIN}/${LABEL}"
  else
    printf '%s is not loaded\n' "$LABEL"
    return 1
  fi
}

case "${1:-start}" in
  start)
    start_service
    ;;
  stop)
    stop_service
    ;;
  restart)
    stop_service || true
    start_service
    ;;
  status)
    status_service
    ;;
  *)
    printf 'Usage: %s {start|stop|restart|status}\n' "$0" >&2
    exit 2
    ;;
esac
