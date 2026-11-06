import { useMemo } from 'react'
import { AuthContext, roleLabels } from './authContext'
import { DEFAULT_INDUSTRY } from '../config/terminology'

// ⚠️ MOCK SESSION — Phase 2.4/2.5 replaces this with GET /api/auth/me + login/logout.
// Everything else (sidebar, topbar, role checks) already reads from useAuth(), so only this file changes.
const mockSession = {
  user: { id: 'u_demo', name: 'Demo User', email: 'demo@example.com', role: 'agency_admin' },
  organization: { id: 'o_demo', name: 'Demo Realty', industry: DEFAULT_INDUSTRY, plan: 'growth' },
}

export default function AuthProvider({ children }) {
  const value = useMemo(
    () => ({
      ...mockSession,
      isAuthenticated: true,
      roleLabel: roleLabels[mockSession.user.role],
      hasRole: (...roles) => roles.includes(mockSession.user.role),
      logout: () => {},
    }),
    [],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
