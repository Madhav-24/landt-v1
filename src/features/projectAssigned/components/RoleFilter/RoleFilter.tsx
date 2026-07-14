import { ROLE_FILTER_ALL } from '../../constants/assignmentOptions'
import type { AssignmentRole } from '../../types/assignment'

interface RoleFilterProps {
  value: string
  roleOptions: AssignmentRole[]
  onChange: (value: string) => void
}

export function RoleFilter({ value, roleOptions, onChange }: RoleFilterProps) {
  return (
    <label className="project-assigned-field">
      <span>Role Filter</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="project-assigned-input">
        <option value={ROLE_FILTER_ALL}>{ROLE_FILTER_ALL}</option>
        {roleOptions.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
    </label>
  )
}
