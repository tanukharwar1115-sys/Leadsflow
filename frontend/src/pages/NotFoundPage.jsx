import { Link } from 'react-router-dom'
import EmptyState from '../components/feedback/EmptyState'

export default function NotFoundPage() {
  return (
    <EmptyState
      title="404 — Page not found"
      description="This page does not exist."
      action={<Link to="/" className="text-brand-600 hover:underline">Go home</Link>}
    />
  )
}
