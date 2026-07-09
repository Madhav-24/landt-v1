import ltLogo from '../../assets/logos/lt-logo.png'
import tidcoLogo from '../../assets/logos/tidco-logo.png'
import './LogoHeader.css'

export function LogoHeader() {
  return (
    <div className="brand-card brand-card--logos">
      <div className="logo-stack logo-stack--row">
        <div className="logo-box logo-box--lt">
          <img className="logo-image logo-image--lt" src={ltLogo} alt="L&T logo" />
        </div>
        <div className="logo-box logo-box--tidco">
          <img className="logo-image logo-image--tidco" src={tidcoLogo} alt="TIDCO logo" />
        </div>
      </div>
    </div>
  )
}
