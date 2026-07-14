export interface UserEntity {
  id: string
  fullName: string
  email: string
  employeeId: string
  phoneNumber: string
  role: string
  createdAt: string
  updatedAt: string
}

export interface UserFormValues {
  fullName: string
  email: string
  employeeId: string
  phoneNumber: string
  role: string
}

export interface UserFormErrors {
  fullName?: string
  email?: string
  employeeId?: string
  phoneNumber?: string
  role?: string
}

export interface UserFormState {
  values: UserFormValues
  errors: UserFormErrors
  isValid: boolean
}

export type UserSortOption = 'newest' | 'oldest' | 'az' | 'role'

export interface UserQueryOptions {
  searchTerm: string
  sortBy: UserSortOption
  roleFilter: string
}

export interface UserMutationResult {
  ok: boolean
  message: string
  user?: UserEntity
}

export interface ToastState {
  open: boolean
  message: string
}
