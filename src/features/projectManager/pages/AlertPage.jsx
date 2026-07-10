import { GlassCard, SectionHeader } from '../../../components/UI/UI'

const alerts = [
  { title: 'PPE breach at chainage 3+000', time: '08:12', severity: 'High' },
  { title: 'Weather alert for afternoon shower', time: '09:40', severity: 'Medium' },
  { title: 'Material delivery delayed', time: '11:05', severity: 'High' },
]

export function AlertPage() {
  return (
    <div className="page-grid">
      <SectionHeader eyebrow="Operations" title="Alert Center" subtitle="Live alerts and escalation updates for the active site." />

      <div className="site-row">
        {alerts.map((alert) => (
          <GlassCard key={alert.title} className="site-card">
            <div className="site-head">
              <strong>{alert.title}</strong>
              <span className="chip">{alert.severity}</span>
            </div>
            <div className="site-meta">
              <span>Triggered {alert.time}</span>
              <span>Auto escalated</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
