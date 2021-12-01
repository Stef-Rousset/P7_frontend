import '../styles/HeaderOne.css';
import logoAbove from '../assets/icon-above.png';

function HeaderOne(){
  return(
      <header className="home-header">
        <img src={ logoAbove } className="home-logo" alt="logo" />
        <div className="home-btns">
          <a className="btn btn-signup" href="#">SIGNUP</a>
          <a className="btn btn-login" href="#">LOGIN</a>
        </div>
      </header>
    )
}

export default HeaderOne;
