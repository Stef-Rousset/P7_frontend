import logoLeft from '../assets/icon-left.png';
import facebook from '../assets/facebook-icon.png';
import instagram from '../assets/instagram-icon.png';
import twitter from '../assets/twitter-icon.png';
import '../styles/Footer.css';

function Footer(){
  return(
        <footer className="footer-container">
          <img src={ logoLeft } className="footer-container-logo" alt="logo groupomania" />
          <div className="footer-container-networks">
            <a href="#"><img src={ facebook } className="footer-container-image" alt="logo facebook" /></a>
            <a href="#"><img src={ instagram } className="footer-container-image" alt="logo instagram" /></a>
            <a href="#"><img src={ twitter } className="footer-container-image" alt="logo twitter" /></a>
          </div>
        </footer>
    )
}

export default Footer;
