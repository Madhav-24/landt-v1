import { FaCircle, FaUserCircle } from 'react-icons/fa'
import './UserProfileCard.css'

function formatStatus(status) {
  const normalized = (status ?? '').toLowerCase()
  if (normalized === 'offline') return 'offline'
  if (normalized === 'away') return 'away'
  return 'online'
}

export function UserProfileCard({ image, name, designation, role, status = 'online', onClick }) {
  const normalizedStatus = formatStatus(status)
  const displayName = name || 'User'
  const displayDesignation = designation || role || 'Team Member'

  return (
    <button type="button" className="profile-card" onClick={onClick} aria-label={`${displayName} profile`}>
      <div className="profile-avatar-wrap">
        {image ? <img className="profile-avatar" src={image} alt={`${displayName} avatar`} /> : <FaUserCircle className="profile-avatar profile-avatar-fallback" aria-hidden="true" />}
        <span className={`profile-status ${normalizedStatus}`} aria-hidden="true">
          <FaCircle />
        </span>
      </div>
      <div className="profile-content">
        <strong>{displayName}</strong>
        <small>{displayDesignation}</small>
      </div>
    </button>
  )
}
