import { useState } from 'react'
import reflect from '../data/reflect.json'

/** Shows one prompt at a time. Nothing is saved, nothing is typed. */
export default function ReflectionCards() {
  const prompts = reflect.prompts
  const [index, setIndex] = useState(null)

  const another = () => {
    setIndex((current) => {
      if (current === null) return 0
      return (current + 1) % prompts.length
    })
  }

  return (
    <section aria-labelledby="reflect-title" className="panel">
      <h2 id="reflect-title" className="text-2xl">
        Reflection cards
      </h2>
      <p className="mt-1 text-muted">Think about a prompt privately. You do not need to write anything down.</p>

      <div
        className="mt-5 grid min-h-[9rem] place-items-center rounded-2xl bg-glow/60 p-6 text-center"
        aria-live="polite"
      >
        {index === null ? (
          <p className="text-muted">Choose a card when you are ready.</p>
        ) : (
          <p className="font-serif text-2xl sm:text-3xl">{prompts[index]}</p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" className="btn btn-primary" onClick={another}>
          {index === null ? 'Show a prompt' : 'Show another prompt'}
        </button>
        {index !== null && (
          <button type="button" className="btn btn-quiet" onClick={() => setIndex(null)}>
            Hide
          </button>
        )}
      </div>
    </section>
  )
}
