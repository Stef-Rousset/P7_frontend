import navImage from '../assets/nav_img.png';
import { Link } from 'react-router-dom';
import { handleLogOut } from '../helpers/users';
import '../styles/NavigationBar.css';

function NavigationBar(){
  return(
    <div className="nav-container">
        <img src={ navImage } className="nav-logo" alt="call" />
        { window.location.pathname !== '/posts' &&
           <Link to="/posts" className="btn btn-nav">Liste des posts</Link>
        }
        { window.location.pathname !== '/new_post' &&
          <Link to="/new_post" className="btn btn-nav">Ajouter un post</Link>
        }
        { window.location.pathname !== '/my_posts/:id' &&
          <Link to="/my_posts/:id" className="btn btn-nav">Voir mes posts</Link>
        }
        { window.location.pathname !== '/profile/:id' &&
          <Link to="/profile/:id" className="btn btn-nav">Voir mon profil</Link>
        }
        { window.location.pathname !== '/moderation' &&
          //  ajouter && isAdmin
          <Link to="/moderation" className="btn btn-nav">Modération</Link>
        }
        <Link to="/" className="btn btn-nav" onClick={ handleLogOut }>Se déconnecter</Link>
    </div>
  )
}

export default NavigationBar;
