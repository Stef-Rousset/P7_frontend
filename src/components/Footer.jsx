import logoLeft from '../assets/icon-left.png';
import facebook from '../assets/facebook-icon.png';
import instagram from '../assets/instagram-icon.png';
import twitter from '../assets/twitter-icon.png';
import '../styles/Footer.css';

function Footer(){
  return(
        <div className="footer-container">
          <img src={ logoLeft } className="footer-container-logo" alt="logo groupomania" />
        <div className="footer-container-networks">
          <img src={ facebook } className="footer-container-image" alt="logo facebook" />
          <img src={ instagram } className="footer-container-image" alt="logo instagram" />
          <img src={ twitter } className="footer-container-image" alt="logo twitter" />
        </div>
        </div>
    )
}

export default Footer;
