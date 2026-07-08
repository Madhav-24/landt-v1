import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../pages/LoginPage'
import { SystemHealthPage } from '../pages/SystemHealthPage'
import { CameraManagementPage } from '../pages/CameraManagementPage'
import { UserManagementPage } from '../pages/UserManagementPage'
import { SettingsPage } from '../pages/SettingsPage'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return children
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<SystemHealthPage />} />
        <Route path="system-health" element={<SystemHealthPage />} />
        <Route path="camera-management" element={<CameraManagementPage />} />
        <Route path="user-management" element={<UserManagementPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
