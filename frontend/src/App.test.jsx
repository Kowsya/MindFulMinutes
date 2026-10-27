import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from './App.jsx'
import article from './data/article.json'

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )

describe('App routes', () => {
  it('home shows the article title, navigation cards and the educational note', () => {
    renderAt('/')
    expect(screen.getByRole('heading', { level: 1, name: article.title })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /Understand the article/ }).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/not a substitute for professional mental health support/i).length).toBeGreaterThan(0)
  })

  it('understand page shows every section heading', () => {
    renderAt('/understand')
    for (const s of article.sections) {
      expect(screen.getByRole('heading', { name: s.heading })).toBeInTheDocument()
    }
  })

  it('an invalid route shows a clear not-found page', () => {
    renderAt('/does-not-exist')
    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
  })

  it('navigates from home to the exercise', async () => {
    const user = userEvent.setup()
    renderAt('/')
    await user.click(screen.getByRole('link', { name: 'Observe' }))
    expect(screen.getByRole('heading', { level: 1, name: 'A moment to observe' })).toBeInTheDocument()
  })

  it('sets a meaningful page title', () => {
    renderAt('/research')
    expect(document.title).toContain('research')
  })
})
