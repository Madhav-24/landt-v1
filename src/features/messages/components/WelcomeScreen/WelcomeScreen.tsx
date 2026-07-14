import ltLogo from '../../../../assets/logos/lt-logo.png'

export function WelcomeScreen() {
  return (
    <div className="message-welcome-screen" role="status" aria-live="polite">
      <img src={ltLogo} alt="L&T logo" className="message-welcome-logo" />
      <h2>Construction AI Monitoring System</h2>
      <h3>Internal Secure Messaging</h3>
      <p>Select a conversation to start messaging.</p>
    </div>
  )
}
