# Security and privacy review

| Area | What to check | Status (checked / issue / n/a) | Notes |
|---|---|---|---|
| Secrets | `git log` and files contain no keys; `.env` ignored | | `.gitignore` excludes `.env` |
| User input | Wording tool renders text via React (escaped); no `dangerouslySetInnerHTML` | | test: `Reflect.test.jsx` |
| External links | `target=_blank` with `rel="noopener noreferrer"` via `ExternalLink` | | |
| Dependencies | `npm audit`, `pip list --outdated`; review versions | | |
| Backend errors | 500 returns generic message | | test: `test_unexpected_error_hides_details` |
| CORS | `ALLOWED_ORIGINS` set to the real GitHub Pages origin; GET only | | |
| Private data | No reflections stored or transmitted; only theme saved locally | | |
| Production vs local | Frontend built with relative base; backend env vars set on host | | |
