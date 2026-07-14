import { FaEllipsisV, FaPhoneAlt, FaSearch, FaVideo } from 'react-icons/fa'
import type { Employee } from '../../types/employee'

interface ChatHeaderProps {
  employee: Employee
}

export function ChatHeader({ employee }: ChatHeaderProps) {
  return (
    <div className="message-chat-header">
      <div className="message-chat-profile">
        <div className="avatar-circle">{employee.name.charAt(0)}</div>
        <div>
          <strong>{employee.name}</strong>
          <p>{employee.role} • {employee.status}</p>
        </div>
      </div>

      <div className="message-chat-actions">
        <button type="button" className="icon-button" aria-label="Start video call">
          <FaVideo />
        </button>
        <button type="button" className="icon-button" aria-label="Start voice call">
          <FaPhoneAlt />
        </button>
        <button type="button" className="icon-button" aria-label="Search in conversation">
          <FaSearch />
        </button>
        <button type="button" className="icon-button" aria-label="More options">
          <FaEllipsisV />
        </button>
      </div>
    </div>
  )
}
