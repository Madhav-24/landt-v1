import { useEffect, useState } from 'react'
import { FaCamera, FaEdit, FaEnvelope, FaIdCard, FaKey, FaMapMarkerAlt, FaPhone, FaShieldAlt, FaUser } from 'react-icons/fa'
import { useAuth } from '../../authentication/context/AuthContext'
import './ProfilePage.css'

function getInitialProfile(user) {
  return {
    name: user?.name ?? '',
    empId: user?.ltId ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    designation: user?.designation ?? user?.role ?? '',
    address: user?.address ?? 'Site Office, Chennai, Tamil Nadu',
  }
}

export function ProfilePage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(getInitialProfile(user))
  const [editMode, setEditMode] = useState(false)
  const [avatar, setAvatar] = useState(user?.profile_image ?? '')
  const [alert, setAlert] = useState({ open: false, type: 'info', message: '' })
  const [passwordStep, setPasswordStep] = useState('idle')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [passwordForm, setPasswordForm] = useState({ otp: '', newPassword: '', confirmPassword: '' })

  useEffect(() => {
    setProfile(getInitialProfile(user))
    setAvatar(user?.profile_image ?? '')
  }, [user])

  function handleChange(event) {
    const { name, value } = event.target
    setProfile((current) => ({ ...current, [name]: value }))
  }

  function handlePhotoUpload(event) {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => setAvatar(reader.result)
    reader.readAsDataURL(file)
    setAlert({ open: true, type: 'success', message: 'Profile photo updated.' })
  }

  function handleSave(event) {
    event.preventDefault()
    if (!profile.name || !profile.email || !profile.phone) {
      setAlert({ open: true, type: 'error', message: 'Name, email and phone are required.' })
      return
    }

    setEditMode(false)
    setAlert({ open: true, type: 'success', message: 'Profile updated successfully.' })
  }

  function handleStartPasswordFlow() {
    const nextOtp = String(Math.floor(100000 + Math.random() * 900000))
    setPasswordForm({ otp: '', newPassword: '', confirmPassword: '' })
    setGeneratedOtp(nextOtp)
    setPasswordStep('otp')
    setAlert({ open: true, type: 'info', message: `OTP generated for ${profile.email || 'your email'}. Enter ${nextOtp}` })
  }

  function handleSendOtp() {
    if (!passwordForm.otp) {
      setAlert({ open: true, type: 'error', message: 'Please enter the OTP first.' })
      return
    }

    if (passwordForm.otp !== generatedOtp) {
      setAlert({ open: true, type: 'error', message: 'The OTP you entered is invalid.' })
      return
    }

    setPasswordStep('passwords')
    setAlert({ open: true, type: 'success', message: 'OTP verified. You can now set a new password.' })
  }

  function handlePasswordChange() {
    if (!passwordForm.newPassword || passwordForm.newPassword.length < 6) {
      setAlert({ open: true, type: 'error', message: 'New password must be at least 6 characters.' })
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setAlert({ open: true, type: 'error', message: 'Passwords do not match.' })
      return
    }

    setPasswordForm({ otp: '', newPassword: '', confirmPassword: '' })
    setGeneratedOtp('')
    setPasswordStep('idle')
    setAlert({ open: true, type: 'success', message: 'Password updated successfully.' })
  }

  return (
    <div className="page-grid profile-page">
      <div className="profile-page__header">
        <div>
          <p className="eyebrow">Personal workspace</p>
          <h2>Profile & account settings</h2>
        </div>
        <button type="button" className="profile-edit-toggle" onClick={() => setEditMode((value) => !value)}>
          <FaEdit /> {editMode ? 'Editing' : 'Edit Profile'}
        </button>
      </div>

      <div className="profile-content">
        <form className="profile-shell" onSubmit={handleSave}>
          <section className="glass-card profile-hero">
            <div className="profile-avatar-block">
              <div className="profile-avatar-wrap">
                {avatar ? <img className="profile-avatar" src={avatar} alt="Profile preview" /> : <FaUser className="profile-avatar profile-avatar-fallback" />}
              </div>
              <label className="upload-pill" htmlFor="profile-photo">
                <FaCamera /> Upload photo
                <input id="profile-photo" type="file" accept="image/*" onChange={handlePhotoUpload} />
              </label>
            </div>

            <div className="profile-hero-copy">
              <h3>{profile.name || 'Employee Profile'}</h3><br />
              <p>{profile.designation || 'Team Member'}</p><br />
              <span className="chip">{profile.empId || 'EMP-000'}</span> <br/>
            </div>
          </section>

          <section className="glass-card profile-form-card">
            <div className="profile-field-grid">
              <label className="profile-field">
                <span>Full name</span>
                <div className="profile-input-wrap">
                  <FaUser />
                  <input name="name" value={profile.name} onChange={handleChange} disabled={!editMode} />
                </div>
              </label>

              <label className="profile-field">
                <span>Employee ID</span>
                <div className="profile-input-wrap">
                  <FaIdCard />
                  <input name="empId" value={profile.empId} onChange={handleChange} disabled={!editMode} />
                </div>
              </label>

              <label className="profile-field">
                <span>Email</span>
                <div className="profile-input-wrap">
                  <FaEnvelope />
                  <input name="email" type="email" value={profile.email} onChange={handleChange} disabled={!editMode} />
                </div>
              </label>

              <label className="profile-field">
                <span>Phone number</span>
                <div className="profile-input-wrap">
                  <FaPhone />
                  <input name="phone" value={profile.phone} onChange={handleChange} disabled={!editMode} />
                </div>
              </label>

              <label className="profile-field">
                <span>Designation</span>
                <div className="profile-input-wrap">
                  <FaShieldAlt />
                  <input name="designation" value={profile.designation} onChange={handleChange} disabled={!editMode} />
                </div>
              </label>

              <label className="profile-field profile-field--full">
                <span>Address</span>
                <div className="profile-input-wrap profile-input-wrap--textarea">
                  <FaMapMarkerAlt />
                  <textarea name="address" value={profile.address} onChange={handleChange} disabled={!editMode} rows="3" />
                </div>
              </label>
            </div>

            <div className="profile-actions">
              <button type="submit" className="profile-save-button" disabled={!editMode}>
                Save Changes
              </button>
            </div>
          </section>
        </form>

        <section className="glass-card password-card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Security</p>
              <h3>Change password with OTP</h3>
            </div>
            <span className="chip">Secure</span>
          </div>
              <br />
          <div className="password-fields">
            {passwordStep === 'idle' ? (
              <button type="button" className="profile-save-button" onClick={handleStartPasswordFlow}>
                <FaKey /> Change Password
              </button>
            ) : null}

            {passwordStep === 'otp' ? (
              <>
                <div className="otp-action-row">
                  <label className="profile-field otp-field">
                    <span>OTP</span>
                    <div className="profile-input-wrap">
                      <FaKey />
                      <input value={passwordForm.otp} onChange={(event) => setPasswordForm((current) => ({ ...current, otp: event.target.value }))} placeholder="Enter OTP" />
                    </div>
                  </label>

                  <button type="button" className="profile-edit-toggle profile-edit-toggle--secondary" onClick={handleSendOtp}>
                    <FaKey /> Send OTP
                  </button>
                </div>
                <p className="password-hint">Use the OTP shown in the popup to continue.</p>
              </>
            ) : null}

            {passwordStep === 'passwords' ? (
              <>
                <label className="profile-field">
                  <span>New password</span>
                  <div className="profile-input-wrap">
                    <FaKey />
                    <input type="password" value={passwordForm.newPassword} onChange={(event) => setPasswordForm((current) => ({ ...current, newPassword: event.target.value }))} placeholder="New password" />
                  </div>
                </label>

                <label className="profile-field">
                  <span>Confirm password</span>
                  <div className="profile-input-wrap">
                    <FaKey />
                    <input type="password" value={passwordForm.confirmPassword} onChange={(event) => setPasswordForm((current) => ({ ...current, confirmPassword: event.target.value }))} placeholder="Confirm password" />
                  </div>
                </label>

                <button type="button" className="profile-save-button" onClick={handlePasswordChange}>
                  Update Password
                </button>
              </>
            ) : null}
          </div>
        </section>
      </div>

      {alert.open ? (
        <div className="alert-backdrop" role="presentation" onClick={() => setAlert((current) => ({ ...current, open: false }))}>
          <div className={`alert-popup alert-popup--${alert.type}`} role="dialog" aria-live="polite" onClick={(event) => event.stopPropagation()}>
            <strong>{alert.type === 'success' ? 'Success' : alert.type === 'error' ? 'Alert' : 'Notice'}</strong>
            <p>{alert.message}</p>
            <button type="button" onClick={() => setAlert((current) => ({ ...current, open: false }))}>Close</button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
