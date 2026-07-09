import { useState } from 'react'
import { GlassCard, SectionHeader, ActionButton } from '../../../components/UI/UI'

export function SettingsPage() {
  const [saved, setSaved] = useState(false)

  return (
    <div className="page-grid">
      <SectionHeader eyebrow="Configuration" title="Platform Settings" subtitle="All sensitive values are expected from environment variables and backend configuration." />
      <GlassCard className="settings-card">
        <p>JWT secret, database credentials, CORS, logging, and media retention belong in backend environment files.</p>
        <p>Frontend only renders secure UI state and never stores server credentials.</p>
        <ActionButton onClick={() => setSaved(true)}>Save Settings</ActionButton>
        {saved ? <small>Configuration saved successfully.</small> : null}
      </GlassCard>
    </div>
  )
}
