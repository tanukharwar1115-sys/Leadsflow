import { Construction } from 'lucide-react'
import PageHeader from '../ui/PageHeader'
import EmptyState from './EmptyState'

// Honest placeholder for modules that are not built yet.
export default function PlaceholderPage({ title, description }) {
  return (
    <>
      <PageHeader title={title} description={description} />
      <EmptyState icon={Construction} title={`${title} is coming soon`} description="This module has not been built yet." />
    </>
  )
}
