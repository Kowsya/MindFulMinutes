# CSI 6007 Lab Exam: Answer Book draft (Task 1: Issue-focused website)

Copy these into your paper answer book **in your own words**. Items marked **[YOU]** depend on what you really did;
the book's declaration says the work is yours and AI help must be stated in Section 5.

## Section 1: Name of the conceptual article
- Assignment ticked: **H: Mind, Meditation and Mental Wellbeing ("Let Mind Think And You Simply Be")**

| Item | Entry |
|---|---|
| Article title and source | "Let Mind Think And You Simply Be", Swami Bhoomananda Tirtha, TOI SpeakingTree |
| Central argument (one sentence) | People do not need to fight every thought; they can notice thoughts, keep the useful ones, and let unwanted ones pass through self-awareness and steady practice. |
| Key issues to address (2-3) | (1) Understanding: explaining the idea in simple words. (2) Practice: a short, optional thought-observation exercise. (3) Evidence: separating the article's philosophy from what mindfulness research has studied. |
| Government / policy angle | Student and youth mental wellbeing as a public-health concern: low-cost self-help can complement, not replace, counselling and helplines (e.g. Tele-MANAS 14416 in India). The site makes no treatment claims. **[YOU: verify the helpline details]** |

**Prompt: Which facts or figures define the problem? How will you keep the work neutral / evidence-based (H is listed)?**
The article is a philosophical piece, so it has no research figures. The problem is defined by the gap between common
beliefs ("meditation means stopping thoughts") and the article's message. To stay evidence-based I label article
content as philosophy, keep research on a separate page with cautions, use only official or peer-reviewed sources with
links, and avoid claims that meditation cures conditions.

## Section 2: Tasks picked up from the lot
| Task | What it means for your article | Order attempted (1-3) | Status |
|---|---|---|---|
| 1. Issue-focused website (vibe coding) | MindfulMinutes: article explainer, guided exercise, research cards, reflection tools | 1 | **[YOU: Done / Partial]** |
| 2. Domain fine-tuned LLM (SFT + QLoRA) | Not attempted | | Not started |
| 3. Policy recommendation agent | Not attempted | | Not started |

**Prompt: Why did you choose this task?** The article is about understanding and practising, which suits an interactive
website better than a model or agent. A deterministic site also avoids hallucinated health claims, and it was achievable
in 3 hours. **[YOU: add your own reason if different]**

## Section 3: Problem definition within feasible time (3 hours)
| Item | Entry |
|---|---|
| Problem statement | Readers find meditation advice abstract and often think mindfulness means stopping thoughts. Build an educational website that explains the article, offers a safe optional exercise and links to credible research. |
| Who it serves | College students, young adults and general readers |
| In scope today | Home, article explainer, 5-step guided exercise, research cards, reflection tools, About page, tests, docs, deployment |
| Out of scope (deferred) | Accounts, journal storage, runtime AI chatbot, multi-language, fine-tuned model, policy agent |
| Success check | All pages reachable; exercise can start, move both ways, stop, restart and finish; each research card has a working link; tests pass; deployed URL works |

**Prompt: How does scope differ from the suggested one, and what simplifications?** Backend kept minimal and optional;
content is static JSON; no journal or database; research list limited to six hand-checked sources; two optional tasks skipped.

## Section 4: Homework done before the exam
**[YOU: tick only what you really did and show evidence.]** Suggested lines if true: GitHub account and repo created;
AI coding assistant set up; read the article; tried a sample website template (React/Vite/Tailwind).

| Item | What you shortlisted or prepared |
|---|---|
| Base models | [YOU] / not needed for Task 1 |
| SFT datasets | [YOU] / not needed for Task 1 |
| Website template / framework tried | [YOU] e.g. React + Vite + Tailwind starter |
| Agent framework | [YOU] / not used |

**Prompt: What did not work at home, what changed, what did preparation save?** **[YOU: write your real experience.]**

## Section 5: Technology stack and design principles (Task 1)
| Item | What you used | Why |
|---|---|---|
| AI coding assistant | **[YOU: name every assistant you used, e.g. Claude / Copilot]** | Generate and refine code in small steps; I reviewed diffs and ran tests |
| Frontend / framework / hosting | React 18 + Vite, Tailwind CSS, React Router; GitHub Pages | Fast, component reuse, responsive styling, free static hosting |
| Page sections and design ideas | Home, Understand, Observe, Research, Reflect, About; calm Dawn/Dusk themes, thought-stream hero | Calm, readable, purposeful; one memorable interaction |
| Data or charts shown | Curated JSON (article, exercise, research); no charts | Avoids invented statistics; keeps content separate from UI |

**Design principles:** [x] DRY (shared cards, one ExternalLink, JSON content) [x] Orthogonality (content, exercise logic and styling independent)
[x] Small iterations (tracer route home -> exercise first) [x] Clear documentation (README, DECISIONS, BUILD_LOG)
[x] Other: accessibility and privacy by design; test-first for exercise risks; deep module (`useExercise`).

Tasks 2 and 3 tables: leave blank (not attempted).

## Section 6: Coding issues faced
**[YOU: list only real problems.]** Format: Task 1 | error message | likely cause | what you tried | Resolved?
Typical ones you may meet: `npm install` network errors, Node version mismatch, Tailwind not applying (check
`tailwind.config.js` content paths), blank page on GitHub Pages (use HashRouter and relative base, already set).

**Prompt: What is still not working, and what next?** **[YOU]** Candidates: manual verification of all research links,
Lighthouse score improvements, Hindi version, optional local journal.

## Section 7: Deliverables and output
| Deliverable | Link / location | Uploaded? |
|---|---|---|
| GitHub repository | https://github.com/[YOU]/mindfulminutes | [YOU] |
| Website (live link or repo folder) | https://[YOU].github.io/mindfulminutes/ or `frontend/` | [YOU] |
| Colab notebook | n/a | No |
| Fine-tuned adapter | n/a | No |
| Agent code | n/a | No |
| Screenshots of outputs | `docs/screenshots/` | [YOU] |

| Task | Output achieved (what examiner can see) | Completed % |
|---|---|---|
| 1. Website | Live pages, working exercise, research cards, tests and docs | **[YOU: honest %]** |
| 2. Fine-tuned LLM | Not attempted | 0 |
| 3. Policy agent | Not attempted | 0 |
