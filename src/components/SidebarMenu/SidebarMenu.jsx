import { FaBell, FaCamera, FaCogs, FaEnvelope, FaFileAlt, FaProjectDiagram, FaShieldAlt, FaTachometerAlt, FaUserPlus, FaUsers } from 'react-icons/fa'
import { MenuItem } from '../MenuItem/MenuItem'
import './SidebarMenu.css'

const iconMap = {
  Dashboard: <FaTachometerAlt />,
  Camera: <FaCamera />,
  Alert: <FaBell />,
  Report: <FaFileAlt />,
  Message: <FaEnvelope />,
  'System Health': <FaShieldAlt />,
  'Camera Management': <FaCamera />,
  'User Management': <FaUsers />,
  'User Create': <FaUserPlus />,
  'Project Assigned': <FaProjectDiagram />,
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
