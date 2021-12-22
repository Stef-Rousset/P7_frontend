import HeaderTwo from '../../components/HeaderTwo';
import NavigationBar from '../../components/NavigationBar';
import { handlePostSignalment, addLikeToPost, addDislikeToPost, getTotalLikes } from '../../helpers/posts';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faThumbsUp, faThumbsDown, faTimes } from "@fortawesome/free-solid-svg-icons";

function Post(){
    const  { id } = useParams();
    const [post, setPost] = useState(null);
    useEffect(() => {
        function getPost(){
            fetch(`http://localhost:8080/api/posts/show/${id}`, {
                          method: "GET",
                          headers: {  'Accept': 'application/json',
                                      'Content-Type': 'application/json',
                                      'Authorization': `Bearer ${localStorage.getItem('token')}`,
                          }
            })
            .then(response => response.json())
            .then(data => setPost(data.post))
            .catch(function(error){
                console.log(error)
            })
        }
        getPost();
    }, [id]);

    return(
          <div className="post">
          < HeaderTwo />
          <div className="post-container">
             {post && <div className="one-post">
                          <div className="post-top">
                            <div className="post-top-left">
                              <img src={ post.User.imageUrl } className='avatar' alt="avatar"  />
                              <div className="post-title">
                                <h4>{post.title}</h4>
                                <p>{ getTotalLikes(post.id) } likes</p>
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
                }
            </div>
          <div className="navbar">
              < NavigationBar />
          </div>
      </div>
    );
}

export default Post;
