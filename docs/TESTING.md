# Testing and evaluation record

Fill the **Result** column only from runs you actually did.

## Automated
| Command | What it covers | Result (passed / failed, date) |
|---|---|---|
| `cd frontend && npm test` | exercise reducer, exercise UI (start, next, previous, stop, restart, finish, keyboard, timer), routes, 404, research links, privacy (no storage, no HTML injection), content coverage | |
| `cd backend && pytest` | health, research list/filter/item, 404, hidden 500 details, CORS | |
| `python evals/run_evals.py` | themes, source fields, https URLs, safe links, secrets, html shell | |
| `cd frontend && npm run check:links` | research URLs respond (internet) | |

## Manual
| Check | How | Result |
|---|---|---|
| Mobile layout, no horizontal scroll | DevTools device mode at 375px | |
| Keyboard-only run of the exercise | Tab, Enter, arrows, Escape | |
| Lighthouse accessibility / performance | Chrome DevTools on deployed URL | |
| Each research source opened and read | Click every card link | |
| Deployed site works | Open live URL, run through all pages | |

Bugs found and fixed (write a failing test first where practical):

| Bug | Test added | Fix | Re-run result |
|---|---|---|---|
| | | | |
