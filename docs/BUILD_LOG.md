# AI build log

Record **real** prompts and decisions. Do not invent history. Rows 0 is pre-filled with what actually happened to the
starter; complete the rest as you use your assistant (Copilot or other).

| # | Prompt | Intended result | AI output | Decision | Reason | Verification |
|---|---|---|---|---|---|---|
| 0 | Request for a complete MindfulMinutes project zip with extra features, run commands, GitHub steps and answer-book content | Full starter project | React/Vite/Tailwind frontend, FastAPI backend, tests, eval script, docs | *(you: accepted / modified / rejected)* | *(your reason)* | *(you: npm test result, date)* |
| 1 | *(Phase 0 prompt: requirements, six features, safety boundaries, acceptance criteria)* | | | | | |
| 2 | *(Phase 1: scaffold)* | | | | | |
| 3 | *(Phase 3: tests first for exercise risks, see docs/TESTING.md)* | | | | | |
| 4 | *(Deep-module review prompt A)* | | | | | |
| 5 | *(Broken Windows sweep prompt C)* | | | | | |
| 6 | *(Evaluation prompt D)* | | | | | |

## Suggested prompts to adapt (from the brief)
- A. Deep-module review of the exercise: propose a small controller interface before refactoring.
- B. Identify highest-risk exercise behaviours; write tests first (start, next, previous, stop, restart, last step).
- C. Broken Windows sweep: report findings with file and severity first, then fix one category at a time.
- D. Evaluation script that reports actual results as JSON.
- E. Architecture notes separating implemented facts from proposals.

Example of a real decision worth logging: if an assistant suggests saving reflection notes in a database, reject it
(no personal data needed) and record that suggestion and your decision.
