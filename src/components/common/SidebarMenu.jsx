import { FaCamera, FaCogs, FaShieldAlt, FaTachometerAlt, FaUsers } from 'react-icons/fa'
import { MenuItem } from './MenuItem'

const iconMap = {
  Dashboard: <FaTachometerAlt />,
  'System Health': <FaShieldAlt />,
  'Camera Management': <FaCamera />,
  'User Management': <FaUsers />,
  Settings: <FaCogs />,
}

export function SidebarMenu({ menus }) {
  return (
    <nav className="nav-list" aria-label="Primary navigation">
      {menus.map((menu) => (
        <MenuItem key={menu} menu={menu} icon={iconMap[menu]} />
      ))}
    </nav>
  )
}
