import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../features/authentication/pages/LoginPage'
import { SystemHealthPage } from '../features/systemHealth/pages/SystemHealthPage'
import { CameraManagementPage } from '../features/cameraManagement/pages/CameraManagementPage'
import { UserManagementPage } from '../features/userManagement/pages/UserManagementPage'
import { SettingsPage } from '../features/settings/pages/SettingsPage'
import { ProjectManagerHomePage } from '../features/projectManager/pages/ProjectManagerHomePage'
import { SafetyManagerDashboardPage } from '../features/safetyManager/pages/SafetyManagerDashboardPage'
import { SafetyOfficerDashboardPage } from '../features/safetyOfficer/pages/SafetyOfficerDashboardPage'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { useAuth } from '../features/authentication/context/AuthContext'
import { ROLES } from '../utils/constants'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return children
}

function DashboardIndexRoute() {
  const { user } = useAuth()

  if (user?.role === ROLES.SAFETY_MANAGER) {
    return <SafetyManagerDashboardPage />
  }

  if (user?.role === ROLES.SAFETY_OFFICER) {
    return <SafetyOfficerDashboardPage />
  }

  if (
    user?.role === ROLES.PROJECT_MANAGER ||
    user?.role === ROLES.SITE_SUPERVISOR ||
    user?.role === ROLES.SITE_ENGINEER
  ) {
    return <ProjectManagerHomePage />
  }

  return <SystemHealthPage />
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
        <Route index element={<DashboardIndexRoute />} />
        <Route path="system-health" element={<SystemHealthPage />} />
        <Route path="camera-management" element={<CameraManagementPage />} />
        <Route path="user-management" element={<UserManagementPage />} />
        <Route path="camera" element={<ProjectManagerHomePage />} />
        <Route path="alert" element={<ProjectManagerHomePage />} />
        <Route path="report" element={<ProjectManagerHomePage />} />
        <Route path="message" element={<ProjectManagerHomePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
