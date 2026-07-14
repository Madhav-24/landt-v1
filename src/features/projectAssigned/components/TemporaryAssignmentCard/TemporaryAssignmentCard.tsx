import { FaMapMarkerAlt, FaRoute, FaStickyNote, FaUser, FaUserShield } from 'react-icons/fa'
import { GlassCard } from '../../../../components/UI/UI'
import { isSiteRole } from '../../constants/assignmentOptions'
import type { TemporaryAssignment } from '../../types/assignment'

interface TemporaryAssignmentCardProps {
  item: TemporaryAssignment
}

function formatCreatedAt(value: string): string {
  const created = new Date(value)
  const now = new Date()
  if (created.toDateString() === now.toDateString()) {
    return 'Created Today'
  }
  return `Created ${created.toLocaleDateString()}`
}

export function TemporaryAssignmentCard({ item }: TemporaryAssignmentCardProps) {
  const siteRole = isSiteRole(item.role)

  return (
    <GlassCard className="assignment-card">
      <div className="assignment-section">
        <span><FaUser /> Name</span>
        <strong>{item.name}</strong>
      </div>

      <div className="assignment-section">
        <span><FaUserShield /> Role</span>
        <strong>{item.role}</strong>
      </div>

      <div className="assignment-section">
        <span>{siteRole ? <FaMapMarkerAlt /> : <FaRoute />} {siteRole ? 'Assigned Sites' : 'Assigned Chainages'}</span>
        <ul>
          {item.assignments.map((entry) => (
            <li key={`${item.id}-${entry}`}>{entry}</li>
          ))}
        </ul>
      </div>

      <div className="assignment-section">
        <span><FaStickyNote /> Description</span>
        <p>{item.description || 'No description provided.'}</p>
      </div>

      <small className="assignment-created-at">{formatCreatedAt(item.createdAt)}</small>
    </GlassCard>
  )
}
