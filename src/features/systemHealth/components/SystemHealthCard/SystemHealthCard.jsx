import { GlassCard } from '../../../../components/UI/UI'
import './SystemHealthCard.css'

export function SystemHealthCard({ label, value, tone, active, onClick }) {
  return (
    <GlassCard className={`system-kpi-card tone-${tone} ${active ? 'active' : ''}`} onClick={onClick}>
      <span>{label}</span>
      <strong>{value}</strong>
    </GlassCard>
  )
}
