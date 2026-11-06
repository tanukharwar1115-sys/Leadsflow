import { createBrowserRouter } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'
import AppLayout from '../layouts/AppLayout'
import HomePage from '../pages/HomePage'
import NotFoundPage from '../pages/NotFoundPage'
import DashboardPage from '../pages/app/DashboardPage'
import LeadsPage from '../pages/app/LeadsPage'
import PropertiesPage from '../pages/app/PropertiesPage'
import AgentsPage from '../pages/app/AgentsPage'
import ConversationsPage from '../pages/app/ConversationsPage'
import AppointmentsPage from '../pages/app/AppointmentsPage'
import AnalyticsPage from '../pages/app/AnalyticsPage'
import AutomationsPage from '../pages/app/AutomationsPage'
import SettingsPage from '../pages/app/SettingsPage'
import FollowUpsPage from '../pages/app/FollowUpsPage'
import AiQualificationPage from '../pages/app/AiQualificationPage'

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    // TODO(Phase 2): wrap with ProtectedRoute. Currently accessible without authentication.
    path: '/app',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'leads', element: <LeadsPage /> },
      { path: 'properties', element: <PropertiesPage /> },
      { path: 'agents', element: <AgentsPage /> },
      { path: 'conversations', element: <ConversationsPage /> },
      { path: 'appointments', element: <AppointmentsPage /> },
      { path: 'analytics', element: <AnalyticsPage /> },
      { path: 'ai-qualification', element: <AiQualificationPage /> },
      { path: 'follow-ups', element: <FollowUpsPage /> },
      { path: 'automations', element: <AutomationsPage /> },
      { path: 'settings', element: <SettingsPage /> },
      // Dev-only component showcase; dropped from production builds.
      ...(import.meta.env.DEV
        ? [{ path: 'design-system', lazy: () => import('../pages/app/DesignSystemPage').then((m) => ({ Component: m.default })) }]
        : []),
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
