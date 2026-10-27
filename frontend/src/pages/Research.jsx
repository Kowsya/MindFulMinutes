import { useMemo, useState } from 'react'
import research from '../data/research.json'
import ResearchCard from '../components/ResearchCard.jsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

export default function Research() {
  useDocumentTitle('Explore the research')
  const items = research.items
  const types = useMemo(() => ['All', ...new Set(items.map((i) => i.type))], [items])
  const [filter, setFilter] = useState('All')
  const shown = filter === 'All' ? items : items.filter((i) => i.type === filter)

  return (
    <div>
      <h1 className="text-4xl sm:text-5xl">Mindfulness and research</h1>
      <p className="prose-limit mt-4 text-lg text-muted">
        These sources explore ideas related to the article, such as attention, acceptance and stress. None of them
        proves the article's claims, and a source about meditation in general is not evidence for every point the
        author makes.
      </p>

      <div role="group" aria-label="Filter sources by type" className="mt-6 flex flex-wrap gap-2">
        {types.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={filter === t}
            onClick={() => setFilter(t)}
            className={`btn !min-h-[40px] !py-1.5 text-[0.92rem] ${filter === t ? 'btn-primary' : 'btn-quiet'}`}
          >
            {t}
          </button>
        ))}
      </div>
      <p className="mt-3 text-[0.95rem] text-muted" aria-live="polite">
        Showing {shown.length} of {items.length} sources
      </p>

      {shown.length === 0 ? (
        <p className="panel mt-6">No sources match this filter. Choose “All” to see every source.</p>
      ) : (
        <ul className="mt-6 grid gap-5 md:grid-cols-2">
          {shown.map((item) => (
            <li key={item.id} className="flex">
              <div className="flex w-full">
                <ResearchCard item={item} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
