import { GlassCard } from '../../../../components/UI/UI'
import type { UserEntity } from '../../types/user'
import { UserMenu } from '../UserMenu/UserMenu'
import './UserCard.css'

interface UserCardProps {
  user: UserEntity
  onEdit: (user: UserEntity) => void
  onDelete: (user: UserEntity) => void
}

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <GlassCard className="user-create-card">
      <div className="user-create-card__header">
        <h3>{user.fullName}</h3>
        <UserMenu onEdit={() => onEdit(user)} onDelete={() => onDelete(user)} />
      </div>

      <dl className="user-create-card__meta" aria-label={`${user.fullName} details`}>
        <div>
          <dt>Employee ID</dt>
          <dd>{user.employeeId}</dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>{user.email}</dd>
        </div>
        <div>
          <dt>Phone Number</dt>
          <dd>{user.phoneNumber}</dd>
        </div>
        <div>
          <dt>Role</dt>
          <dd>{user.role}</dd>
        </div>
      </dl>
    </GlassCard>
  )
}
