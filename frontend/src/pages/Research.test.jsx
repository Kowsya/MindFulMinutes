import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Research from './Research.jsx'
import research from '../data/research.json'

describe('Research page', () => {
  it('renders one card per source with a safe external link', () => {
    render(<Research />)
    const links = screen.getAllByRole('link', { name: /Read the original source/ })
    expect(links).toHaveLength(research.items.length)
    for (const a of links) {
      expect(a).toHaveAttribute('target', '_blank')
      expect(a.getAttribute('rel')).toContain('noopener')
      expect(a.getAttribute('href')).toMatch(/^https:\/\//)
    }
  })

  it('filters by source type', async () => {
    const user = userEvent.setup()
    render(<Research />)
    const group = screen.getByRole('group', { name: /filter/i })
    await user.click(within(group).getByRole('button', { name: 'Experimental study' }))
    expect(screen.getAllByRole('link', { name: /Read the original source/ })).toHaveLength(
      research.items.filter((i) => i.type === 'Experimental study').length,
    )
  })
})
