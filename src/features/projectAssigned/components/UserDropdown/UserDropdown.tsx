interface UserDropdownProps {
  value: string
  options: string[]
  error?: string
  disabled: boolean
  onChange: (name: string) => void
}

export function UserDropdown({ value, options, error, disabled, onChange }: UserDropdownProps) {
  return (
    <label className="project-assigned-field">
      <span>Name *</span>
      <select
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className={`project-assigned-input ${error ? 'invalid' : ''}`}
        aria-invalid={Boolean(error)}
      >
        <option value="">{disabled ? 'Select role first' : 'Select user'}</option>
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
