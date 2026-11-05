import { createBrowserRouter } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'
import AppLayout from '../layouts/AppLayout'
import HomePage from '../pages/HomePage'
import NotFoundPage from '../pages/NotFoundPage'
import DashboardPage from '../pages/app/DashboardPage'

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    // TODO(Phase 2): ProtectedRoute se wrap karna. Abhi unauthenticated accessible hai.
    path: '/app',
    element: <AppLayout />,
    children: [{ index: true, element: <DashboardPage /> }],
  },
])
