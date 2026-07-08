import { forwardRef } from 'react'

export const AuthInput = forwardRef(function AuthInput(
  { icon, rightIcon, className = '', ...props },
  ref,
) {
  return (
    <div className={`auth-input ${className}`.trim()}>
      {icon ? <span className="auth-input__icon">{icon}</span> : null}
      <input ref={ref} className="auth-input__control" {...props} />
      {rightIcon ? <span className="auth-input__icon auth-input__icon--right">{rightIcon}</span> : null}
    </div>
  )
})
