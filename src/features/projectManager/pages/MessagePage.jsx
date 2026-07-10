import { GlassCard, SectionHeader } from '../../../components/UI/UI'

const messages = [
  { sender: 'Site Lead', subject: 'Material arrival update' },
  { sender: 'Safety Team', subject: 'PPE reminder for afternoon shift' },
  { sender: 'Planning Office', subject: 'Revised chainage schedule' },
]

export function MessagePage() {
  return (
    <div className="page-grid">
      <SectionHeader eyebrow="Communication" title="Messages" subtitle="Team communications and internal updates are collected here." />

      <div className="site-row">
        {messages.map((message) => (
          <GlassCard key={message.subject} className="site-card">
            <div className="site-head">
              <strong>{message.subject}</strong>
              <span className="chip">{message.sender}</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
