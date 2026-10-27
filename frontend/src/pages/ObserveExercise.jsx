import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import exercise from '../data/exercise.json'
import { useExercise } from '../hooks/useExercise.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

function Toggle({ id, checked, onChange, children }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-[0.97rem]">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1.5 h-5 w-5 accent-[rgb(var(--tide))]"
      />
      <span>{children}</span>
    </label>
  )
}

export default function ObserveExercise() {
  useDocumentTitle('Observe your thoughts')
  const [timer, setTimer] = useState(false)
  const [pacer, setPacer] = useState(false)
  const ex = useExercise(exercise.steps, { autoAdvance: timer })

  // Keep keyboard focus inside the exercise when a panel is replaced (e.g. after Start or Stop).
  const regionRef = useRef(null)
  useEffect(() => {
    if (ex.status !== 'idle') regionRef.current?.focus()
  }, [ex.status])

  const onKeyDown = (e) => {
    if (ex.status !== 'running') return
    if (e.key === 'ArrowRight') ex.next()
    else if (e.key === 'ArrowLeft') ex.prev()
    else if (e.key === 'Escape') ex.stop()
  }

  return (
    <div className="mx-auto max-w-2xl" onKeyDown={onKeyDown}>
      <h1 className="text-4xl sm:text-5xl">{exercise.title}</h1>
      <p className="mt-2 text-muted">Optional guided practice · {exercise.duration}</p>

      {ex.status === 'idle' && (
        <section aria-labelledby="intro-title" className="panel mt-8">
          <h2 id="intro-title" className="text-2xl">
            Before you begin
          </h2>
          <p className="mt-2 text-muted">{exercise.intro}</p>
          <p className="mt-2 text-muted">{exercise.safetyNote}</p>
          <div className="mt-5 space-y-3">
            <Toggle id="timer" checked={timer} onChange={setTimer}>
              Move on gently by itself after a short time. You can still go back, forward or stop.
            </Toggle>
            <Toggle id="pacer" checked={pacer} onChange={setPacer}>
              Show a soft circle as a visual rest point. You do not need to match it with your breathing.
            </Toggle>
          </div>
          <button type="button" className="btn btn-primary mt-6" onClick={ex.start}>
            Start exercise
          </button>
        </section>
      )}

      {ex.status === 'running' && (
        <section ref={regionRef} tabIndex={-1} aria-label="Exercise" className="panel mt-8 outline-none">
          <div className="flex items-center justify-between text-[0.95rem] text-muted">
            <span>
              Step {ex.index + 1} of {ex.total}
            </span>
            {timer && !ex.isLast && <span aria-hidden="true">{ex.secondsLeft}s</span>}
          </div>
          <div
            role="progressbar"
            aria-label="Exercise progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={ex.progress}
            className="mt-2 h-2 overflow-hidden rounded-full bg-glow"
          >
            <div className="h-full rounded-full bg-tide transition-all duration-500" style={{ width: `${ex.progress}%` }} />
          </div>

          {pacer && (
            <div aria-hidden="true" className="my-6 grid place-items-center">
              <div className="h-28 w-28 animate-pacer rounded-full bg-glow ring-1 ring-tide/50" />
            </div>
          )}

          <div aria-live="polite" className="mt-6">
            <h2 className="text-3xl">{ex.step.title}</h2>
            <p className="prose-limit mt-3 text-lg">{ex.step.text}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" className="btn btn-quiet" onClick={ex.prev} disabled={ex.isFirst}>
              Previous
            </button>
            <button type="button" className="btn btn-primary" onClick={ex.next}>
              {ex.isLast ? 'Finish' : 'Next step'}
            </button>
            <button type="button" className="btn btn-quiet ml-auto" onClick={ex.stop}>
              Stop and exit
            </button>
          </div>
          <p className="mt-4 text-[0.9rem] text-muted">
            Keyboard: right arrow for next, left arrow for previous, Escape to stop.
          </p>
        </section>
      )}

      {ex.status === 'stopped' && (
        <section ref={regionRef} tabIndex={-1} aria-labelledby="stopped-title" className="panel mt-8 outline-none">
          <h2 id="stopped-title" className="text-3xl">
            {exercise.stopped.title}
          </h2>
          <p className="mt-3 text-muted">{exercise.stopped.text}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="btn btn-primary" onClick={ex.restart}>
              Start again
            </button>
            <Link to="/" className="btn btn-quiet">
              Back to home
            </Link>
          </div>
        </section>
      )}

      {ex.status === 'finished' && (
        <section ref={regionRef} tabIndex={-1} aria-labelledby="done-title" className="panel mt-8 outline-none">
          <h2 id="done-title" className="text-3xl">
            {exercise.completion.title}
          </h2>
          <p className="mt-3 text-muted">{exercise.completion.text}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/reflect" className="btn btn-primary">
              Reflect privately
            </Link>
            <button type="button" className="btn btn-quiet" onClick={ex.restart}>
              Do it again
            </button>
            <Link to="/research" className="btn btn-quiet">
              Explore the research
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
