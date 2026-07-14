export type AssignmentRole =
  | 'Project Manager'
  | 'Site Engineer'
  | 'Site Supervisor'
  | 'Safety Manager'
  | 'Safety Officer'

export type AssignmentSort = 'newest' | 'oldest' | 'name' | 'role'

export interface AssignmentFormValues {
  role: AssignmentRole | ''
  name: string
  assignments: string[]
  description: string
}

export interface AssignmentFormErrors {
  role?: string
  name?: string
  assignments?: string
  assignmentRows?: string[]
  description?: string
}

export interface TemporaryAssignment {
  id: string
  role: AssignmentRole
  name: string
  assignments: string[]
  description: string
  createdAt: string
}
