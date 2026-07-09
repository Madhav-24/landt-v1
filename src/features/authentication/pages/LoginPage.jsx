import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaEye, FaEyeSlash, FaLock, FaUser } from 'react-icons/fa'
import {
  APP_NAME,
  APP_SUBTITLE,
  DEMO_EMAIL,
  DEMO_PASSWORD,
  PM_EMAIL,
  PM_LT_ID,
  PM_NAME,
  PM_PASSWORD,
  PM_PHONE,
} from '../../../utils/constants'
import { useAuth } from '../context/AuthContext'
import ltLogo from '../../../assets/logos/lt-logo.png'
import { AuthCard } from '../components/AuthCard/AuthCard'
import { AuthField } from '../components/AuthField/AuthField'
import { AuthButton } from '../components/AuthButton/AuthButton'
import { AuthInput } from '../components/AuthInput/AuthInput'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { identifier: '', password: DEMO_PASSWORD, rememberMe: true },
  })

  async function onSubmit(values) {
    try {
      const user = await login(values)
      setMessage(`Welcome ${user.name}. Generating JWT and opening the command center...`)
      navigate('/dashboard', { replace: true })
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <div className="login-page">
      <div className="login-glow glow-left" />
      <div className="login-glow glow-right" />

      <motion.section className="login-shell" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <AuthCard className="login-panel">
          <div className="login-brand-copy login-brand-copy--panel">
            <div className="login-brand-mark">
              <img className="login-brand-mark__logo" src={ltLogo} alt="L&T logo" />
            </div>
            <div className="eyebrow">{APP_NAME}</div>
            <div className="login-brand-copy__subtitle">{APP_SUBTITLE}</div>
          </div>

          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="login-heading">
              <h1>Welcome to L&amp;T</h1>
              <p>Login with your L&amp;T employee credentials.</p>
            </div>

            <AuthField label="Email / Employee ID / Phone" error={errors.identifier ? 'Please enter a valid employee identifier.' : ''}>
              <AuthInput
                icon={<FaUser />}
                placeholder="Email, Employee ID, or Phone Number"
                aria-label="Email, Employee ID, or Phone Number"
                {...register('identifier', { required: true, minLength: 3 })}
              />
            </AuthField>

            <AuthField
              label="Password"
              error={errors.password?.message ?? ''}
              rightSlot={<button type="button" className="text-button text-button--inline">Forgot Password?</button>}
            >
              <AuthInput
                icon={<FaLock />}
                rightIcon={
                  <button
                    type="button"
                    className="password-toggle"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword((value) => !value)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                }
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                aria-label="Password"
                {...register('password', {
                  required: 'Password is required.',
                  minLength: { value: 6, message: 'Minimum 6 characters required.' },
                  validate: (value) => {
                    const hasUppercase = /[A-Z]/.test(value)
                    const hasNumber = /\d/.test(value)
                    const hasSpecial = /[^A-Za-z0-9]/.test(value)

                    if (!hasUppercase) return 'Password must include 1 uppercase letter.'
                    if (!hasNumber) return 'Password must include 1 number.'
                    if (!hasSpecial) return 'Password must include 1 special character.'
                    return true
                  },
                })}
              />
            </AuthField>

            <label className="remember-row">
              <input type="checkbox" {...register('rememberMe')} />
              <span>Remember me on this device</span>
            </label>

            <AuthButton type="submit" className="auth-button--submit" disabled={isSubmitting}>
              Sign In To Dashboard →
            </AuthButton>

            <div className="demo-copy">
              <span>Demo admin:</span>
              <strong>Madhav</strong>
              <span>Email:</span>
              <strong>{DEMO_EMAIL}</strong>
              <span>Password:</span>
              <strong>{DEMO_PASSWORD}</strong>

              <span>Project Manager:</span>
              <strong>{PM_NAME}</strong>
              <span>Email:</span>
              <strong>{PM_EMAIL}</strong>
              <span>Phone:</span>
              <strong>{PM_PHONE}</strong>
              <span>L&amp;T ID:</span>
              <strong>{PM_LT_ID}</strong>
              <span>Password:</span>
              <strong>{PM_PASSWORD}</strong>
            </div>

            {message ? <div className="form-message"><FaLock /> {message}</div> : null}
          </form>
        </AuthCard>

        <footer className="login-footer">
          <span>Secure Enterprise Authentication</span>
          <span>Powered by L&amp;T AI Platform</span>
        </footer>
      </motion.section>
    </div>
  )
}
