import { GlassCard } from '../../../../components/UI/UI'
import './ServerMetricCard.css'

export function ServerMetricCard({ item }) {
  return (
    <GlassCard className="server-metric-card">
      <small>{item.label}</small>
      <strong>{item.value}</strong>
    </GlassCard>
  )
}
