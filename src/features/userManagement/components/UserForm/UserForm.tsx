import type { ChangeEvent } from 'react'
import type { UserFormErrors, UserFormValues } from '../../types/user'
import { RoleDropdown } from '../RoleDropdown/RoleDropdown'
import './UserForm.css'

interface UserFormProps {
  values: UserFormValues
  errors: UserFormErrors
  onFieldChange: (field: keyof UserFormValues, value: string) => void
}

interface UserTextInputProps {
  id: keyof UserFormValues
  label: string
  type?: string
  value: string
  placeholder: string
  error?: string
  onFieldChange: (field: keyof UserFormValues, value: string) => void
}

function UserTextInput({ id, label, type = 'text', value, placeholder, error, onFieldChange }: UserTextInputProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onFieldChange(id, event.target.value)
  }

  return (
    <label htmlFor={id} className="user-field">
      <span>{label}</span>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`user-input ${error ? 'invalid' : ''}`}
        aria-invalid={Boolean(error)}
      />
      {error ? <small className="field-error">{error}</small> : null}
    </label>
  )
}

export function UserForm({ values, errors, onFieldChange }: UserFormProps) {
  return (
    <div className="user-form-grid">
      <UserTextInput
        id="fullName"
        label="Full Name"
        value={values.fullName}
        placeholder="Enter full name"
        error={errors.fullName}
        onFieldChange={onFieldChange}
      />
      <UserTextInput
        id="email"
        label="Email Address"
        type="email"
        value={values.email}
        placeholder="Enter email address"
        error={errors.email}
        onFieldChange={onFieldChange}
      />
      <UserTextInput
        id="employeeId"
        label="Employee ID"
        value={values.employeeId}
        placeholder="Enter employee ID"
        error={errors.employeeId}
        onFieldChange={onFieldChange}
      />
      <UserTextInput
        id="phoneNumber"
        label="Phone Number"
        type="tel"
        value={values.phoneNumber}
        placeholder="Enter 10-digit phone number"
        error={errors.phoneNumber}
        onFieldChange={onFieldChange}
      />
      <RoleDropdown
        id="role"
        name="role"
        label="Role"
        value={values.role}
        error={errors.role}
        onChange={(value) => onFieldChange('role', value)}
      />
    </div>
  )
}
