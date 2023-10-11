import './footer.css'
import {useLocation} from 'react-router-dom'

const Footer = () => {
  const location = useLocation()
  const isSplashPage = location.pathname === '/'

  return (
    <footer className={`${isSplashPage ? 'splash-footer' : 'footer-container'}`}>
      <div>Developed by Jared Hem.</div>
      <div className='link'>
        <a href='https://github.com/JvredH' target='_blank'>Github</a>
      </div>
      <div className='link'>
        <a href='https://www.linkedin.com/in/jared-hem/' target='_blank'>LinkedIn</a>
      </div>
    </footer>
  )
};

export default Footer;
