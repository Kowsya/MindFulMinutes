import { describe, expect, it } from 'vitest'
import article from './article.json'
import exercise from './exercise.json'
import research from './research.json'

const allText = JSON.stringify({ article, exercise, research }).toLowerCase()

describe('content coverage', () => {
  it('covers every required article theme', () => {
    for (const theme of article.themes) {
      expect(article.sections.some((s) => s.themes.includes(theme)), theme).toBe(true)
    }
  })

  it('every section has the three parts', () => {
    for (const s of article.sections) {
      expect(s.idea && s.simple && s.example, s.id).toBeTruthy()
    }
  })

  it('section ids are unique', () => {
    const ids = article.sections.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('research data', () => {
  it('each item has required fields and an https URL', () => {
    for (const i of research.items) {
      for (const f of ['id', 'topic', 'type', 'title', 'organisation', 'investigated', 'relevance', 'url']) {
        expect(i[f], `${i.id}.${f}`).toBeTruthy()
      }
      expect(i.url, i.id).toMatch(/^https:\/\/[^\s]+$/)
    }
  })

  it('has no duplicate URLs or ids', () => {
    const urls = research.items.map((i) => i.url)
    const ids = research.items.map((i) => i.id)
    expect(new Set(urls).size).toBe(urls.length)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('exercise safety', () => {
  it('states that stopping is always allowed', () => {
    expect(exercise.stopAnytime).toBe(true)
    expect(allText).toContain('stop at any time')
  })

  it('does not promise an emotional outcome or a cure', () => {
    const exerciseText = JSON.stringify(exercise).toLowerCase()
    for (const phrase of ['you will feel calm', 'you will feel better', 'guaranteed', 'cure']) {
      expect(exerciseText.includes(phrase), phrase).toBe(false)
    }
  })
})
