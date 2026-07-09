import { ActionButton, GlassCard } from '../../../../components/UI/UI'
import './CameraControlPanel.css'

export function CameraControlPanel({ isRecording, onSnapshot, onToggleRecording }) {
  return (
    <GlassCard className="control-panel">
      <div className="control-grid">
        <ActionButton variant="ghost">↑</ActionButton>
        <ActionButton variant="ghost">Pan</ActionButton>
        <ActionButton variant="ghost">↓</ActionButton>
        <ActionButton variant="ghost">←</ActionButton>
        <ActionButton variant="ghost">Tilt</ActionButton>
        <ActionButton variant="ghost">→</ActionButton>
        <ActionButton variant="ghost">Zoom +</ActionButton>
        <ActionButton variant="ghost">Zoom -</ActionButton>
        <ActionButton variant="ghost" onClick={onSnapshot}>Snapshot</ActionButton>
        <ActionButton variant={isRecording ? 'danger' : 'primary'} onClick={onToggleRecording}>
          {isRecording ? 'Stop Recording' : 'Record'}
        </ActionButton>
      </div>
    </GlassCard>
  )
}
