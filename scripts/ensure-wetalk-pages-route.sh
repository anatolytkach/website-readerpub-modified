#!/usr/bin/env bash

set -euo pipefail

host=${1:?"Usage: ensure-wetalk-pages-route.sh <host> <Pages router Worker>"}
router_worker=${2:?"Usage: ensure-wetalk-pages-route.sh <host> <Pages router Worker>"}
token=${CLOUDFLARE_API_TOKEN:-${CF_API_TOKEN:-}}

if [[ -z "$token" && -f "$HOME/Library/Preferences/.wrangler/config/default.toml" ]]; then
	token=$(awk -F ' = ' '/^oauth_token = /{gsub(/"/, "", $2); print $2}' "$HOME/Library/Preferences/.wrangler/config/default.toml")
fi

if [[ -z "$token" ]]; then
	printf 'Cloudflare authentication is required to release %s/wetalk*.\n' "$host" >&2
	exit 1
fi

zone_id=$(curl --fail --silent --show-error -H "Authorization: Bearer $token" "https://api.cloudflare.com/client/v4/zones?name=reader.pub" | jq -r '.result[0].id')
pattern="$host/wetalk*"
routes=$(curl --fail --silent --show-error -H "Authorization: Bearer $token" "https://api.cloudflare.com/client/v4/zones/$zone_id/workers/routes")
unexpected_script=$(jq -r --arg pattern "$pattern" --arg router_worker "$router_worker" '.result[] | select(.pattern == $pattern and .script != null and .script != "readerpub-wetalk" and .script != $router_worker) | .script' <<<"$routes")

if [[ -n "$unexpected_script" ]]; then
	printf 'Unexpected Worker route on %s: %s\n' "$pattern" "$unexpected_script" >&2
	exit 1
fi

route_ids=$(jq -r --arg pattern "$pattern" '.result[] | select(.pattern == $pattern and .script == "readerpub-wetalk") | .id' <<<"$routes")

while IFS= read -r route_id; do
	[[ -z "$route_id" ]] && continue
	curl --fail --silent --show-error -X DELETE -H "Authorization: Bearer $token" "https://api.cloudflare.com/client/v4/zones/$zone_id/workers/routes/$route_id" >/dev/null
done <<<"$route_ids"

has_router=$(jq -r --arg pattern "$pattern" --arg router_worker "$router_worker" 'any(.result[]; .pattern == $pattern and .script == $router_worker)' <<<"$routes")

if [[ "$has_router" != "true" ]]; then
	curl --fail --silent --show-error -X POST -H "Authorization: Bearer $token" -H "Content-Type: application/json" --data "{\"pattern\":\"$pattern\",\"script\":\"$router_worker\"}" "https://api.cloudflare.com/client/v4/zones/$zone_id/workers/routes" >/dev/null
fi

printf 'Reserved %s for %s.\n' "$pattern" "$router_worker"
