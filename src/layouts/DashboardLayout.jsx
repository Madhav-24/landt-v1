import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from '../components/common/Sidebar'
import { TopBar } from '../components/TopBar'
import { useAuth } from '../context/AuthContext'
import { roleMenus } from '../api/mockData'

const titles = {
  '/dashboard': ['System Health', 'Live operational telemetry from AI cameras, edge devices, and backend services.'],
  '/dashboard/system-health': ['System Health', 'All health signals are refreshed from the backend data layer and auto-synced.'],
  '/dashboard/camera-management': ['Camera Management', 'Click any site card to open a camera view, control feed, or capture media.'],
  '/dashboard/user-management': ['User Management', 'RBAC, employee profiles, and access control are centralized here.'],
  '/dashboard/settings': ['Settings', 'Environment, security, retention, and platform configuration are controlled here.'],
}

export function DashboardLayout() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [title, subtitle] = titles[location.pathname] ?? titles['/dashboard']
  const menus = roleMenus[user?.role] ?? roleMenus.Admin

  return (
    <div className="app-shell">
      <Sidebar menus={menus} user={user} onLogout={logout} />
      <main className="main-shell">
        <TopBar user={user} title={title} subtitle={subtitle} onRefresh={() => window.location.reload()} />
        <Outlet />
      </main>
    </div>
  )
}
