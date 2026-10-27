import ReflectionCards from '../components/ReflectionCards.jsx'
import ThoughtLabeller from '../components/ThoughtLabeller.jsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

export default function Reflect() {
  useDocumentTitle('Reflect privately')
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-4xl sm:text-5xl">Reflect, privately</h1>
      <p className="prose-limit mt-4 text-lg text-muted">
        Both tools below are optional. Nothing is stored in a database, written to your device or sent to anyone,
        including any AI service.
      </p>
      <div className="mt-8 space-y-6">
        <ReflectionCards />
        <ThoughtLabeller />
      </div>
    </div>
  )
}
