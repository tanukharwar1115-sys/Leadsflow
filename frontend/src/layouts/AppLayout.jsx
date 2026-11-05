import { NavLink, Outlet } from 'react-router-dom'

// Nav items phase-wise enable honge; abhi sirf Dashboard live hai.
const nav = [
  { to: '/app', label: 'Dashboard', end: true },
  { label: 'Leads', soon: 'Phase 5' },
  { label: 'Properties', soon: 'Phase 6' },
  { label: 'Conversations', soon: 'Phase 8' },
  { label: 'Appointments', soon: 'Phase 9' },
  { label: 'Analytics', soon: 'Phase 10' },
]

export default function AppLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white md:block">
        <div className="px-5 py-4 text-lg font-semibold text-indigo-600">LeadFlow AI</div>
        <nav className="space-y-1 px-3">
          {nav.map((item) =>
            item.to ? (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'}`
                }
              >
                {item.label}
              </NavLink>
            ) : (
              <div key={item.label} className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-slate-400">
                {item.label}
                <span className="text-[10px] uppercase">{item.soon}</span>
              </div>
            ),
          )}
        </nav>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-end border-b border-slate-200 bg-white px-6 text-sm text-slate-500">
          User menu (Phase 2)
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
