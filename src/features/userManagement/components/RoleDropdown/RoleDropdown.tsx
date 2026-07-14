import type { ChangeEvent } from 'react'
import { USER_ROLE_OPTIONS } from '../../constants/roles'

interface RoleDropdownProps {
  id: string
  name: string
  label: string
  value: string
  error?: string
  onChange: (value: string) => void
}

export function RoleDropdown({ id, name, label, value, error, onChange }: RoleDropdownProps) {
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    onChange(event.target.value)
  }

  return (
    <label htmlFor={id} className="user-field">
      <span>{label}</span>
      <select
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        className={`user-input ${error ? 'invalid' : ''}`}
        aria-invalid={Boolean(error)}
      >
        <option value="">Select role</option>
        {USER_ROLE_OPTIONS.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      {error ? <small className="field-error">{error}</small> : null}
    </label>
  )
}
