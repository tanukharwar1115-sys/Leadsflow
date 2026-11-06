import { useState } from 'react'
import { Plus, SearchX } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Input from '../../components/forms/Input'
import Select from '../../components/forms/Select'
import Textarea from '../../components/forms/Textarea'
import Checkbox from '../../components/forms/Checkbox'
import Switch from '../../components/forms/Switch'
import Modal from '../../components/feedback/Modal'
import ConfirmDialog from '../../components/feedback/ConfirmDialog'
import Tabs from '../../components/data/Tabs'
import SearchInput from '../../components/forms/SearchInput'
import DataTable from '../../components/data/DataTable'
import Pagination from '../../components/data/Pagination'
import EmptyState from '../../components/feedback/EmptyState'
import Skeleton from '../../components/feedback/Skeleton'
import { useToast } from '../../hooks/useToast'
import { useTableData } from '../../hooks/useTableData'

// DEV ONLY (route is registered only when import.meta.env.DEV). Fake rows, clearly generated.
const NAMES = ['Ava', 'Noah', 'Mia', 'Liam', 'Zoe', 'Ethan', 'Ivy', 'Owen', 'Lena', 'Jack']
const STATUSES = ['new', 'contacted', 'qualified', 'lost']
const rows = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  name: `${NAMES[i % 10]} Demo ${i + 1}`,
  status: STATUSES[i % 4],
  budget: 200000 + ((i * 37) % 11) * 25000,
}))
const SEARCH_KEYS = ['name', 'status']
const tone = { new: 'blue', contacted: 'amber', qualified: 'green', lost: 'slate' }
const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'status', header: 'Status', sortable: true, render: (r) => <Badge tone={tone[r.status]}>{r.status}</Badge> },
  { key: 'budget', header: 'Budget', sortable: true, render: (r) => `$${r.budget.toLocaleString()}` },
]

export default function DesignSystemPage() {
  const toast = useToast()
  const [modal, setModal] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [tab, setTab] = useState('all')
  const [on, setOn] = useState(true)
  const [form, setForm] = useState({ name: '', type: '' })
  const [errors, setErrors] = useState({})
  const [loadingDemo, setLoadingDemo] = useState(false)

  const table = useTableData(rows, { searchKeys: SEARCH_KEYS, pageSize: 5 })

  const submit = (e) => {
    e.preventDefault()
    const next = {}
    if (form.name.trim().length < 2) next.name = 'Name must be at least 2 characters'
    if (!form.type) next.type = 'Choose a property type'
    setErrors(next)
    if (Object.keys(next).length === 0) {
      setModal(false)
      setForm({ name: '', type: '' })
      toast.success('Saved (demo only, nothing was stored)')
    }
  }

  return (
    <>
      <PageHeader title="Design system" description="Dev-only showcase of the shared UI primitives. Not part of the product." />

      <div className="space-y-6">
        <Card title="Buttons, badges, toasts">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button size="sm">Small</Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {['slate', 'blue', 'green', 'amber', 'red', 'indigo'].map((t) => <Badge key={t} tone={t}>{t}</Badge>)}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="secondary" size="sm" onClick={() => toast.success('Lead saved')}>Success toast</Button>
            <Button variant="secondary" size="sm" onClick={() => toast.error('Could not save lead')}>Error toast</Button>
            <Button variant="secondary" size="sm" onClick={() => toast.info('Sync started')}>Info toast</Button>
          </div>
        </Card>

        <Card title="Modal, confirm, form fields">
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={() => setModal(true)}><Plus size={16} /> Open form modal</Button>
            <Button variant="danger" onClick={() => setConfirm(true)}>Open confirm dialog</Button>
            <Switch checked={on} onChange={setOn} label="Email notifications" />
            <span className="text-sm text-slate-600">Notifications {on ? 'on' : 'off'}</span>
            <Checkbox label="Remember me" />
          </div>
        </Card>

        <Card title="Tabs">
          <Tabs
            value={tab}
            onChange={setTab}
            tabs={[{ id: 'all', label: 'All', count: 23 }, { id: 'open', label: 'Open', count: 9 }, { id: 'closed', label: 'Closed' }]}
          />
          <p className="mt-3 text-sm text-slate-600">Active tab: <strong>{tab}</strong></p>
        </Card>

        <Card title="Table: search, sort, pagination (23 generated rows)" flush>
          <div className="border-b border-slate-100 p-4">
            <SearchInput value={table.query} onChange={table.setQuery} placeholder="Search by name or status…" className="max-w-sm" />
          </div>
          <DataTable
            columns={columns}
            rows={table.pageRows}
            sort={table.sort}
            onSort={table.toggleSort}
            empty={<div className="p-6"><EmptyState icon={SearchX} title="No matching rows" description="Try a different search term." /></div>}
          />
          <Pagination page={table.page} pageCount={table.pageCount} total={table.total} pageSize={table.pageSize} onPageChange={table.setPage} />
        </Card>

        <Card title="Loading states">
          <div className="space-y-3">
            <Button variant="secondary" size="sm" onClick={() => { setLoadingDemo(true); setTimeout(() => setLoadingDemo(false), 1500) }}>
              Show table skeleton for 1.5s
            </Button>
            {loadingDemo ? <DataTable columns={columns} rows={[]} loading skeletonRows={3} /> : <Skeleton className="h-4 w-48" />}
          </div>
        </Card>
      </div>

      <Modal
        open={modal}
        onClose={() => { setModal(false); setErrors({}) }}
        title="Add property"
        description="Demo form with validation"
        footer={
          <>
            <Button variant="secondary" onClick={() => { setModal(false); setErrors({}) }}>Cancel</Button>
            <Button type="submit" form="demo-form">Save</Button>
          </>
        }
      >
        <form id="demo-form" onSubmit={submit} noValidate className="space-y-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} placeholder="12 Oak Street" />
          <Select
            label="Type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            error={errors.type}
            placeholder="Select type"
            options={[{ value: 'house', label: 'House' }, { value: 'flat', label: 'Flat' }, { value: 'land', label: 'Land' }]}
          />
          <Textarea label="Notes" hint="Optional" rows={3} />
        </form>
      </Modal>

      <ConfirmDialog
        open={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={() => { setConfirm(false); toast.success('Deleted (demo only)') }}
        title="Delete lead?"
        message="This action cannot be undone."
        confirmLabel="Delete"
        danger
      />
    </>
  )
}
