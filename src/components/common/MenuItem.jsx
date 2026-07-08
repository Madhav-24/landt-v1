import { NavLink } from 'react-router-dom'
import { FaTachometerAlt } from 'react-icons/fa'

export function MenuItem({ menu, icon }) {
  const path = menu === 'Dashboard' ? '/dashboard' : `/dashboard/${menu.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <NavLink
      to={path}
      end={menu === 'Dashboard'}
      className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
    >
      <span className="nav-icon">{icon ?? <FaTachometerAlt />}</span>
      <span>{menu}</span>
    </NavLink>
  )
}
