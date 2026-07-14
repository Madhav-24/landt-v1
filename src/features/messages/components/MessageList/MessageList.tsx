import { EmployeeCard } from '../EmployeeCard/EmployeeCard'
import type { Employee } from '../../types/employee'

interface MessageListProps {
  employees: Employee[]
  activeEmployeeId: string | null
  onSelect: (id: string) => void
}

export function MessageList({ employees, activeEmployeeId, onSelect }: MessageListProps) {
  if (!employees.length) {
    return <div className="message-empty-list">No employees found.</div>
  }

  return (
    <div className="message-employee-list" role="list" aria-label="Employees">
      {employees.map((employee) => (
        <div key={employee.id} role="listitem">
          <EmployeeCard employee={employee} active={employee.id === activeEmployeeId} onSelect={onSelect} />
        </div>
      ))}
    </div>
  )
}
