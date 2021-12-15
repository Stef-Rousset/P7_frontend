import { Link } from 'react-router-dom';
import logoAbove from '../assets/icon-above.png';
import '../styles/HeaderOne.css';

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
