export type EmployeeStatus = 'Online' | 'Offline' | 'Away'

export interface Employee {
  id: string
  name: string
  role: string
  status: EmployeeStatus
  lastMessage: string
  lastSeen: string
  unreadCount: number
  timestamp: string
}

export const ROLE_FILTERS = [
  'All',
  'Project Manager',
  'Site Supervisor',
  'Site Engineer',
  'Safety Engineer',
  'Safety Officer',
] as const

export type RoleFilter = (typeof ROLE_FILTERS)[number]
