import type { AssignmentRole } from '../types/assignment'

export const ROLE_OPTIONS: AssignmentRole[] = [
  'Project Manager',
  'Site Engineer',
  'Site Supervisor',
  'Safety Manager',
  'Safety Officer',
]

export const SITE_BASED_ROLES: AssignmentRole[] = ['Project Manager', 'Safety Manager', 'Safety Officer']

export const ROLE_USER_MAP: Record<AssignmentRole, string[]> = {
  'Project Manager': ['John', 'David', 'Arun'],
  'Site Engineer': ['Arun Kumar', 'Vikram', 'Ravi'],
  'Site Supervisor': ['Saran', 'Lokesh', 'Karthik'],
  'Safety Manager': ['Neha', 'Priya', 'Naveen'],
  'Safety Officer': ['Surya', 'Kiran', 'Rakesh'],
}

export const SITE_OPTIONS = [
  'Site A',
  'Site B',
  'Site C',
  'Site D',
  'Site E',
  'Site F',
]

export const CHAINAGE_OPTIONS = [
  'CH 10+000',
  'CH 10+500',
  'CH 11+000',
  'CH 11+500',
  'CH 12+000',
  'CH 12+500',
]

export const ROLE_FILTER_ALL = 'All Roles'

export function isSiteRole(role: AssignmentRole | ''): boolean {
  if (!role) return false
  return SITE_BASED_ROLES.includes(role)
}

export const DESCRIPTION_MAX_LENGTH = 500
