import { ROLE_FILTERS, type RoleFilter } from '../../types/employee'

interface RoleFilterProps {
  value: RoleFilter
  onChange: (value: RoleFilter) => void
}

export function RoleFilter({ value, onChange }: RoleFilterProps) {
  return (
    <div className="message-role-filters" role="tablist" aria-label="Role filter">
      {ROLE_FILTERS.map((role) => (
        <button
          key={role}
          type="button"
          className={`message-role-chip ${value === role ? 'active' : ''}`}
          role="tab"
          aria-selected={value === role}
          onClick={() => onChange(role)}
        >
          {role}
        </button>
      ))}
    </div>
  )
}
