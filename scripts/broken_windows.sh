#!/usr/bin/env bash
# Quick Broken Windows scan. Prints findings; does not change files.
cd "$(dirname "$0")/.."
echo "== TODO/FIXME markers =="
grep -rnE "TODO|FIXME|XXX" frontend/src backend/app --include=*.js --include=*.jsx --include=*.py || echo "none"
echo; echo "== debug output (console.log / print / debugger) =="
grep -rnE "console\.log|debugger|^\s*print\(" frontend/src backend/app --include=*.js --include=*.jsx --include=*.py | grep -v "\.test\." || echo "none"
echo; echo "== external links without rel=noopener (per file) =="
for f in $(grep -rl 'target="_blank"' frontend/src --include=*.jsx); do grep -q noopener "$f" || echo "$f"; done; echo "(done)"
echo; echo "== dangerouslySetInnerHTML =="
grep -rn "dangerouslySetInnerHTML" frontend/src || echo "none"
echo; echo "== possible secrets =="
grep -rnEi "(api[_-]?key|secret|password)\s*[:=]\s*['\"][^'\"]+['\"]" frontend/src backend/app || echo "none"
echo; echo "Review the output by hand; record real findings in docs/BROKEN_WINDOWS.md"
