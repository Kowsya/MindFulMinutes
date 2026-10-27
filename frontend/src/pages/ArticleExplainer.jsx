import { Link } from 'react-router-dom'
import article from '../data/article.json'
import ArticleCard from '../components/ArticleCard.jsx'
import MythFact from '../components/MythFact.jsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

export default function ArticleExplainer() {
  useDocumentTitle('Understand the article')

  return (
    <div className="grid gap-10 lg:grid-cols-[16rem_1fr]">
      <aside className="lg:sticky lg:top-6 lg:self-start">
        <nav aria-label="On this page">
          <p className="font-semibold">On this page</p>
          <ul className="mt-2 space-y-1 text-[0.95rem]">
            {article.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-muted hover:text-ink">
                  {s.heading.split(':')[0]}
                </a>
              </li>
            ))}
            <li>
              <a href="#myths" className="text-muted hover:text-ink">
                Common misunderstandings
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <div>
        <h1 className="text-4xl sm:text-5xl">The article, in simple words</h1>
        <p className="prose-limit mt-4 text-lg text-muted">{article.centralMessage}</p>
        <p className="prose-limit mt-3 text-[0.95rem] text-muted">{article.scopeNote}</p>
        <p className="prose-limit mt-3 rounded-xl border border-line bg-glow/40 p-3 text-[0.95rem]">
          Each card is labelled. <strong>From the article</strong> is the author's philosophical perspective, not
          scientific proof.
        </p>

        <div className="mt-8 space-y-6">
          {article.sections.map((s) => (
            <ArticleCard key={s.id} section={s} />
          ))}
        </div>

        <section id="myths" aria-labelledby="myths-title" className="mt-14 scroll-mt-6">
          <h2 id="myths-title" className="text-3xl">
            Common misunderstandings
          </h2>
          <div className="mt-5">
            <MythFact items={article.myths} />
          </div>
        </section>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link to="/observe" className="btn btn-primary">
            Try the exercise
          </Link>
          <Link to="/research" className="btn btn-quiet">
            Explore the research
          </Link>
        </div>
      </div>
    </div>
  )
}
