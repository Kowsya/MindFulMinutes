import { useState } from 'react'

export default function MythFact({ items }) {
  const [open, setOpen] = useState(null)

  return (
    <ul className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i
        const panelId = `myth-panel-${i}`
        return (
          <li key={item.myth} className="rounded-2xl border border-line bg-surface">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span>
                <span className="text-muted">Myth: </span>
                {item.myth}
              </span>
              <span aria-hidden="true" className="text-xl text-tide">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen && (
              <p id={panelId} className="prose-limit px-5 pb-4 text-muted">
                <strong className="text-ink">What is closer to the truth: </strong>
                {item.fact}
              </p>
            )}
          </li>
        )
      })}
    </ul>
  )
}
