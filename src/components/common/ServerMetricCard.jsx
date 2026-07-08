import { GlassCard } from '../UI'

export function ServerMetricCard({ item }) {
  return (
    <GlassCard className="server-metric-card">
      <small>{item.label}</small>
      <strong>{item.value}</strong>
    </GlassCard>
  )
}
