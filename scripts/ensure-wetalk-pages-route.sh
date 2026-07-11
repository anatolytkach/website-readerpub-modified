#!/usr/bin/env bash

set -euo pipefail

host=${1:?"Usage: ensure-wetalk-pages-route.sh <host>"}
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
unexpected_script=$(jq -r --arg pattern "$pattern" '.result[] | select(.pattern == $pattern and .script != null and .script != "readerpub-wetalk") | .script' <<<"$routes")

if [[ -n "$unexpected_script" ]]; then
	printf 'Unexpected Worker route on %s: %s\n' "$pattern" "$unexpected_script" >&2
	exit 1
fi

route_ids=$(jq -r --arg pattern "$pattern" '.result[] | select(.pattern == $pattern and .script == "readerpub-wetalk") | .id' <<<"$routes")

while IFS= read -r route_id; do
	[[ -z "$route_id" ]] && continue
	curl --fail --silent --show-error -X DELETE -H "Authorization: Bearer $token" "https://api.cloudflare.com/client/v4/zones/$zone_id/workers/routes/$route_id" >/dev/null
done <<<"$route_ids"

printf 'Released %s for the Pages site.\n' "$pattern"
