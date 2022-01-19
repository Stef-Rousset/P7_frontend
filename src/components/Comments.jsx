import { useForm } from 'react-hook-form';
import { handleCommentSignalment } from './../helpers/posts';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import '../styles/Comments.css';

function Comments(props){
  const { register, handleSubmit } = useForm({ mode: 'onBlur' });
  const postId = props.post.id
  function onSubmit(){
        fetch(`http://localhost:8080/api/posts/${postId}/comment`, {
                method: "POST",
                headers: {  'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify( {
                                      content: document.getElementById("comment-content").value,
                                      userId: parseInt(localStorage.getItem('id')),
                                      postId: postId,
                                      }
                                    )
            })
            .then(response => response.json())
            .then(post => {
                alert("Votre commentaire a bien été crée !")
                window.location.reload()
            })
            .catch(function(error){
                alert(error)
            })
    }
    return (
      <div className="post-comments">
        <div className="new-comment">
          <h4>Votre commentaire</h4>
          <form className="new-comment-form" onSubmit={ handleSubmit(onSubmit) }>
            <label htmlFor="comment-content">Contenu</label>
            <textarea name="comment-content" id="comment-content" placeholder="votre texte" { ...register("comment-content")} />
            <input className="new-comment-submit" type="submit" value="Envoyer" />
          </form>
        </div>
        <div className="old-comments">
          { props.post.Comments.map(comment => (
              <div key={ comment.id } className="one-comment">
                <h5>Ajouté par { comment.User.firstName } { comment.User.lastName }</h5>
                <h6>le { new Date(comment.createdAt).toLocaleDateString() }</h6>
                <p>{ comment.content }</p>
                <div className="comment-signal" onClick={() => { handleCommentSignalment(comment.id) }}>
                  <p className="post-links" >Signaler</p><FontAwesomeIcon icon={ faExclamationCircle } className="icon-links"/>
                </div>
              </div>
              )
          )}
        </div>
      </div>
    )
}

export default Comments;
