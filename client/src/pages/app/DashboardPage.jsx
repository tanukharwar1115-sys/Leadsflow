import Card from '../../components/ui/Card'
import EmptyState from '../../components/ui/EmptyState'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Card>
        <EmptyState
          title="No data yet"
          description="Placeholder shell: real metrics Phase 5+ mein aayenge, auth Phase 2 mein."
        />
      </Card>
    </div>
  )
}
