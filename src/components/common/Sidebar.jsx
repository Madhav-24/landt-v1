import { FaSignOutAlt } from 'react-icons/fa'
import { LogoHeader } from './LogoHeader'
import { SidebarMenu } from './SidebarMenu'
import { UserProfileCard } from './UserProfileCard'

export function Sidebar({ menus, user, onLogout, onProfileClick }) {
  const profileName = user?.full_name || user?.name
  const profileDesignation = user?.designation || user?.role
  const profileRole = user?.role
  const profileImage = user?.profile_image
  const profileStatus = user?.online_status || 'online'

  return (
    <aside className="sidebar-shell">
      <LogoHeader />
      <SidebarMenu menus={menus} />

      <div className="sidebar-bottom-stack">
        <UserProfileCard
          image={profileImage}
          name={profileName}
          designation={profileDesignation}
          role={profileRole}
          status={profileStatus}
          onClick={onProfileClick}
        />

        <button className="nav-item logout" type="button" onClick={onLogout}>
          <span className="nav-icon">
            <FaSignOutAlt />
          </span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
