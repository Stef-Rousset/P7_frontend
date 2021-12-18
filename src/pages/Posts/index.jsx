import HeaderTwo from '../../components/HeaderTwo';
import NavigationBar from '../../components/NavigationBar';
import { handlePostSignalment, addLikeToPost, addDislikeToPost } from '../../helpers/posts';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../styles/Posts.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faThumbsUp, faThumbsDown, faTimes } from "@fortawesome/free-solid-svg-icons";


function Posts(){
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        function postsAll(){
            let path = ""
            if (window.location.pathname === '/posts'){
                path = "http://localhost:8080/api/posts/index"
            } else if (window.location.pathname === '/my_posts'){
                path = "http://localhost:8080/api/posts/my_posts"
            } else if (window.location.pathname === '/posts/latest'){
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
        postsAll()
    }, []); //pour que useEffect ne s'effectue qu'au premier render du composant
    return (
        <div className="posts">
          < HeaderTwo />
          <div className="posts-container">
            <div className="posts-content">
              <div className="posts-sort">
                <Link to="/posts/latest" className="post-links" onClick={() => { window.location.reload() }}>Dernières publications</Link>
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
                                  <p>likes</p>
                                </div>
                              </div>
                              <p className="post-top-right">publié par { post.User.firstName } { post.User.lastName } le { new Date(post.createdAt).toLocaleDateString() }</p>
                            </div>
                            <div className="post-text">
                              <p>{ post.content }</p>
                            </div>
                            <div className='post-bottom'>
                              <div className="post-bottom-like">
                                 <FontAwesomeIcon icon={ faThumbsUp } className="icon-links" onClick={() => { addLikeToPost(post.id) }} />
                                 <p>Like</p>
                                 <FontAwesomeIcon icon={ faThumbsDown } className="icon-links" onClick={() => { addDislikeToPost(post.id) }} />
                              </div>
                              <div className="post-bottom-comment">
                                <p className="post-links">Commentaires</p><FontAwesomeIcon icon={ faComments } className="icon-links" />
                              </div>
                              <div className="post-bottom-signal" onClick={() => { handlePostSignalment(post.id) }}>
                                <p className="post-links" >Signaler</p><FontAwesomeIcon icon={ faTimes } className="icon-links"/>
                              </div>
                            </div>
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
