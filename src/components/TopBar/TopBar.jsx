import { FaBell, FaSyncAlt } from 'react-icons/fa'
import { ActionButton } from '../UI/UI'
import { WeatherWidget } from '../WeatherWidget/WeatherWidget'
import './TopBar.css'

export function TopBar({ user, title, subtitle, onRefresh }) {
  return (
    <header className="topbar-shell">
      <div className="topbar-left">
        <div>
          <div className="eyebrow">{user?.role ?? 'Enterprise Access'}</div>
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </div>
      <div className="topbar-right">
        <WeatherWidget />
        <div className="topbar-actions">
          <ActionButton variant="ghost" onClick={onRefresh}>
            <FaSyncAlt /> Refresh
          </ActionButton>
          <button type="button" className="icon-button">
            <FaBell />
          </button>
        </div>
      </div>
    </header>
  )
}
