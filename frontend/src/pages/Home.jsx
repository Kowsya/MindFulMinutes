import { Link } from 'react-router-dom'
import article from '../data/article.json'
import ThoughtStream from '../components/ThoughtStream.jsx'
import ExternalLink from '../components/ExternalLink.jsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { ARTICLE_URL } from '../config.js'

const cards = [
  { to: '/understand', title: 'Understand the article', text: 'The key ideas in simple words, each with an everyday example.' },
  { to: '/observe', title: 'Try the exercise', text: 'A two-minute, optional guide to noticing thoughts. Stop whenever you like.' },
  { to: '/research', title: 'Explore the research', text: 'Source cards that say what was studied, and what was not.' },
  { to: '/reflect', title: 'Reflect privately', text: 'A prompt to think about. Nothing is saved.' },
]

export default function Home() {
  useDocumentTitle('')

  return (
    <>
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="text-muted">Understand your thoughts. Explore mindfulness. Practise at your own pace.</p>
          <h1 className="mt-3 text-5xl sm:text-6xl">{article.title}</h1>
          <p className="prose-limit mt-5 text-lg text-muted">
            An article by {article.author} on {article.source}. MindfulMinutes turns its ideas into something you can
            read, try and question.
          </p>
          <p className="prose-limit mt-4 border-l-2 border-tide pl-4 font-serif text-2xl">
            Mindfulness is not necessarily about eliminating thoughts, but learning to notice them.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/understand" className="btn btn-primary">
              Understand the article
            </Link>
            <Link to="/observe" className="btn btn-quiet">
              Try the 2-minute exercise
            </Link>
          </div>
          {ARTICLE_URL && (
            <p className="mt-4">
              <ExternalLink href={ARTICLE_URL}>Read the original article</ExternalLink>
            </p>
          )}
        </div>
        <ThoughtStream />
      </div>

      <section aria-labelledby="start-title" className="mt-16">
        <h2 id="start-title" className="text-3xl">
          Where would you like to start?
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <li key={c.to}>
              <Link to={c.to} className="panel block h-full transition-colors hover:border-tide">
                <h3 className="text-xl">{c.title}</h3>
                <p className="mt-2 text-[0.97rem] text-muted">{c.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <aside aria-label="Important note" className="mt-12 rounded-2xl border border-dusk/40 bg-dusk/10 p-5">
        <p className="prose-limit">
          <strong>Please note:</strong> this website is educational. It is not a substitute for professional mental
          health support, and mindfulness does not suit everyone.
        </p>
      </aside>
    </>
  )
}
