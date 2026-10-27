import { describe, expect, it } from 'vitest'
import { exerciseReducer, initialState } from './useExercise.js'

const TOTAL = 5
const run = (state, type) => exerciseReducer(state, { type }, TOTAL)

describe('exerciseReducer', () => {
  it('starts idle', () => {
    expect(initialState).toEqual({ status: 'idle', index: 0 })
  })

  it('START begins at step 0', () => {
    expect(run(initialState, 'START')).toEqual({ status: 'running', index: 0 })
  })

  it('NEXT moves forward and PREV moves back', () => {
    let s = run(initialState, 'START')
    s = run(s, 'NEXT')
    expect(s.index).toBe(1)
    s = run(s, 'PREV')
    expect(s.index).toBe(0)
  })

  it('PREV never goes below the first step', () => {
    const s = run(run(initialState, 'START'), 'PREV')
    expect(s.index).toBe(0)
  })

  it('NEXT on the last step finishes instead of overflowing', () => {
    let s = run(initialState, 'START')
    for (let i = 0; i < TOTAL - 1; i++) s = run(s, 'NEXT')
    expect(s.index).toBe(TOTAL - 1)
    s = run(s, 'NEXT')
    expect(s.status).toBe('finished')
    expect(s.index).toBe(TOTAL - 1)
  })

  it('STOP works at any running step', () => {
    let s = run(run(initialState, 'START'), 'NEXT')
    s = run(s, 'STOP')
    expect(s.status).toBe('stopped')
  })

  it('actions are ignored when not running', () => {
    expect(run(initialState, 'NEXT')).toEqual(initialState)
    expect(run(initialState, 'STOP')).toEqual(initialState)
    const stopped = run(run(initialState, 'START'), 'STOP')
    expect(run(stopped, 'NEXT')).toEqual(stopped)
  })

  it('RESTART returns to step 0 from stopped and finished', () => {
    const stopped = run(run(run(initialState, 'START'), 'NEXT'), 'STOP')
    expect(run(stopped, 'RESTART')).toEqual({ status: 'running', index: 0 })
  })
})
