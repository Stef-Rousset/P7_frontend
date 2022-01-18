import HeaderTwo from '../../components/HeaderTwo';
import NavigationBar from '../../components/NavigationBar';
import Comments from '../../components/Comments';
import { handlePostSignalment, addLikeToPost, addDislikeToPost, handleComments, handleSuppressPost } from '../../helpers/posts';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import './post.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faThumbsUp, faThumbsDown, faTimes, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

function Post(){
    const  { id } = useParams();
    let navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [count, setCount] = useState(0);
    useEffect(() => {
        function getPost(){
            fetch(`http://localhost:8080/api/posts/show/${id}/`, {
                          method: "GET",
                          headers: {  'Accept': 'application/json',
                                      'Content-Type': 'application/json',
                                      'Authorization': `Bearer ${localStorage.getItem('token')}`,
                          }
            })
            .then(response => response.json())
            .then(data => {
                setPost(data.post)
                setCount(data.post.Likes.filter(like => like.status === "like").length)
                return null;
            })
            .catch(function(error){
                alert(error)
                return null;
            })
        }
        getPost();
    }, [id, count]);

    return(
          <div className="post-alone">
          < HeaderTwo />
          <div className="post-container" role="main">
             {post && <section className="one-post">
                          <div className="post-top">
                            <div className="post-top-left">
                              <img src={ post.User.imageUrl } className='avatar' alt={ post.User.lastName }  />
                              <div className="post-title">
                                <h3>{post.title}</h3>
                                <p>{count} likes</p>
                              </div>
                            </div>
                            <p className="post-top-right">publié par { post.User.firstName } { post.User.lastName } le { new Date(post.createdAt).toLocaleDateString() }</p>
                          </div>
                          <div className="post-text">
                            <p>{ post.content }</p>
                          </div>
                          <div className='post-bottom'>
                            <div className="post-bottom-like">
                               <FontAwesomeIcon icon={ faThumbsUp } className="icon-links" onClick={() => { addLikeToPost(post.id); post.userId === parseInt(localStorage.getItem('id')) ? setCount(count) : setCount(count + 1) }} />
                               <p>Like</p>
                               <FontAwesomeIcon icon={ faThumbsDown } className="icon-links" onClick={() => { addDislikeToPost(post.id); count > 0 && post.userId !== parseInt(localStorage.getItem('id')) ? setCount(count - 1) : setCount(count) }} />
                            </div>
                            <div className="post-bottom-comment" onClick={() => { handleComments() }}>
                              <p className="post-links">Commentaires</p><FontAwesomeIcon icon={ faComments } className="icon-links" />
                            </div>
                            <div className="post-bottom-signal" onClick={() => { handlePostSignalment(post.id) }}>
                              <p className="post-links" >Signaler</p><FontAwesomeIcon icon={ faExclamationCircle } className="icon-links"/>
                            </div>
                            { post.userId === parseInt(localStorage.getItem('id')) ?
                              <div className='post-bottom-suppress' onClick={() => { handleSuppressPost(post.id); navigate('/posts') }}>
                                <p className="post-links">Supprimer le post</p><FontAwesomeIcon icon={ faTimes } className="icon-links"/>
                              </div>
                              : null
                            }
                          </div>
                           <div className="comments show-comments">
                           <Comments post={post}/>
                          </div>
                      </section>
              }
              <nav className="navbar">
                 < NavigationBar />
              </nav>
          </div>
      </div>
    );
}

export default Post;
