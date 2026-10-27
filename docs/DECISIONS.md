# Architecture decisions

## Implemented
1. **Static content, no runtime LLM.** Article text, exercise steps and research links are curated JSON. This avoids hallucinated claims about health and keeps the site deterministic and testable.
2. **Content separated from UI (DRY, orthogonality).** `src/data/*.json` holds content; one `ResearchCard`, one `ArticleCard`, one `Navbar`, one `ExternalLink`. Changing a research link cannot break the exercise.
3. **Exercise as a deep module.** `useExercise` exposes `start/next/prev/stop/restart` and `status/step/progress`; the transitions live in a pure reducer (`exerciseReducer`) that is unit tested. The page only renders.
4. **Exercise is optional and stoppable.** A visible "Stop and exit" button, Escape key, no forced breathing rhythm, timer is opt-in, and the completion message does not assume the user feels better.
5. **No personal data.** Reflection prompts are display-only. The wording tool keeps text in React state only. The only browser storage is the theme name.
6. **HashRouter + relative base.** Deep links work on GitHub Pages without server rewrites.
7. **Curated sources with cautions.** Each card says what was studied and what it does not show. `manuallyVerified` makes unchecked sources visible to the evaluation script.
8. **Backend kept small and meaningful.** FastAPI serves the same research JSON (single source of truth) plus a health check, restricted CORS (GET only), and generic 500 messages. The frontend does not depend on it.

## Proposed (not implemented)
- Optional journal with local-only encrypted storage.
- Hindi translation of the explainer.
- Automated axe accessibility test in CI.
