import { Outlet, Link } from 'react-router-dom'

const year = new Date().getFullYear()

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-500 text-sm font-bold text-white shadow-lg shadow-brand-500/30">LF</span>
            <span className="text-[15px] font-semibold text-slate-900">LeadFlow AI</span>
          </Link>
          <Link to="/app" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">Open dashboard</Link>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-slate-100 py-6 text-center text-xs text-slate-400">© {year} Technowib. All rights reserved.</footer>
    </div>
  )
}
