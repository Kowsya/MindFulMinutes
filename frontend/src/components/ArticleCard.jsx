import { Link } from 'react-router-dom'

const BADGE = {
  article: 'From the article',
  research: 'Article meets research',
}

export default function ArticleCard({ section }) {
  const { id, heading, idea, simple, example, note, kind, link } = section
  const headingId = `${id}-heading`

  return (
    <article id={id} aria-labelledby={headingId} className="panel scroll-mt-6">
      <p className="mb-2 inline-block rounded-full bg-glow px-3 py-0.5 text-[0.85rem] text-ink">
        {BADGE[kind] ?? BADGE.article}
      </p>
      <h2 id={headingId} className="text-2xl sm:text-[1.75rem]">
        {heading}
      </h2>
      <dl className="mt-4 space-y-4">
        <div>
          <dt className="font-semibold">The idea from the article</dt>
          <dd className="prose-limit text-muted">{idea}</dd>
        </div>
        <div>
          <dt className="font-semibold">In simple words</dt>
          <dd className="prose-limit text-muted">{simple}</dd>
        </div>
        <div>
          <dt className="font-semibold">An everyday example</dt>
          <dd className="prose-limit text-muted">{example}</dd>
        </div>
      </dl>
      {note && <p className="mt-4 border-l-2 border-dusk pl-3 text-[0.95rem] italic text-muted">{note}</p>}
      {link && (
        <Link to={link} className="mt-4 inline-block font-medium text-tide underline underline-offset-4">
          See the research
        </Link>
      )}
    </article>
  )
}
