import { useState } from 'react'
import { labelThought } from '../lib/labelThought.js'
import reflect from '../data/reflect.json'

/** Practise the "I am having the thought that…" wording. Text stays in memory only. */
export default function ThoughtLabeller() {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')

  const submit = (e) => {
    e.preventDefault()
    setResult(labelThought(text))
  }

  const clear = () => {
    setText('')
    setResult('')
  }

  return (
    <section aria-labelledby="labeller-title" className="panel">
      <h2 id="labeller-title" className="text-2xl">
        Try the wording
      </h2>
      <p className="mt-1 text-muted">
        Type any everyday worry (or pick an example) to see it rephrased as an observation.
        Please do not enter anything very private. It stays in this browser tab and is never saved or sent.
      </p>

      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Examples">
        {reflect.labelExamples.map((ex) => (
          <li key={ex}>
            <button type="button" className="btn btn-quiet !min-h-[40px] !py-1.5 text-[0.92rem]" onClick={() => setText(ex)}>
              {ex}
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={submit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="thought-input" className="sr-only">
          A thought
        </label>
        <input
          id="thought-input"
          type="text"
          value={text}
          maxLength={160}
          onChange={(e) => setText(e.target.value)}
          placeholder="For example: I will fail the exam"
          autoComplete="off"
          className="min-h-[44px] flex-1 rounded-full border border-line bg-paper px-5 text-ink placeholder:text-muted"
        />
        <button type="submit" className="btn btn-primary">
          Rephrase as an observation
        </button>
        <button type="button" className="btn btn-quiet" onClick={clear}>
          Clear
        </button>
      </form>

      <div className="mt-4 min-h-[3.5rem]" aria-live="polite">
        {result && (
          <>
            <p data-testid="labelled" className="font-serif text-2xl">
              {result}
            </p>
            <p className="mt-2 text-[0.95rem] text-muted">
              Notice how the same words feel as a thought rather than a fact. This is a wording exercise, not a
              guarantee that the thought will go away.
            </p>
          </>
        )}
      </div>
    </section>
  )
}
