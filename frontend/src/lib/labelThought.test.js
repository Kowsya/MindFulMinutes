import { describe, expect, it } from 'vitest'
import { labelThought } from './labelThought.js'

describe('labelThought', () => {
  it('rephrases a thought as an observation', () => {
    expect(labelThought('I will fail the exam.')).toBe('I am having the thought that I will fail the exam')
  })
  it('returns empty text for blank input', () => {
    expect(labelThought('   ')).toBe('')
    expect(labelThought(undefined)).toBe('')
  })
  it('does not double the prefix', () => {
    expect(labelThought('I am having the thought that it is late')).toBe('I am having the thought that it is late')
  })
})
