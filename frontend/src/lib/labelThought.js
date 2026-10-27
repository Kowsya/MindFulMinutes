/** Turns "I will fail" into "I am having the thought that I will fail". Pure and local. */
export function labelThought(raw) {
  const text = String(raw ?? '')
    .trim()
    .replace(/[.!?\s]+$/, '')
  if (!text) return ''
  if (/^i am having the thought that/i.test(text)) return text
  return `I am having the thought that ${text}`
}
