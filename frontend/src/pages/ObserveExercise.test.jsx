import { describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import ObserveExercise from './ObserveExercise.jsx'
import exercise from '../data/exercise.json'

const setup = () => {
  const user = userEvent.setup()
  render(
    <MemoryRouter>
      <ObserveExercise />
    </MemoryRouter>,
  )
  return user
}

const steps = exercise.steps

describe('Observe exercise', () => {
  it('shows a Start button and no steps before starting', () => {
    setup()
    expect(screen.getByRole('button', { name: 'Start exercise' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Stop and exit' })).not.toBeInTheDocument()
  })

  it('shows the first instruction after starting', async () => {
    const user = setup()
    await user.click(screen.getByRole('button', { name: 'Start exercise' }))
    expect(screen.getByRole('heading', { name: steps[0].title })).toBeInTheDocument()
    expect(screen.getByText(`Step 1 of ${steps.length}`)).toBeInTheDocument()
  })

  it('moves to the next and back to the previous step', async () => {
    const user = setup()
    await user.click(screen.getByRole('button', { name: 'Start exercise' }))
    await user.click(screen.getByRole('button', { name: 'Next step' }))
    expect(screen.getByRole('heading', { name: steps[1].title })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Previous' }))
    expect(screen.getByRole('heading', { name: steps[0].title })).toBeInTheDocument()
  })

  it('disables Previous on the first step', async () => {
    const user = setup()
    await user.click(screen.getByRole('button', { name: 'Start exercise' }))
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled()
  })

  it('can be stopped at any step and restarted', async () => {
    const user = setup()
    await user.click(screen.getByRole('button', { name: 'Start exercise' }))
    await user.click(screen.getByRole('button', { name: 'Next step' }))
    await user.click(screen.getByRole('button', { name: 'Stop and exit' }))
    expect(screen.getByRole('heading', { name: exercise.stopped.title })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Start again' }))
    expect(screen.getByRole('heading', { name: steps[0].title })).toBeInTheDocument()
  })

  it('finishes on the last step without getting stuck', async () => {
    const user = setup()
    await user.click(screen.getByRole('button', { name: 'Start exercise' }))
    for (let i = 0; i < steps.length - 1; i++) {
      await user.click(screen.getByRole('button', { name: 'Next step' }))
    }
    await user.click(screen.getByRole('button', { name: 'Finish' }))
    expect(screen.getByRole('heading', { name: exercise.completion.title })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Do it again' }))
    expect(screen.getByRole('heading', { name: steps[0].title })).toBeInTheDocument()
  })

  it('supports keyboard: arrows navigate and Escape stops', async () => {
    const user = setup()
    await user.click(screen.getByRole('button', { name: 'Start exercise' }))
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('heading', { name: steps[1].title })).toBeInTheDocument()
    await user.keyboard('{ArrowLeft}')
    expect(screen.getByRole('heading', { name: steps[0].title })).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.getByRole('heading', { name: exercise.stopped.title })).toBeInTheDocument()
  })

  it('auto-advances gently when the timer is on, and never past the last step', () => {
    vi.useFakeTimers()
    try {
      render(
        <MemoryRouter>
          <ObserveExercise />
        </MemoryRouter>,
      )
      fireEvent.click(screen.getByLabelText(/Move on gently/))
      fireEvent.click(screen.getByRole('button', { name: 'Start exercise' }))
      for (let i = 0; i < steps.length + 2; i++) {
        act(() => {
          vi.advanceTimersByTime(31000)
        })
      }
      expect(screen.getByRole('heading', { name: steps[steps.length - 1].title })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Finish' })).toBeInTheDocument()
    } finally {
      vi.useRealTimers()
    }
  })
})
