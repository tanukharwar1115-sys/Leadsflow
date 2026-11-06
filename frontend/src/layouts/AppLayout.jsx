import { Outlet } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import Topbar from '../components/layout/Topbar'
import { useSidebar } from '../hooks/useSidebar'

// TODO(Phase 2): wrap with ProtectedRoute.
export default function AppLayout() {
  const { collapsed, toggleCollapsed, mobileOpen, openMobile, closeMobile } = useSidebar()

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar collapsed={collapsed} onToggle={toggleCollapsed} mobileOpen={mobileOpen} onCloseMobile={closeMobile} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onOpenMobile={openMobile} />
        <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
