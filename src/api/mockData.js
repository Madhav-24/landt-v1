import { DEFAULT_ROLE, DEMO_EMAIL, DEMO_PASSWORD, ROLES } from '../utils/constants'

export const mockUser = {
  id: 'u-admin-001',
  name: 'Madhav',
  email: DEMO_EMAIL,
  phone: '+91-90000-00000',
  role: ROLES.ADMIN,
  project: 'NH-44 Chennai Corridor',
}

export const roleMenus = {
  [ROLES.ADMIN]: ['System Health', 'Camera Management', 'User Management', 'Settings'],
  [ROLES.PROJECT_MANAGER]: ['Dashboard', 'System Health', 'Camera Management', 'Settings'],
  [ROLES.SITE_ENGINEER]: ['Dashboard', 'Camera Management', 'System Health'],
  [ROLES.SAFETY_MANAGER]: ['Dashboard', 'System Health', 'Camera Management'],
  [ROLES.SAFETY_OFFICER]: ['Dashboard', 'Camera Management'],
  [ROLES.HITL_REVIEWER]: ['Dashboard', 'System Health'],
  [ROLES.AI_ENGINEER]: ['Dashboard', 'System Health', 'Settings'],
  [ROLES.CLIENT]: ['Dashboard', 'System Health'],
}

export const mockSystemHealth = {
  camera: { total: 48, working: 45, offline: 3 },
  edgeDevice: { total: 12, working: 11, offline: 1 },
  server: {
    cpuUsage: 39,
    ramUsage: 68,
    storageUsed: 71,
    storageFree: 29,
    diskUsage: 52,
    networkSpeed: '940 Mbps',
    temperature: '48°C',
    serverUptime: '36d 14h',
    operatingSystem: 'Ubuntu 24.04 LTS',
    pythonVersion: '3.11.9',
    postgreSQLStatus: 'Healthy',
    linuxStatus: 'Healthy',
    fastAPIStatus: 'Running',
    jwtStatus: 'Active',
    lastSyncTime: '2026-07-08 10:42:12',
  },
  trendSeries: [
    { time: '08:00', cameras: 42, devices: 10 },
    { time: '10:00', cameras: 44, devices: 11 },
    { time: '12:00', cameras: 46, devices: 11 },
    { time: '14:00', cameras: 45, devices: 12 },
    { time: '16:00', cameras: 45, devices: 11 },
  ],
}

export const mockSites = [
  { id: 'site-001', name: 'Southern Bypass Package A', cameras: 8, working: 7, offline: 1, health: 87 },
  { id: 'site-002', name: 'Highway Widening Zone B', cameras: 10, working: 10, offline: 0, health: 100 },
  { id: 'site-003', name: 'Bridge Approach Segment C', cameras: 6, working: 5, offline: 1, health: 83 },
]

export const mockCameras = [
  {
    id: 'cam-101',
    siteId: 'site-001',
    siteName: 'Southern Bypass Package A',
    cameraName: 'AI Pole Cam 01',
    status: 'Working',
    feedLabel: 'Live HD Stream',
    detection: 'PPE Compliance',
  },
  {
    id: 'cam-102',
    siteId: 'site-001',
    siteName: 'Southern Bypass Package A',
    cameraName: 'AI Pole Cam 02',
    status: 'Offline',
    feedLabel: 'Last Seen 4 min ago',
    detection: 'Vehicle Entry',
  },
  {
    id: 'cam-203',
    siteId: 'site-002',
    siteName: 'Highway Widening Zone B',
    cameraName: 'AI Tower Cam 07',
    status: 'Working',
    feedLabel: 'Live HD Stream',
    detection: 'Speed Violation',
  },
]

export const mockUsers = [
  { id: 'u-1', name: 'Madhav', role: ROLES.ADMIN, status: 'Active' },
  { id: 'u-2', name: 'Kiran Rao', role: ROLES.PROJECT_MANAGER, status: 'Active' },
  { id: 'u-3', name: 'Neha Singh', role: ROLES.SAFETY_MANAGER, status: 'Invited' },
  { id: 'u-4', name: 'Arun Kumar', role: ROLES.AI_ENGINEER, status: 'Active' },
]

export function buildDashboardSnapshot() {
  return {
    user: mockUser,
    defaultRole: DEFAULT_ROLE,
    menus: roleMenus[DEFAULT_ROLE],
    systemHealth: mockSystemHealth,
    sites: mockSites,
    cameras: mockCameras,
    users: mockUsers,
  }
}

export function loginWithDemoFallback(identifier, password) {
  const normalized = identifier.trim().toLowerCase()

  if (
    (normalized === DEMO_EMAIL || normalized === 'madhav' || normalized === 'admin') &&
    password === DEMO_PASSWORD
  ) {
    return { token: 'demo-jwt-token', user: mockUser }
  }

  throw new Error('Invalid credentials. Use the demo account or connect the backend API.')
}
