import { createContext } from 'react'

export const AuthContext = createContext(null)

export const roleLabels = { super_admin: 'Super Admin', agency_admin: 'Agency Admin', agent: 'Agent' }
