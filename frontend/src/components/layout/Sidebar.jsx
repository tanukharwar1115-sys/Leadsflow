import { NavLink } from 'react-router-dom'
import { ChevronsLeft, ChevronsRight, X } from 'lucide-react'
import { navItems } from '../../config/navigation'
import { useTerms } from '../../hooks/useTerms'
import { useAuth } from '../../hooks/useAuth'
import Avatar from '../ui/Avatar'

// Desktop (lg+): collapsible (w-64 <-> w-[72px]). Mobile/tablet: off-canvas drawer.
export default function Sidebar({ collapsed, onToggle, mobileOpen, onCloseMobile }) {
  // The mobile drawer always shows full labels; collapsing applies on desktop only.
  const compact = collapsed
  const terms = useTerms()
  const { organization } = useAuth()

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden" onClick={onCloseMobile} aria-hidden="true" />
      )}
      <aside
        aria-label="Primary"
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-slate-900 transition-all duration-200 lg:sticky lg:top-0 lg:z-auto lg:h-screen
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 ${compact ? 'lg:w-[72px]' : 'lg:w-64'}`}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/5 px-4">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-violet-500 text-sm font-bold text-white shadow-lg shadow-brand-500/30">LF</span>
            <span className={`whitespace-nowrap ${compact ? 'lg:hidden' : ''}`}>
              <span className="block text-[15px] font-semibold leading-tight text-white">LeadFlow AI</span>
              <span className="block text-[10px] font-medium uppercase tracking-widest text-slate-400">by Technowib</span>
            </span>
          </div>
          <button onClick={onCloseMobile} className="rounded-md p-1.5 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden" aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map(({ to, label: fallback, term, icon: Icon, end }) => {
            const label = term ? terms[term].plural : fallback
            return (
              <NavLink
                key={to}
                to={to}
                end={end}
                title={compact ? label : undefined}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${compact ? 'lg:justify-center lg:px-0' : ''}
                   ${isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-brand-400" aria-hidden="true" />}
                    <Icon size={19} className={`shrink-0 ${isActive ? 'text-brand-300' : ''}`} aria-hidden="true" />
                    <span className={compact ? 'lg:sr-only' : ''}>{label}</span>
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>

        <div className="border-t border-white/5 p-3">
          <div className={`flex items-center gap-3 rounded-lg bg-white/5 p-2.5 ${compact ? 'lg:justify-center lg:bg-transparent lg:p-0' : ''}`}>
            <Avatar name={organization.name} size="sm" />
            <div className={`min-w-0 ${compact ? 'lg:hidden' : ''}`}>
              <p className="truncate text-sm font-medium text-white">{organization.name}</p>
              <p className="text-xs capitalize text-slate-400">{organization.plan} plan</p>
            </div>
          </div>
          <button
            onClick={onToggle}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className={`mt-2 hidden w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white lg:flex ${compact ? 'justify-center px-0' : ''}`}
          >
            {collapsed ? <ChevronsRight size={19} /> : <><ChevronsLeft size={19} /><span>Collapse</span></>}
          </button>
        </div>
      </aside>
    </>
  )
}
