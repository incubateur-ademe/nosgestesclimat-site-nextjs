#!/usr/bin/env bash
#
# scalingo-copy-db-url-to-site-review-apps.sh
#
# Copies the DATABASE_URL of every existing Scalingo server review app
#   nosgestesclimat-preprod-pr<PR_NUMBER>
# to the corresponding site review app
#   nosgestesclimat-site-preprod-pr<PR_NUMBER>
# for all review apps.
#
# This mirrors what apps/server/scripts/review-app-postdeploy.sh does per-PR
# (step "Push DATABASE_URL to site review app"), but is meant as a manual /
# one-shot op over *all* existing review apps at once (e.g. to backfill review
# apps whose postdeploy hook failed or predates this logic).
#
# Uses the official Scalingo v1 API directly (no FGP route).
#
# Discovery: server review apps are not guessed by scanning the whole account.
# They are listed, scoped to the parent application, via
#   GET /v1/apps/<SERVER_PARENT_APP>/scm_repo_link/review_apps
# which returns only that parent's review apps (small, single-page payload) and
# is the authoritative source of "which review apps actually exist". This is far
# faster and cheaper than GET /v1/apps (which lists every app in the account).
#
# Auth (identical to the official go-scalingo client / Scalingo CLI):
#   A dashboard "account token" is NOT usable directly against the platform API.
#   It must first be exchanged (auth.scalingo.com) for a short-lived Bearer JWT
#   (~1h). The script does that exchange automatically once, then sends the
#   Bearer token on every platform-API request.
#
# Required environment variables:
#   SCALINGO_API_TOKEN - Long-lived account token created on
#                        https://dashboard.scalingo.com/account/tokens
#
# Optional environment variables:
#   SCALINGO_API_URL  - Platform API base URL, no trailing slash, default
#                       "https://api.osc-fr1.scalingo.com"
#   SCALINGO_AUTH_URL - Auth API base URL (token exchange), default
#                       "https://auth.scalingo.com"
#   SERVER_PARENT_APP - Parent app whose review apps hold the DATABASE_URL,
#                       default "nosgestesclimat-preprod"
#   SERVER_APP        - Name prefix of the server review apps, default
#                       "nosgestesclimat-preprod-pr" (derived automatically)
#   SITE_APP          - Name prefix of the site review apps, default
#                       "nosgestesclimat-site-preprod-pr"
#   PR_NUMBERS        - Optional whitespace-separated explicit list of PR numbers
#                       to process (default "all" review apps).
#   DRY_RUN           - Set to a non-empty value to only show what would be done.
#
# Notes:
#   - The site sibling <SITE_APP><PR> is only updated if it exists
#     (guarded with an HTTP 200 check on /v1/apps/<site>).
#   - DATABASE_URL is a per-app secret; each server app's value is forwarded to
#     its own site sibling (purposely NOT broadcast from one app to many).
#   - Restarting the site review apps is intentionally NOT done here; Scalingo
#     only injects env vars on container start.
#   - Every curl carries connect/max timeouts so the script can never hang
#     silently on a stalled connection.

set -euo pipefail

: "${SCALINGO_API_TOKEN:?SCALINGO_API_TOKEN is required}"

SCALINGO_API_URL="${SCALINGO_API_URL:-https://api.osc-fr1.scalingo.com}"
SCALINGO_AUTH_URL="${SCALINGO_AUTH_URL:-https://auth.scalingo.com}"
SERVER_PARENT_APP="${SERVER_PARENT_APP:-nosgestesclimat-preprod}"
SERVER_APP="${SERVER_APP:-${SERVER_PARENT_APP}-pr}"
SITE_APP="${SITE_APP:-nosgestesclimat-site-preprod-pr}"

CURL_TIMEOUT=(--connect-timeout 10 --max-time 30)

# ---- 0. Exchange the account token for a short-lived Bearer JWT ---------
# POST https://auth.scalingo.com/v1/tokens/exchange, basic auth with the
# account token as password (username empty), no body. Returns {"token": ...}.
echo "Exchanging account token for a Bearer token (${SCALINGO_AUTH_URL}/v1/tokens/exchange)..."
exchange_code="$(mktemp)"
trap 'rm -f "$exchange_code"' EXIT
EXCHANGE_BODY="$(curl -sS "${CURL_TIMEOUT[@]}" -X POST \
  -w '\n%{http_code}' \
  -H "Accept: application/json" \
  -u ":${SCALINGO_API_TOKEN}" \
  "${SCALINGO_AUTH_URL}/v1/tokens/exchange")"
code="${EXCHANGE_BODY##*$'\n'}"
EXCHANGE_BODY="${EXCHANGE_BODY%$'\n'*}"
if [[ "$code" != "200" ]]; then
  echo "::error::Token exchange failed (HTTP $code). Check SCALINGO_API_TOKEN." >&2
  exit 1
