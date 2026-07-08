import { GlassCard } from '../UI'

export function SummaryStatCard({ label, value }) {
  return (
    <GlassCard className="summary-stat-card">
      <small>{label}</small>
      <strong>{value}</strong>
    </GlassCard>
  )
}
