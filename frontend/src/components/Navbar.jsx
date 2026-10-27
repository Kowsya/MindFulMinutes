import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme.js'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/understand', label: 'Understand' },
  { to: '/observe', label: 'Observe' },
  { to: '/research', label: 'Research' },
  { to: '/reflect', label: 'Reflect' },
  { to: '/about', label: 'About' },
]

function Ring() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="6" fill="rgb(var(--tide))" />
      <circle cx="16" cy="16" r="13" fill="none" stroke="rgb(var(--tide))" strokeWidth="1.5" />
    </svg>
  )
}

export default function Navbar() {
  const [theme, toggle] = useTheme()
  const dusk = theme === 'dusk'

  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-3">
        <Link to="/" className="flex items-center gap-2 font-serif text-2xl text-ink">
          <Ring />
          MindfulMinutes
        </Link>
        <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
          <nav aria-label="Main" className="flex flex-wrap items-center gap-1">
            {links.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 text-[0.95rem] ${
                    isActive ? 'bg-glow text-ink' : 'text-muted hover:text-ink'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <button
            type="button"
            onClick={toggle}
            aria-pressed={dusk}
            className="btn btn-quiet !min-h-[40px] !px-4 !py-1.5 text-[0.9rem]"
          >
            {dusk ? 'Dusk theme' : 'Dawn theme'}
          </button>
        </div>
      </div>
    </header>
  )
}
