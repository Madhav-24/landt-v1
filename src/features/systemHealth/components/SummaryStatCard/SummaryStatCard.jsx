import { GlassCard } from '../../../../components/UI/UI'
import './SummaryStatCard.css'

export function SummaryStatCard({ label, value }) {
  return (
    <GlassCard className="summary-stat-card">
      <small>{label}</small>
      <strong>{value}</strong>
    </GlassCard>
  )
}
