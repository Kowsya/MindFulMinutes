import { useState } from 'react'

const THOUGHTS = [
  { id: 1, text: 'I have not started revising', useful: false },
  { id: 2, text: 'What will they think of me?', useful: false },
  { id: 3, text: 'I should submit the assignment tonight', useful: true },
  { id: 4, text: 'What is for lunch?', useful: false },
  { id: 5, text: 'I am going to fail this exam', useful: false },
  { id: 6, text: 'I need to reply to that message', useful: true },
]

/** The hero's interactive moment: notice a thought instead of fighting it. */
export default function ThoughtStream() {
  const [noticed, setNoticed] = useState({})
  const [last, setLast] = useState(null)
  const count = Object.keys(noticed).length

  const notice = (t) => {
    setNoticed((n) => ({ ...n, [t.id]: true }))
    setLast(t)
  }

  const reset = () => {
    setNoticed({})
    setLast(null)
  }

  return (
    <section
      aria-labelledby="pond-title"
      className="relative overflow-hidden rounded-[2rem] border border-line bg-glow/50 p-6 sm:p-8"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid place-items-center">
        {[0, 3, 6].map((delay) => (
          <span
            key={delay}
            className="absolute h-72 w-72 animate-ripple rounded-full border border-tide/40"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
      </div>

      <div className="relative">
        <h2 id="pond-title" className="text-2xl sm:text-3xl">
          A mind with thoughts in it
        </h2>
        <p className="mt-2 text-muted">
          Tap a thought to notice it. You do not have to chase it or fight it.
        </p>

        <ul className="mt-6 flex flex-wrap gap-3">
          {THOUGHTS.map((t, i) => {
            const done = noticed[t.id]
            return (
              <li key={t.id}>
                <button
                  type="button"
                  aria-pressed={!!done}
                  onClick={() => notice(t)}
                  style={{ animationDelay: `${i * 0.7}s` }}
                  className={`rounded-full border px-4 py-2 text-left text-[0.95rem] transition-all duration-700 ${
                    done
                      ? 'border-line bg-transparent text-muted opacity-60'
                      : 'animate-bob border-tide/40 bg-surface text-ink hover:border-tide'
                  }`}
                >
                  {done ? <span className="text-[0.8rem]">I am having the thought that </span> : null}
                  {t.text}
                </button>
              </li>
            )
          })}
        </ul>

        <div className="mt-6 min-h-[3.5rem]" aria-live="polite">
          {last ? (
            <p className="text-ink">
              {last.useful
                ? 'That one is useful. Keep it, act on it when it is time, then come back to what you were doing.'
                : 'Noticed. You can let that one pass. It does not need an argument.'}
            </p>
          ) : (
            <p className="text-muted">Nothing noticed yet.</p>
          )}
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-4 text-[0.95rem] text-muted">
          <span>
            {count} of {THOUGHTS.length} noticed
          </span>
          {count > 0 && (
            <button type="button" onClick={reset} className="underline underline-offset-4">
              Reset
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
