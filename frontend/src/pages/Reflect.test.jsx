import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Reflect from './Reflect.jsx'

describe('Reflect page (privacy)', () => {
  it('renders typed text as plain text, never as HTML', async () => {
    const user = userEvent.setup()
    const { container } = render(<Reflect />)
    await user.type(screen.getByLabelText('A thought'), '<img src=x onerror=alert(1)>')
    await user.click(screen.getByRole('button', { name: /Rephrase/ }))
    expect(screen.getByTestId('labelled').textContent).toContain('<img src=x onerror=alert(1)>')
    expect(container.querySelector('img')).toBeNull()
  })

  it('does not write anything to browser storage', async () => {
    const user = userEvent.setup()
    render(<Reflect />)
    await user.type(screen.getByLabelText('A thought'), 'I will fail')
    await user.click(screen.getByRole('button', { name: /Rephrase/ }))
    await user.click(screen.getByRole('button', { name: 'Show a prompt' }))
    expect(localStorage.length).toBe(0)
    expect(sessionStorage.length).toBe(0)
  })

  it('shows a reflection prompt on request', async () => {
    const user = userEvent.setup()
    render(<Reflect />)
    await user.click(screen.getByRole('button', { name: 'Show a prompt' }))
    expect(screen.getByText('What did I notice without judging it?')).toBeInTheDocument()
  })
})
