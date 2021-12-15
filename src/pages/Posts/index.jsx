import HeaderTwo from '../../components/HeaderTwo';
import NavigationBar from '../../components/NavigationBar';
import { getUserById } from '../../helpers/users';
import { useState, useEffect } from 'react';
import '../../styles/Posts.css'

function Posts(){
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        function postsAll(){
            fetch("http://localhost:3000/api/posts/index", {
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
                              {/*<img src={ getUserById(post.userId).imageUrl } className='avatar' alt="avatar"  />*/}
                              <div className="post-title">
                                <h4>{post.title}</h4>
                                <p>likes</p>
                              </div>
                              <p>publié le { new Date(post.createdAt).toLocaleDateString() }</p>
                              {/*<p>publié par { getUserById(post.userId).lastname } le { post.createdAt }</p>*/}
                            </div>
                            <div className="post-text">
                              <p>{ post.content }</p>
                            </div>
                            <div className='post-bottom'>
                              <div className="post-bottom-like">
                                 <i className="fa-light fa-thumbs-up"></i><p>Liker</p><i className="fa-light fa-thumbs-down"></i>
                              </div>
                              <div className="post-bottom-comment">
                                <p>Commentaires</p><i className="fa-light fa-comment-lines"></i>
                              </div>
                              <div className="post-bottom-signal">
                                <p>Signaler</p><i className="fa-regular fa-xmark"></i>
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
