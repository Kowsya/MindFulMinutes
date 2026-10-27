import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

export default function NotFound() {
  useDocumentTitle('Page not found')
  return (
    <div className="mx-auto max-w-xl py-10 text-center">
      <h1 className="text-5xl">Page not found</h1>
      <p className="mt-4 text-muted">That address does not exist here. Try one of the main pages instead.</p>
      <Link to="/" className="btn btn-primary mt-6">
        Back to home
      </Link>
    </div>
  )
}
