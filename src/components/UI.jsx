import { motion } from 'framer-motion'

export function GlassCard({ className = '', children, onClick, style }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`glass-card ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeader({ eyebrow, title, subtitle, actions }) {
  return (
    <div className="section-header">
      <div>
        {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      {actions ? <div className="section-actions">{actions}</div> : null}
    </div>
  )
}

export function MetricCard({ label, value, subvalue, tone = 'cyan', icon }) {
  return (
    <GlassCard className={`metric-card tone-${tone}`}>
      <div className="metric-top">
        <span>{label}</span>
        <span className="metric-icon">{icon}</span>
      </div>
      <strong>{value}</strong>
      {subvalue ? <small>{subvalue}</small> : null}
    </GlassCard>
  )
}

export function StatusPill({ children, variant = 'success' }) {
  return <span className={`status-pill ${variant}`}>{children}</span>
}

export function ActionButton({ children, variant = 'primary', ...rest }) {
  return (
    <button className={`action-button ${variant}`} type="button" {...rest}>
      {children}
    </button>
  )
}

export function Drawer({ open, title, subtitle, children, onClose }) {
  if (!open) return null

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <motion.div
        className="drawer-panel"
        initial={{ x: 420, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 420, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="drawer-header">
          <div>
            <h3>{title}</h3>
            {subtitle ? <p>{subtitle}</p> : null}
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close drawer">
            ×
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  )
}

export function ValidationChecklist({ checks }) {
  return (
    <div className="validation-grid">
      {checks.map((check) => (
        <div key={check.label} className={`validation-item ${check.valid ? 'valid' : 'invalid'}`}>
          <span>{check.valid ? '●' : '○'}</span>
          <small>{check.label}</small>
        </div>
      ))}
    </div>
  )
}
