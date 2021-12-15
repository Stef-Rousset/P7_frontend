import { getUserIdByToken, getUserById } from '../helpers/users';
import '../styles/HeaderTwo.css';

function HeaderTwo(){
  return(
      <header className="site-header">
        <h1>GROUPBOOK</h1>
        <h2>Le réseau social qui rapproche les collaborateurs de Groupomania</h2>
        {/*<img src={ getUserById().imageUrl } className="avatar" alt="avatar" />*/}
      </header>
    )
}

export default HeaderTwo;
