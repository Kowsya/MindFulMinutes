import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'
import { HELPLINE_NOTE } from '../config.js'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-full focus:bg-surface focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:py-14">
        <ErrorBoundary key={pathname}>
          <Outlet />
        </ErrorBoundary>
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-8 text-[0.95rem] text-muted">
          <p className="prose-limit">
            MindfulMinutes is an educational project. It is not medical advice and is not a
            substitute for professional mental health support. {HELPLINE_NOTE}
          </p>
          <p className="mt-2">Nothing you type here is stored or sent anywhere.</p>
        </div>
      </footer>
    </div>
  )
}
