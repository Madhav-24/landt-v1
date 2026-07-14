import { ActionButton } from '../../../../components/UI/UI'
import type { UserEntity } from '../../types/user'
import { UserModal } from '../UserModal/UserModal'
import './DeleteConfirmationModal.css'

interface DeleteConfirmationModalProps {
  user: UserEntity | null
  isDeleting: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteConfirmationModal({ user, isDeleting, onConfirm, onCancel }: DeleteConfirmationModalProps) {
  return (
    <UserModal
      isOpen={Boolean(user)}
      title="Delete User"
      subtitle="Are you sure you want to delete this user?"
      onClose={onCancel}
    >
      <div className="delete-user-body">
        <p>
          This action will permanently remove <strong>{user?.fullName}</strong> from the employee list.
        </p>

        <div className="delete-user-actions">
          <ActionButton variant="ghost" type="button" onClick={onCancel}>
            Cancel
          </ActionButton>
          <ActionButton variant="danger" type="button" onClick={onConfirm} disabled={isDeleting}>
            Delete
          </ActionButton>
        </div>
      </div>
    </UserModal>
  )
}
