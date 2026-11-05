import { Link } from 'react-router-dom'
import EmptyState from '../components/ui/EmptyState'

export default function NotFoundPage() {
  return (
    <EmptyState
      title="404 — Page not found"
      description="Yeh page exist nahi karta."
      action={<Link to="/" className="text-indigo-600 hover:underline">Go home</Link>}
    />
  )
}
