import '../styles/HeaderOne.css';
import logoAbove from '../assets/icon-above.png';
import { Link } from 'react-router-dom';

function HeaderOne(){
  return(
      <header className="home-header">
        <img src={ logoAbove } className="home-logo" alt="logo" />
        <div className="home-btns">
          <Link to="/signup" className="btn btn-signup">SIGNUP</Link>
          <Link to="/login" className="btn btn-login">LOGIN</Link>
        </div>
      </header>
    )
}

export default HeaderOne;
