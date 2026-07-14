import { FaUsers } from 'react-icons/fa'
import { ActionButton } from '../../../../components/UI/UI'
import './EmptyState.css'

interface EmptyStateProps {
  onCreate: () => void
}

export function EmptyState({ onCreate }: EmptyStateProps) {
  return (
    <div className="users-empty-state" role="status" aria-live="polite">
      <div className="users-empty-state__icon" aria-hidden="true">
        <FaUsers />
      </div>
      <h3>No Users Yet</h3>
      <p>Create your first employee account.</p>
      <ActionButton variant="primary" onClick={onCreate}>
        + Create User
      </ActionButton>
    </div>
  )
}
