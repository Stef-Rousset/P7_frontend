import '../styles/Signalment.css';
import { handleSupressPostSignalment, handleSupressCommentSignalment, handleSuppressPost, handleSuppressComment } from '../helpers/posts';

function Signalment(props){
  return(
    <div className="signalment-infos" key={ props.signalment.Post ? `${props.signalment.id}-post` : `${props.signalment.id}-comment` } >
      <h4 className="signalment-title">Signalé par {props.signalment.User.firstName} {props.signalment.User.lastName} le { new Date(props.signalment.createdAt).toLocaleDateString() }</h4>
      <p className="signalment-content">{props.signalment.Post ? props.signalment.Post.content : props.signalment.Comment.content}</p>
      <div className="signalment-buttons">
      { props.signalment.Post ?
        <>
          <a className="signalment-button" href="#" onClick={() => { handleSupressPostSignalment(props.signalment.id) }}>Dé-signaler</a>
          <a className="signalment-button" href="#" onClick={() => { handleSuppressPost(props.signalment.postId) }}>Supprimer</a>
        </>
        :
        <>
          <a className="signalment-button" href="#" onClick={() => { handleSupressCommentSignalment(props.signalment.id) }}>Dé-signaler</a>
          <a className="signalment-button" href="#" onClick={() => { handleSuppressComment(props.signalment.commentId) }}>Supprimer</a>
        </>
      }
      </div>
    </div>
    )
}

export default Signalment;
