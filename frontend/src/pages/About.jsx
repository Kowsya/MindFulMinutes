import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import ExternalLink from '../components/ExternalLink.jsx'
import { REPO_URL } from '../config.js'

const stack = [
  ['Frontend', 'React 18 + Vite'],
  ['Styling', 'Tailwind CSS with CSS variables for the Dawn and Dusk themes'],
  ['Routing', 'React Router (hash routes, so it works on static hosting)'],
  ['Content', 'Curated JSON files: article, exercise, reflection prompts, research'],
  ['Backend (optional)', 'FastAPI + Pydantic: health check and a read-only research endpoint'],
  ['Tests', 'Vitest + Testing Library, pytest, and a Python evaluation script'],
  ['Deployment', 'GitHub Pages via GitHub Actions'],
]

export default function About() {
  useDocumentTitle('About this project')

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-4xl sm:text-5xl">How this website was built</h1>

      <section className="mt-8" aria-labelledby="scope">
        <h2 id="scope" className="text-2xl">Scope and limits</h2>
        <p className="prose-limit mt-2 text-muted">
          MindfulMinutes is an educational explainer for one article. It does not diagnose, treat or cure anything, it
          is not a replacement for professional care, and it does not claim that every exercise suits everyone. The
          article's ideas are labelled as philosophy; research is shown separately.
        </p>
      </section>

      <section className="mt-8" aria-labelledby="privacy">
        <h2 id="privacy" className="text-2xl">Privacy</h2>
        <p className="prose-limit mt-2 text-muted">
          No accounts, no analytics and no runtime AI model. Text typed into the wording exercise stays in the page and
          disappears on reload. The only thing saved in your browser is your theme choice.
        </p>
      </section>

      <section className="mt-8" aria-labelledby="stack">
        <h2 id="stack" className="text-2xl">Technology stack</h2>
        <dl className="mt-3 divide-y divide-line rounded-2xl border border-line bg-surface">
          {stack.map(([k, v]) => (
            <div key={k} className="grid gap-1 px-5 py-3 sm:grid-cols-[11rem_1fr]">
              <dt className="font-semibold">{k}</dt>
              <dd className="text-muted">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-8" aria-labelledby="quality">
        <h2 id="quality" className="text-2xl">Testing and accessibility checks</h2>
        <ul className="prose-limit mt-2 list-disc space-y-1 pl-6 text-muted">
          <li>Automated tests cover the exercise (start, next, previous, stop, restart, final step), routes and sources.</li>
          <li>An evaluation script checks theme coverage, source fields, safe links and cautious wording.</li>
          <li>Keyboard operation, visible focus, skip link, headings and reduced-motion support are built in.</li>
          <li>Results are recorded in the project's docs folder from real runs.</li>
        </ul>
      </section>

      <section className="mt-8" aria-labelledby="ai">
        <h2 id="ai" className="text-2xl">Use of an AI coding assistant</h2>
        <p className="prose-limit mt-2 text-muted">
          An AI coding assistant helped write code in small steps. Every change was read in the diff, run against the
          tests and accepted, modified or rejected by the author. The prompts and decisions are logged in the repository.
        </p>
      </section>

      {REPO_URL && (
        <p className="mt-8">
          <ExternalLink href={REPO_URL}>View the source code</ExternalLink>
        </p>
      )}
    </div>
  )
}
