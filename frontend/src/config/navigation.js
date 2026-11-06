import { BarChart3, Building2, CalendarDays, LayoutDashboard, ListChecks, MessageSquare, Settings, Sparkles, UserCog, Users, Zap } from 'lucide-react'

// Single source of truth for the sidebar. `term` => label comes from the org's industry vocabulary (useTerms); `label` is the fallback.
export const navItems = [
  { to: '/app', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/app/leads', label: 'Leads', term: 'lead', icon: Users },
  { to: '/app/properties', label: 'Properties', term: 'property', icon: Building2 },
  { to: '/app/agents', label: 'Agents', term: 'agent', icon: UserCog },
  { to: '/app/conversations', label: 'Conversations', icon: MessageSquare },
  { to: '/app/ai-qualification', label: 'AI Qualification', icon: Sparkles },
  { to: '/app/follow-ups', label: 'Follow-ups', icon: ListChecks },
  { to: '/app/appointments', label: 'Appointments', term: 'appointment', icon: CalendarDays },
  { to: '/app/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/app/automations', label: 'Automations', icon: Zap },
  { to: '/app/settings', label: 'Settings', icon: Settings },
]
