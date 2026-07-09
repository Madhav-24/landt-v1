import { GlassCard } from '../../../../components/UI/UI'
import './CameraCard.css'

export function CameraCard({ item }) {
  return (
    <GlassCard className="resource-card">
      <div className="resource-header">
        <strong>{item.cameraName}</strong>
        <span>{item.status}</span>
      </div>
      <div className="resource-grid">
        <span>Camera ID: {item.cameraId}</span>
        <span>Site: {item.site}</span>
        <span>Health: {item.health}</span>
        <span>Last Seen: {item.lastSeen}</span>
        <span>Edge Device: {item.edgeDevice}</span>
        <span>AI Status: {item.aiStatus}</span>
      </div>
    </GlassCard>
  )
}
