import { Bell, ChevronDown, LogOut, Menu, Search, User } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Avatar from '../ui/Avatar'
import Popover from '../ui/Popover'
import { useAuth } from '../../hooks/useAuth'

// MOCK notifications; the signed-in user comes from useAuth().
const mockNotifications = [
  { id: 1, text: 'New enquiry from Sarah Mitchell', time: '5m ago' },
  { id: 2, text: 'Viewing confirmed: 12 Oak Street', time: '1h ago' },
  { id: 3, text: 'Lead James Carter marked qualified', time: '3h ago' },
]

export default function Topbar({ onOpenMobile }) {
  const navigate = useNavigate()
  const { user, roleLabel } = useAuth()
  const [query, setQuery] = useState('')

  // Global search hands off to the Leads page (?q=). Leads will read it when that module is built.
  const submitSearch = (e) => {
    e.preventDefault()
    const q = query.trim()
    if (q) navigate(`/app/leads?q=${encodeURIComponent(q)}`)
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6">
      <button onClick={onOpenMobile} className="rounded-md p-2 text-slate-600 hover:bg-slate-100 lg:hidden" aria-label="Open menu">
        <Menu size={20} />
      </button>

      <form onSubmit={submitSearch} role="search" className="relative max-w-md flex-1">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search leads…"
          aria-label="Search leads"
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
        />
      </form>

      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        <Popover
          width="w-80"
          trigger={({ toggle, open }) => (
            <button onClick={toggle} aria-expanded={open} aria-label="Notifications" className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100">
              <Bell size={20} />
              {mockNotifications.length > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />}
            </button>
          )}
        >
          {() => (
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <p className="text-sm font-semibold text-slate-900">Notifications</p>
                <span className="text-[10px] font-medium uppercase tracking-wide text-amber-600">Sample data</span>
              </div>
              <ul className="max-h-72 divide-y divide-slate-100 overflow-y-auto">
                {mockNotifications.map((n) => (
                  <li key={n.id} className="px-4 py-3">
                    <p className="text-sm text-slate-700">{n.text}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{n.time}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Popover>

        <Popover
          width="w-60"
          trigger={({ toggle, open }) => (
            <button onClick={toggle} aria-expanded={open} aria-label="Profile menu" className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-slate-100">
              <Avatar name={user.name} size="sm" />
              <span className="hidden text-left sm:block">
                <span className="block text-sm font-medium leading-tight text-slate-900">{user.name}</span>
                <span className="block text-xs leading-tight text-slate-500">{roleLabel}</span>
              </span>
              <ChevronDown size={14} className="hidden text-slate-400 sm:block" />
            </button>
          )}
        >
          {(close) => (
            <div className="py-1">
              <div className="border-b border-slate-100 px-4 py-3">
                <p className="text-sm font-medium text-slate-900">{user.name}</p>
                <p className="truncate text-xs text-slate-500">{user.email}</p>
                <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-amber-600">Sample user</p>
              </div>
              <Link to="/app/settings" onClick={close} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                <User size={16} /> Profile &amp; settings
              </Link>
              <button disabled title="Available once sign-in is connected" className="flex w-full cursor-not-allowed items-center gap-2 px-4 py-2 text-sm text-slate-400">
                <LogOut size={16} /> Sign out
              </button>
            </div>
          )}
        </Popover>
      </div>
    </header>
  )
}
