import { useEffect, useReducer, useRef, useState } from 'react'

export const initialState = { status: 'idle', index: 0 }

/**
 * Pure state machine for the guided exercise (easy to unit test).
 * status: idle -> running -> finished | stopped
 */
export function exerciseReducer(state, action, total) {
  switch (action.type) {
    case 'START':
    case 'RESTART':
      return { status: 'running', index: 0 }
    case 'NEXT':
      if (state.status !== 'running') return state
      if (state.index >= total - 1) return { ...state, status: 'finished' }
      return { ...state, index: state.index + 1 }
    case 'PREV':
      if (state.status !== 'running') return state
      return { ...state, index: Math.max(0, state.index - 1) }
    case 'STOP':
      return state.status === 'running' ? { ...state, status: 'stopped' } : state
    case 'RESET':
      return initialState
    default:
      return state
  }
}

/** Optional, gentle per-step countdown. Never advances past the final step. */
function useStepTimer({ enabled, seconds, resetKey, onElapsed }) {
  const [left, setLeft] = useState(seconds)
  const callback = useRef(onElapsed)
  callback.current = onElapsed

  useEffect(() => {
    setLeft(seconds)
    if (!enabled) return undefined
    let remaining = seconds
    const id = setInterval(() => {
      remaining -= 1
      setLeft(remaining)
      if (remaining <= 0) {
        clearInterval(id)
        callback.current()
      }
    }, 1000)
    return () => clearInterval(id)
  }, [enabled, seconds, resetKey])

  return Math.max(left, 0)
}

/**
 * Small public interface; the state transitions stay hidden inside.
 * Returns: status, step, index, total, progress, isFirst, isLast, secondsLeft,
 * and the actions start / next / prev / stop / restart / reset.
 */
export function useExercise(steps, { autoAdvance = false } = {}) {
  const total = steps.length
  const [state, dispatch] = useReducer((s, a) => exerciseReducer(s, a, total), initialState)

  const step = steps[state.index]
  const isLast = state.index === total - 1
  const running = state.status === 'running'

  const secondsLeft = useStepTimer({
    enabled: autoAdvance && running && !isLast,
    seconds: step.seconds ?? 20,
    resetKey: `${state.status}-${state.index}`,
    onElapsed: () => dispatch({ type: 'NEXT' }),
  })

  return {
    status: state.status,
    index: state.index,
    step,
    total,
    isFirst: state.index === 0,
    isLast,
    progress: Math.round(((state.index + 1) / total) * 100),
    secondsLeft,
    start: () => dispatch({ type: 'START' }),
    next: () => dispatch({ type: 'NEXT' }),
    prev: () => dispatch({ type: 'PREV' }),
    stop: () => dispatch({ type: 'STOP' }),
    restart: () => dispatch({ type: 'RESTART' }),
    reset: () => dispatch({ type: 'RESET' }),
  }
}
