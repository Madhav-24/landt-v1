import { useEffect, useState } from 'react'
import { fetchUsers } from '../../../services/dashboardService'
import { GlassCard, SectionHeader, StatusPill } from '../../../components/UI/UI'

export function UserManagementPage() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchUsers().then(setUsers)
  }, [])

  return (
    <div className="page-grid">
      <SectionHeader eyebrow="RBAC" title="User Management" subtitle="Role-based access is centralized for all enterprise identities." />

      <div className="user-grid">
        {users.map((user) => (
          <GlassCard key={user.id} className="user-card">
            <strong>{user.name}</strong>
            <p>{user.role}</p>
            <StatusPill variant={user.status === 'Active' ? 'success' : 'warning'}>{user.status}</StatusPill>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
