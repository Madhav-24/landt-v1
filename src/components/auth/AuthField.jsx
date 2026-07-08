export function AuthField({ label, error, rightSlot, children, className = '' }) {
  return (
    <label className={`auth-field ${className}`.trim()}>
      <div className="auth-field__header">
        <span>{label}</span>
        {rightSlot ? <span className="auth-field__right">{rightSlot}</span> : null}
      </div>
      {children}
      {error ? <small className="auth-field__error">{error}</small> : null}
    </label>
  )
}
