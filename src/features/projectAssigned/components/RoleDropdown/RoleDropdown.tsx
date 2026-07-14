import type { AssignmentRole } from '../../types/assignment'

interface RoleDropdownProps {
  value: AssignmentRole | ''
  options: AssignmentRole[]
  error?: string
  onChange: (role: AssignmentRole | '') => void
}

export function RoleDropdown({ value, options, error, onChange }: RoleDropdownProps) {
  return (
    <label className="project-assigned-field">
      <span>Role *</span>
      <select
        value={value}
        onChange={(event) => onChange((event.target.value as AssignmentRole) || '')}
        className={`project-assigned-input ${error ? 'invalid' : ''}`}
        aria-invalid={Boolean(error)}
      >
        <option value="">Select role</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? <small className="field-error">{error}</small> : null}
    </label>
  )
}
