import ExternalLink from './ExternalLink.jsx'

export default function ResearchCard({ item }) {
  const { title, topic, type, organisation, authors, year, investigated, relevance, caution, url } = item
  const credit = [authors, organisation, year].filter(Boolean).join(' · ')

  return (
    <article className="panel flex w-full flex-col" aria-label={title}>
      <p className="text-[0.9rem] text-muted">
        {topic}
        <span className="mx-2 rounded-full bg-glow px-2.5 py-0.5 text-ink">{type}</span>
      </p>
      <h3 className="mt-2 text-xl">{title}</h3>
      <p className="mt-1 text-[0.95rem] text-muted">{credit}</p>
      <dl className="mt-4 space-y-3 text-[0.97rem]">
        <div>
          <dt className="font-semibold">What it investigated</dt>
          <dd className="text-muted">{investigated}</dd>
        </div>
        <div>
          <dt className="font-semibold">Why it is relevant</dt>
          <dd className="text-muted">{relevance}</dd>
        </div>
        {caution && (
          <div className="rounded-xl border border-dusk/40 bg-dusk/10 p-3">
            <dt className="font-semibold">Keep in mind</dt>
            <dd className="text-muted">{caution}</dd>
          </div>
        )}
      </dl>
      <p className="mt-auto pt-4">
        <ExternalLink href={url}>Read the original source</ExternalLink>
      </p>
    </article>
  )
}
