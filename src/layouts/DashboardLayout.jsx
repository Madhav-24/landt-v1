import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { TopBar } from '../components/TopBar/TopBar'
import { useAuth } from '../features/authentication/context/AuthContext'
import { roleMenus } from '../services/mockData'
import { ROLES } from '../utils/constants'

const titles = {
  '/dashboard': ['System Health', 'Live operational telemetry from AI cameras, edge devices, and backend services.'],
  '/dashboard/system-health': ['System Health', 'All health signals are refreshed from the backend data layer and auto-synced.'],
  '/dashboard/camera-management': ['Camera Management', 'Click any site card to open a camera view, control feed, or capture media.'],
  '/dashboard/user-management': ['User Management', 'RBAC, employee profiles, and access control are centralized here.'],
  '/dashboard/user-create': ['User Create', 'Manage employee accounts and roles.'],
  '/dashboard/project-assigned': ['Project Assigned', 'Create temporary role-based assignment cards for drawing management preview.'],
  '/dashboard/settings': ['Settings', 'Environment, security, retention, and platform configuration are controlled here.'],
  '/dashboard/camera': ['Camera', ''],
  '/dashboard/alert': ['Alert', ''],
  '/dashboard/report': ['Report', ''],
  '/dashboard/message': ['Message', ''],
  '/admin/messages': ['Message', 'Internal secure messaging for project and safety teams.'],
}

export function DashboardLayout() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const hideTopBar =
    (user?.role === ROLES.SAFETY_MANAGER || user?.role === ROLES.SAFETY_OFFICER) &&
    location.pathname === '/dashboard'
  const isBlankRole =
    user?.role === ROLES.PROJECT_MANAGER ||
    user?.role === ROLES.SITE_SUPERVISOR ||
    user?.role === ROLES.SITE_ENGINEER ||
    user?.role === ROLES.SAFETY_OFFICER
  const [title, subtitle] = isBlankRole ? ['', ''] : (titles[location.pathname] ?? titles['/dashboard'])
  const menus = roleMenus[user?.role] ?? roleMenus.Admin

  return (
    <div className="app-shell">
      <Sidebar menus={menus} user={user} onLogout={logout} onProfileClick={() => navigate('/dashboard/profile')} />
      <main className="main-shell">
        {hideTopBar ? null : <TopBar user={user} title={title} subtitle={subtitle} onRefresh={() => window.location.reload()} />}
        <Outlet />
      </main>
    </div>
  )
}
