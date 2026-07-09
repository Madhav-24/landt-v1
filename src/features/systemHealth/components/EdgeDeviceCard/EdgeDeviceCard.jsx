import { GlassCard } from '../../../../components/UI/UI'
import './EdgeDeviceCard.css'

export function EdgeDeviceCard({ item }) {
  return (
    <GlassCard className="resource-card">
      <div className="resource-header">
        <strong>{item.deviceName}</strong>
        <span>{item.status}</span>
      </div>
      <div className="resource-grid">
        <span>Device ID: {item.deviceId}</span>
        <span>Site: {item.site}</span>
        <span>CPU: {item.cpu}</span>
        <span>RAM: {item.ram}</span>
        <span>Temperature: {item.temperature}</span>
        <span>Storage: {item.storage}</span>
        <span>Network: {item.network}</span>
        <span>Last Heartbeat: {item.lastHeartbeat}</span>
      </div>
    </GlassCard>
  )
}
