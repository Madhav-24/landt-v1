import {
  DEFAULT_ROLE,
  DEMO_EMAIL,
  DEMO_LT_ID,
  DEMO_PASSWORD,
  DEMO_PHONE,
  PM_EMAIL,
  PM_LT_ID,
  PM_NAME,
  PM_PASSWORD,
  PM_PHONE,
  SS_EMAIL,
  SS_LT_ID,
  SS_NAME,
  SS_PASSWORD,
  SS_PHONE,
  SE_EMAIL,
  SE_LT_ID,
  SE_NAME,
  SE_PASSWORD,
  SE_PHONE,
  SM_EMAIL,
  SM_LT_ID,
  SM_NAME,
  SM_PASSWORD,
  SM_PHONE,
  SO_EMAIL,
  SO_LT_ID,
  SO_NAME,
  SO_PASSWORD,
  SO_PHONE,
  ROLES,
} from '../utils/constants'

export const mockUser = {
  id: 'u-admin-001',
  name: 'Madhav',
  email: DEMO_EMAIL,
  phone: DEMO_PHONE,
  ltId: DEMO_LT_ID,
  role: ROLES.ADMIN,
  project: 'NH-44 Chennai Corridor',
}

export const projectManagerUser = {
  id: 'u-pm-001',
  name: PM_NAME,
  email: PM_EMAIL,
  phone: PM_PHONE,
  ltId: PM_LT_ID,
  role: ROLES.PROJECT_MANAGER,
  designation: ROLES.PROJECT_MANAGER,
  project: 'L&T Central Monitoring Program',
}

export const siteSupervisorUser = {
  id: 'u-ss-001',
  name: SS_NAME,
  email: SS_EMAIL,
  phone: SS_PHONE,
  ltId: SS_LT_ID,
  role: ROLES.SITE_SUPERVISOR,
  designation: ROLES.SITE_SUPERVISOR,
  project: 'L&T Central Monitoring Program',
}

export const siteEngineerUser = {
  id: 'u-se-001',
  name: SE_NAME,
  email: SE_EMAIL,
  phone: SE_PHONE,
  ltId: SE_LT_ID,
  role: ROLES.SITE_ENGINEER,
  designation: ROLES.SITE_ENGINEER,
  project: 'L&T Central Monitoring Program',
}

export const safetyManagerUser = {
  id: 'u-sm-001',
  name: SM_NAME,
  email: SM_EMAIL,
  phone: SM_PHONE,
  ltId: SM_LT_ID,
  role: ROLES.SAFETY_MANAGER,
  designation: ROLES.SAFETY_MANAGER,
  project: 'L&T Central Monitoring Program',
}

export const safetyOfficerUser = {
  id: 'u-so-001',
  name: SO_NAME,
  email: SO_EMAIL,
  phone: SO_PHONE,
  ltId: SO_LT_ID,
  role: ROLES.SAFETY_OFFICER,
  designation: ROLES.SAFETY_OFFICER,
  project: 'L&T Central Monitoring Program',
}

export const roleMenus = {
  [ROLES.ADMIN]: ['System Health', 'Camera Management', 'User Management', 'User Create', 'Project Assigned', 'Message', 'Settings'],
  [ROLES.PROJECT_MANAGER]: ['Dashboard', 'Camera', 'Alert', 'Report', 'Message', 'Settings'],
  [ROLES.SITE_SUPERVISOR]: ['Dashboard', 'Camera', 'Alert', 'Report', 'Message', 'Settings'],
  [ROLES.SITE_ENGINEER]: ['Dashboard', 'Camera', 'Alert', 'Report', 'Message', 'Settings'],
  [ROLES.SAFETY_MANAGER]: ['Dashboard', 'Camera', 'Alert', 'Report', 'Message', 'Settings'],
  [ROLES.SAFETY_OFFICER]: ['Dashboard', 'Camera', 'Alert', 'Report', 'Message', 'Settings'],
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
  const trimmed = identifier.trim()
  const normalized = trimmed.toLowerCase()
  const normalizedNoSpaces = normalized.replace(/\s+/g, '')
  const normalizedLtId = normalizedNoSpaces.replace(/&/g, '')

  if (
    (normalized === DEMO_EMAIL || normalized === 'madhav' || normalized === 'admin') &&
    password === DEMO_PASSWORD
  ) {
    return { token: 'demo-jwt-token', user: mockUser }
  }

  const pmMatchesIdentifier =
    normalized === PM_EMAIL ||
    normalizedNoSpaces === PM_PHONE ||
    normalizedLtId === PM_LT_ID.toLowerCase().replace(/&/g, '')

  if (pmMatchesIdentifier && password === PM_PASSWORD) {
    return { token: 'demo-pm-jwt-token', user: projectManagerUser }
  }

  const ssMatchesIdentifier =
    normalized === SS_EMAIL ||
    normalizedNoSpaces === SS_PHONE ||
    normalizedLtId === SS_LT_ID.toLowerCase().replace(/&/g, '')

  if (ssMatchesIdentifier && password === SS_PASSWORD) {
    return { token: 'demo-ss-jwt-token', user: siteSupervisorUser }
  }

  const seMatchesIdentifier =
    normalized === SE_EMAIL ||
    normalizedNoSpaces === SE_PHONE ||
    normalizedLtId === SE_LT_ID.toLowerCase().replace(/&/g, '')

  if (seMatchesIdentifier && password === SE_PASSWORD) {
    return { token: 'demo-se-jwt-token', user: siteEngineerUser }
  }

  const smMatchesIdentifier =
    normalized === SM_EMAIL ||
    normalizedNoSpaces === SM_PHONE ||
    normalizedLtId === SM_LT_ID.toLowerCase().replace(/&/g, '')

  if (smMatchesIdentifier && password === SM_PASSWORD) {
    return { token: 'demo-sm-jwt-token', user: safetyManagerUser }
  }

  const soMatchesIdentifier =
    normalized === SO_EMAIL ||
    normalizedNoSpaces === SO_PHONE ||
    normalizedLtId === SO_LT_ID.toLowerCase().replace(/&/g, '')

  if (soMatchesIdentifier && password === SO_PASSWORD) {
    return { token: 'demo-so-jwt-token', user: safetyOfficerUser }
  }

  throw new Error('Invalid credentials. Use the demo account or connect the backend API.')
}
