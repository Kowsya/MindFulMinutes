# MindfulMinutes

An interactive educational website for understanding the mind, meditation and mental wellbeing, based on
**"Let Mind Think And You Simply Be"** by Swami Bhoomananda Tirtha (TOI SpeakingTree).

> Educational only. Not medical advice and not a substitute for professional mental health support.

## Issue addressed
Explanations of meditation often make mindfulness sound like stopping all thoughts. The article's message is
different: notice thoughts, recognise the useful ones, and let unwanted ones pass without fighting them.
MindfulMinutes explains that in simple words, lets you try a short optional exercise, and separates the article's
philosophy from what mindfulness research has actually studied.

## Features
| Page | What it does |
|---|---|
| Home | Article title, key message, interactive "thought stream" (tap a thought to notice it), four navigation cards, safety note |
| Understand | Five article sections (idea / simple words / everyday example), labelled philosophy vs research, myth-vs-fact cards |
| Observe | 5-step guided exercise: Start, Next, Previous, **Stop and exit**, Restart, keyboard support, optional gentle timer, optional soft visual pacer |
| Research | Six curated source cards with what was studied, relevance and a caution; filter by source type |
| Reflect | Reflection prompt cards and a "try the wording" tool. Nothing is stored or sent |
| About | Stack, scope, privacy, testing, AI-assistant use |
| Extras | Dawn/Dusk themes, skip link, reduced-motion support, error boundary, 404 page |

## Tech stack
React 18 + Vite, Tailwind CSS, React Router (hash routes), curated JSON content, optional FastAPI + Pydantic backend,
Vitest + Testing Library, pytest, Python evaluation script, GitHub Actions to GitHub Pages.

## Run locally
```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
```

## Test and evaluate
```bash
cd frontend
npm test                     # unit + UI tests (Vitest)
npm run build                # production build into frontend/dist
npm run check:links          # needs internet: do the research URLs respond?
cd ..
python evals/run_evals.py    # writes evals/results.json (real results only)
bash scripts/broken_windows.sh
```

Optional backend:
```bash
cd backend
python -m venv .venv && source .venv/bin/activate     # Windows: .venv\Scripts\activate
pip install -r requirements.txt
pytest
uvicorn app.main:app --reload --port 8000             # http://localhost:8000/docs
```

## Before you submit (things only you can do)
1. Open every link in `frontend/src/data/research.json`, confirm the description is accurate, then set `manuallyVerified` to `true`.
2. Set `REPO_URL` and `ARTICLE_URL` in `frontend/src/config.js`.
3. Run the tests and Lighthouse, then record the **actual** numbers in `docs/TESTING.md`.
4. Fill in `docs/BUILD_LOG.md` with your real prompts and decisions.

## Deployment
GitHub Actions builds and deploys `frontend/dist` to GitHub Pages on every push to `main`
(Settings > Pages > Source: GitHub Actions). Live URL: `https://<your-username>.github.io/mindfulminutes/`

## Known limitations
- Article content paraphrases the project brief's summary, not the full article text; compare with the original.
- Research links are curated by hand and must be checked by you; a working URL does not prove a claim.
- No accounts, journal or runtime AI by design (privacy and no hallucination risk).
- Automated accessibility and performance audits were not run by the generator; run Lighthouse and record results.

## AI coding assistant
The starter project was generated with an AI assistant (Claude) and then reviewed, tested and adjusted by the author.
See `docs/BUILD_LOG.md` and `docs/DECISIONS.md`.
