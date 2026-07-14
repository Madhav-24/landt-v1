import { FaSignOutAlt } from 'react-icons/fa'
import { LogoHeader } from '../LogoHeader/LogoHeader'
import { SidebarMenu } from '../SidebarMenu/SidebarMenu'
import { UserProfileCard } from '../UserProfileCard/UserProfileCard'
import './Sidebar.css'
import kctlogo  from '../../assets/logos/kciri_logo.png'

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
				<img className="logo" src={kctlogo} alt="TIDCO logo" />
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
	);
}
