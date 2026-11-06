import { CalendarCheck, UserCheck, UserPlus, Users } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import StatCard from '../../components/data/StatCard'
import AreaChart from '../../components/data/AreaChart'
import Badge from '../../components/ui/Badge'
import Avatar from '../../components/ui/Avatar'
import Card from '../../components/ui/Card'
import DataTable from '../../components/data/DataTable'
import { useTableData } from '../../hooks/useTableData'
import { useAuth } from '../../hooks/useAuth'
import { useTerms } from '../../hooks/useTerms'
import { mockActivity, mockLeadTrend, mockPipeline, mockRecentLeads, mockStats } from '../../features/dashboard/mockData'

const statusTone = { new: 'blue', contacted: 'amber', qualified: 'green', lost: 'slate' }
const dotTone = { blue: 'bg-blue-500', green: 'bg-emerald-500', indigo: 'bg-brand-500', amber: 'bg-amber-500', slate: 'bg-slate-400' }

const columns = [
  {
    key: 'name',
    header: 'Lead',
    sortable: true,
    render: (l) => (
      <div className="flex items-center gap-3">
        <Avatar name={l.name} size="sm" />
        <div>
          <p className="font-medium text-slate-900">{l.name}</p>
          <p className="text-xs text-slate-500">{l.email}</p>
        </div>
      </div>
    ),
  },
  { key: 'source', header: 'Source', sortable: true },
  { key: 'status', header: 'Status', sortable: true, render: (l) => <Badge tone={statusTone[l.status]} dot>{l.status}</Badge> },
  { key: 'agent', header: 'Agent', sortable: true },
  { key: 'date', header: 'Date', className: 'text-slate-500' },
]

const greeting = () => {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
}

export default function DashboardPage() {
  const { user } = useAuth()
  const t = useTerms()
  // Same hook the Leads module will use; here just for sorting (no pagination UI).
  const table = useTableData(mockRecentLeads, { pageSize: 50 })
  const total = mockPipeline[0].count + mockPipeline[1].count + mockPipeline[2].count
  const top = Math.max(...mockPipeline.map((p) => p.count))

  return (
    <>
      <PageHeader
        title={`${greeting()}, ${user.name.split(' ')[0]}`}
        description={`Here's what's happening with your ${t.lead.plural.toLowerCase()} today.`}
        badge={<Badge tone="amber">Sample data</Badge>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label={`Total ${t.lead.plural}`} {...mockStats.totalLeads} icon={Users} tone="indigo" />
        <StatCard label="New Enquiries" {...mockStats.newEnquiries} icon={UserPlus} tone="blue" />
        <StatCard label={`Qualified ${t.lead.plural}`} {...mockStats.qualifiedLeads} icon={UserCheck} tone="green" />
        <StatCard label={t.appointment.plural} {...mockStats.appointments} icon={CalendarCheck} tone="amber" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card title={`${t.lead.plural} over time`} description="New enquiries per day, last 4 weeks" className="xl:col-span-2">
          <AreaChart data={mockLeadTrend} valueLabel={t.lead.plural} />
        </Card>

        <Card title="Pipeline" description={`${total.toLocaleString()} active ${t.lead.plural.toLowerCase()}`}>
          <ul className="space-y-4">
            {mockPipeline.map((p) => (
              <li key={p.stage}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{p.stage}</span>
                  <span className="tabular-nums text-slate-500">{p.count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full rounded-full ${p.tone}`} style={{ width: `${(p.count / top) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card title={`Recent ${t.lead.plural}`} flush className="xl:col-span-2">
          <DataTable columns={columns} rows={table.pageRows} sort={table.sort} onSort={table.toggleSort} />
        </Card>

        <Card title="Activity">
          <ol className="relative space-y-5 before:absolute before:bottom-1 before:left-[3.5px] before:top-1 before:w-px before:bg-slate-200">
            {mockActivity.map((a) => (
              <li key={a.id} className="relative flex gap-3">
                <span className={`relative z-10 mt-1.5 h-2 w-2 shrink-0 rounded-full ring-4 ring-white ${dotTone[a.tone]}`} />
                <div>
                  <p className="text-sm text-slate-700">{a.text}</p>
                  <p className="text-xs text-slate-400">{a.time}</p>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </>
  )
}