fi
BEARER="$(printf '%s' "$EXCHANGE_BODY" | jq -r '.token // empty')"
if [[ -z "$BEARER" ]]; then
  echo "::error::Token exchange returned no token." >&2
  exit 1
fi
AUTH_HEADER="Authorization: Bearer ${BEARER}"

curl_json() { # method, url
  curl -sSf "${CURL_TIMEOUT[@]}" -X "$1" \
    -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -H "${AUTH_HEADER}" \
    "$2"
}

app_exists() { # app_name -> 0 if it exists (HTTP 200)
  local code
  code="$(curl -sS "${CURL_TIMEOUT[@]}" -o /dev/null -w "%{http_code}" \
    -H "Accept: application/json" -H "${AUTH_HEADER}" \
    "${SCALINGO_API_URL}/v1/apps/$1" || true)"
  [[ "$code" = "200" ]]
}

# ---- 1. Enumerate server review apps ------------------------------------
# Scoped listing of review apps of the server parent app.
REVIEWS_BODY="$(curl_json GET \
  "${SCALINGO_API_URL}/v1/apps/${SERVER_PARENT_APP}/scm_repo_link/review_apps")"

declare -a SERVER_APPS=()
while read -r name; do
  [[ -z "$name" ]] && continue
  # server review app names end in -pr<digits>
  [[ ! "$name" =~ ^${SERVER_APP}[0-9]+$ ]] && continue
  SERVER_APPS+=("$name")
done < <(printf '%s' "$REVIEWS_BODY" | jq -r '.review_apps[]?.app_name' 2>/dev/null || true)

# Optionally restrict to an explicit list of PR numbers.
if [[ -n "${PR_NUMBERS:-}" ]]; then
  declare -a SELECTED=()
  for pr in $PR_NUMBERS; do
    [[ "$pr" =~ ^[0-9]+$ ]] || continue
    SELECTED+=("${SERVER_APP}${pr}")
  done
  declare -a SEL=()
  for cand in "${SERVER_APPS[@]}"; do
    for want in "${SELECTED[@]}"; do
      [[ "$cand" == "$want" ]] && SEL+=("$cand") && break
    done
  done
  mapfile -t SERVER_APPS < <(printf '%s\n' "${SEL[@]}" | sort -u)
fi

if [[ ${#SERVER_APPS[@]} -eq 0 ]]; then
  echo "No server review app '${SERVER_APP}<NNN>' found/selected. Nothing to do."
  exit 0
fi
echo "  ${#SERVER_APPS[@]} server review app(s):"
printf '    - %s\n' "${SERVER_APPS[@]}"
if [[ -n "${DRY_RUN:-}" ]]; then echo "DRY_RUN: no API change performed."; fi

# ---- 2. For each server app, push its DATABASE_URL to the site sibling ----
updated=0
skipped_no_site=0
skipped_no_db=0
for server in "${SERVER_APPS[@]}"; do
  pr="${server#${SERVER_APP}}" # bare PR number, e.g. "42"
  site="${SITE_APP}${pr}"      # site sibling name
  echo "── $server → $site ───────────────"

  # a) skip if the matching site app doesn't exist
  if ! app_exists "$site"; then
    echo "  ! site app '$site' does not exist. Skipped."
    ((skipped_no_site++)) || true
    continue
  fi

  # b) read SCALINGO_POSTGRESQL_URL from the server review app
  db="$(curl_json GET "${SCALINGO_API_URL}/v1/apps/${server}/variables" |
    jq -r '.variables[]? | select(.name == "SCALINGO_POSTGRESQL_URL") | .value')"
  if [[ -z "$db" || "$db" = "null" ]]; then
    echo "  ! SCALINGO_POSTGRESQL_URL not set on '$server'. Skipped."
    ((skipped_no_db++)) || true
    continue
  fi

  echo "  pushing DATABASE_URL of '$server' onto '$site'"
  ((updated++)) || true

  [[ -n "${DRY_RUN:-}" ]] && continue

  # c) push it (idempotent create-or-update of the single variable).
  payload="$(jq -nc --arg val "$db" \
    '{ variables: [ { name: "DATABASE_URL", value: $val } ] }')"
  curl -sSf "${CURL_TIMEOUT[@]}" -X PUT \
    -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -H "${AUTH_HEADER}" \
    "${SCALINGO_API_URL}/v1/apps/${site}/variables" \
    -d "$payload" >/dev/null ||
    {
      echo "  !! failed to set DATABASE_URL on '$site' (HTTP $?)" >&2
      ((updated--)) || true
    }
done

echo
echo "Done: ${updated} updated, ${skipped_no_site} skipped (no site sibling), ${skipped_no_db} skipped (no DATABASE_URL on server)."
[[ -z "${DRY_RUN:-}" ]] || echo "(run without DRY_RUN to apply)"
echo "Reminder: env changes apply at next container start / deploy of the site review apps."
