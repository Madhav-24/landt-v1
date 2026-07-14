import { ROLES } from '../../../utils/constants'

export const USER_ROLE_OPTIONS = [
  ROLES.ADMIN,
  ROLES.PROJECT_MANAGER,
  ROLES.SITE_SUPERVISOR,
  ROLES.SITE_ENGINEER,
  ROLES.SAFETY_MANAGER,
  ROLES.SAFETY_OFFICER,
] as const

export const USER_SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'A-Z', value: 'az' },
  { label: 'Role', value: 'role' },
] as const

export const ROLE_FILTER_ALL = 'All Roles'
