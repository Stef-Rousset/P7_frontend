import HeaderTwo from '../../components/HeaderTwo';
import NavigationBar from '../../components/NavigationBar';
import { useState, useEffect } from 'react';
import '../../styles/Posts.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faThumbsUp, faThumbsDown, faTimes } from "@fortawesome/free-solid-svg-icons";



function Posts(){
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        function postsAll(){
            fetch("http://localhost:8080/api/posts/index", {
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
                <h3 className="posts-sort-by-date">Dernières publications</h3>
                <h3 className="posts-sort-by-like">Les plus populaires</h3>
              </div>
              <div className="posts-all">
              { posts && posts.map(post => (
                        <div key={post.id} className="post">
                            <div className="post-top">
                              <img src={ post.User.imageUrl } className='avatar' alt="avatar"  />
                              <div className="post-title">
                                <h4>{post.title}</h4>
                                <p>likes</p>
                              </div>
                              <p className="post-published">publié par { post.User.firstName } { post.User.lastName } le { new Date(post.createdAt).toLocaleDateString() }</p>
                            </div>
                            <div className="post-text">
                              <p>{ post.content }</p>
                            </div>
                            <div className='post-bottom'>
                              <div className="post-bottom-like">
                                 <FontAwesomeIcon icon={ faThumbsUp } /><p>Liker</p><FontAwesomeIcon icon={ faThumbsDown } />
                              </div>
                              <div className="post-bottom-comment">
                                <p>Commentaires</p><FontAwesomeIcon icon={ faComments } />
                              </div>
                              <div className="post-bottom-signal">
                                <p>Signaler</p><FontAwesomeIcon icon={ faTimes } />
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
