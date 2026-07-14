import type { AssignmentSort } from '../../types/assignment'

interface SortDropdownProps {
  value: AssignmentSort
  onChange: (value: AssignmentSort) => void
}

const SORT_OPTIONS: Array<{ label: string; value: AssignmentSort }> = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Name', value: 'name' },
  { label: 'Role', value: 'role' },
]

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <label className="project-assigned-field">
      <span>Sort</span>
      <select value={value} onChange={(event) => onChange(event.target.value as AssignmentSort)} className="project-assigned-input">
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
