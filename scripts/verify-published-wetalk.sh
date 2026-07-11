#!/usr/bin/env bash

set -euo pipefail

origin=${1:?"Usage: verify-published-wetalk.sh <site-origin>"}
url="${origin%/}/wetalk/"
page=$(curl --fail --silent --show-error --location --max-time 30 "$url")

if ! grep -Fq "Private discussion for institutional knowledge" <<<"$page"; then
	printf 'Unexpected response from %s\n' "$url" >&2
	exit 1
fi

printf 'Verified %s\n' "$url"
