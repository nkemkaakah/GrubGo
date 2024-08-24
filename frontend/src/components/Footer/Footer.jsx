
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <h1 className='footer-heading'>GrubGo</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident nam a et maxime, ex rem nulla natus magni cupiditate similique, omnis ea explicabo, amet doloremque dolor cumque veniam dignissimos. Quis?</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+44 876 6748 310</li>
                <li>contact@official.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 GrubGo.com - All RIght Reserved.</p>
    </div>
  )
}

export default Footer
