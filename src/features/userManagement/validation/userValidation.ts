import type { UserFormErrors, UserFormValues } from '../types/user'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^\d{10}$/
const EMPLOYEE_ID_REGEX = /^[A-Za-z0-9-]{3,20}$/

export function trimUserFormValues(values: UserFormValues): UserFormValues {
  return {
    fullName: values.fullName.trim(),
    email: values.email.trim().toLowerCase(),
    employeeId: values.employeeId.trim().toUpperCase(),
    phoneNumber: values.phoneNumber.trim(),
    role: values.role.trim(),
  }
}

export function validateUserForm(values: UserFormValues): UserFormErrors {
  const errors: UserFormErrors = {}

  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required.'
  }

  if (!values.email.trim()) {
    errors.email = 'Email address is required.'
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  if (!values.employeeId.trim()) {
    errors.employeeId = 'Employee ID is required.'
  } else if (!EMPLOYEE_ID_REGEX.test(values.employeeId.trim())) {
    errors.employeeId = 'Use 3-20 letters, numbers, or dashes.'
  }

  if (!values.phoneNumber.trim()) {
    errors.phoneNumber = 'Phone number is required.'
  } else if (!PHONE_REGEX.test(values.phoneNumber.trim())) {
    errors.phoneNumber = 'Enter a valid 10-digit phone number.'
  }

  if (!values.role.trim()) {
    errors.role = 'Role is required.'
  }

  return errors
}

export function isUserFormValid(values: UserFormValues): boolean {
  return Object.keys(validateUserForm(values)).length === 0
}
