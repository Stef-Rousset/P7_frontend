import HeaderTwo from '../../components/HeaderTwo';
import NavigationBar from '../../components/NavigationBar';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../styles/Posts.css';


function Posts(){
    const [posts, setPosts] = useState(null);
    let location = useLocation();
    useEffect(() => {
        function postsAll(location){
            let path = ""
            if (location.pathname === '/posts'){
                path = "http://localhost:8080/api/posts/index"
            } else if (location.pathname === '/my_posts'){
                path = "http://localhost:8080/api/posts/my_posts"
            } else if (location.pathname === '/posts_latest'){
                path = "http://localhost:8080/api/posts/latest"
            }
            fetch(path, {
                    method: "GET",
                    headers: {  'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then(response => response.json())
                .then(postsList => {
                    setPosts(postsList)
                })
                .catch(function(error){
                    console.log(error)
                })
        }
        postsAll(location)
    }, [location]); //pour que useEffect ne s'effectue qu'au premier render du composant
    return (
        <div className="posts">
          < HeaderTwo />
          <div className="posts-container">
            <div className="posts-content">
              <div className="posts-sort">
                <Link to="/posts_latest" className="post-links" onClick={() => { window.location.reload() }}>Dernières publications</Link>
                {/*<Link to="/posts/likes" onClick={() => { window.location.reload() }}>Les plus populaires</Link>*/}
              </div>
              <div className="posts-all">
              { posts && posts.map(post => (
                        <div key={post.id} className="post">
                            <div className="post-top">
                              <div className="post-top-left">
                                <img src={ post.User.imageUrl } className='avatar' alt="avatar"  />
                                <div className="post-title">
                                  <h4>{post.title}</h4>
                                </div>
                              </div>
                              <p className="post-top-right">publié par { post.User.firstName } { post.User.lastName } le { new Date(post.createdAt).toLocaleDateString() }</p>
                            </div>
                            <div className="post-text">
                              <p>{ post.content }</p>
                            </div>
                            <Link to={`/posts/${post.id}`}>Voir plus</Link>
                        </div>
                      )
              )}
              </div>
            </div>
            <div className="navbar">
                < NavigationBar />
            </div>
          </div>
        </div>
    );
}

export default Posts;
