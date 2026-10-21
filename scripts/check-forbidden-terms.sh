#!/usr/bin/env sh
# Blocks a commit that adds terms which must never reach this repository, such as
# the names and codes of a company whose playbook is built on this framework.
# The list is personal and lives outside every repository:
#   $PLAYBOOK_FORBIDDEN_TERMS, or ~/.config/lunette/forbidden-terms.txt
# One extended regular expression per line, matched case-insensitively; lines
# starting with # are comments. Without the file the check warns and passes.
set -eu

terms="${PLAYBOOK_FORBIDDEN_TERMS:-$HOME/.config/lunette/forbidden-terms.txt}"
if [ ! -f "$terms" ]; then
  echo "forbidden terms: no list at $terms, check skipped" >&2
  exit 0
fi

patterns=$(mktemp)
trap 'rm -f "$patterns"' EXIT
grep -v '^#' "$terms" | grep -v '^[[:space:]]*$' > "$patterns"

if [ "${1:-}" = "--all" ]; then
  matches=$(git ls-files -z | xargs -0 grep -n -i -E -f "$patterns" -- 2>/dev/null || true)
else
  matches=$(git diff --cached -U0 --no-color | grep '^+' | grep -v '^+++' | grep -n -i -E -f "$patterns" || true)
  if [ -n "$matches" ]; then
    matches=$(git diff --cached --name-only | xargs grep -l -i -E -f "$patterns" -- 2>/dev/null || true)
  fi
fi

if [ -n "$matches" ]; then
  echo "forbidden terms found, commit blocked:" >&2
  echo "$matches" >&2
  exit 1
fi
