import { useEffect, useState } from 'react'

const KEY = 'mm-theme'

function initialTheme() {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'dawn' || saved === 'dusk') return saved
  } catch {
    /* storage unavailable: fall through */
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dusk' : 'dawn'
}

/** Only the theme name ("dawn" or "dusk") is ever stored. No personal data. */
export function useTheme() {
  const [theme, setTheme] = useState(initialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(KEY, theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  return [theme, () => setTheme((t) => (t === 'dawn' ? 'dusk' : 'dawn'))]
}
