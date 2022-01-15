import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { handleLogOut } from '../helpers/users';
import navImage from '../assets/nav_img.png';
import '../styles/NavigationBar.css';

function NavigationBar(){
  const [user, setUser] = useState();
  useEffect(() => {
      function getUser(){
          const requestOptions = {
            method: "GET",
            headers: {  'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                      }
          }
          fetch(`http://localhost:8080/api/users/profile/`, requestOptions)
          .then(response => response.json())
          .then(data => {
              setUser(data.user)
              return null;
          })
          .catch(function(error){
              alert(error);
              return null;
          });
      }
      getUser();
  }, []);
  return(
    <div className="nav-container">
    {user && <>
        <img src={ navImage } className="nav-logo" alt="call" />
        { window.location.pathname !== '/posts' &&
           <Link to="/posts" className="btn btn-nav"><p>Liste des posts</p></Link>
        }
        { window.location.pathname !== '/new_post' &&
          <Link to="/new_post" className="btn btn-nav"><p>Ajouter un post</p></Link>
        }
        { window.location.pathname !== "/my_posts" &&
          <Link to="/my_posts" className="btn btn-nav" ><p>Voir mes posts</p></Link>
        }
        { window.location.pathname !== '/profile' &&
          <Link to="/profile" className="btn btn-nav"><p>Voir mon profil</p></Link>
        }
        { window.location.pathname !== '/moderation' && user.role === 'admin' &&
          <Link to="/moderation" className="btn btn-nav"><p>Modération</p></Link>
        }
        <Link to="/" className="btn btn-nav" onClick={ handleLogOut }>Se déconnecter</Link>
        </>
    }
    </div>
  )
}

export default NavigationBar;
