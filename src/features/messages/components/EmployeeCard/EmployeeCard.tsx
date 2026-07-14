import { memo } from 'react'
import { FaCircle, FaUserCircle } from 'react-icons/fa'
import type { Employee } from '../../types/employee'

interface EmployeeCardProps {
  employee: Employee
  active: boolean
  onSelect: (id: string) => void
}

function statusClass(status: string): string {
  return status.toLowerCase()
}

function EmployeeCardComponent({ employee, active, onSelect }: EmployeeCardProps) {
  return (
    <button
      type="button"
      className={`employee-card ${active ? 'active' : ''}`}
      onClick={() => onSelect(employee.id)}
      aria-label={`Open chat with ${employee.name}`}
    >
      <div className="employee-avatar-wrap">
        <FaUserCircle className="employee-avatar" />
        <span className={`employee-status ${statusClass(employee.status)}`}>
          <FaCircle />
        </span>
      </div>

      <div className="employee-meta">
        <div className="employee-head-row">
          <strong>{employee.name}</strong>
          <small>{employee.timestamp}</small>
        </div>
        <div className="employee-role-row">
          <span className="chip">{employee.role}</span>
          <small>{employee.lastSeen}</small>
        </div>
        <div className="employee-message-row">
          <p>{employee.lastMessage}</p>
          {employee.unreadCount > 0 ? <span className="employee-unread">{employee.unreadCount}</span> : null}
        </div>
      </div>
    </button>
  )
}

export const EmployeeCard = memo(EmployeeCardComponent)
