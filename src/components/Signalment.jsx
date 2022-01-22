import '../styles/Signalment.css';
import { handleSupressPostSignalment, handleSupressCommentSignalment, suppressPostInModeration, suppressCommentInModeration } from '../helpers/posts';


function Signalment(props){

  return(
        <div className="signalment-infos" key={ props.signalment.Post ? `${props.signalment.id}-${props.signalment.Post.content}` : `${props.signalment.id}-${props.signalment.Comment.content}` } >
            <h4 className="signalment-title">Signalé par {props.signalment.User.firstName} {props.signalment.User.lastName} le { new Date(props.signalment.createdAt).toLocaleDateString() }</h4>
            <p className="signalment-content">{props.signalment.Post ? props.signalment.Post.content : props.signalment.Comment.content}</p>
            <div className="signalment-buttons">
            { props.signalment.Post ?
              <>
                <button className="signalment-button" onClick={() => { handleSupressPostSignalment(props.signalment.id) }}>Dé-signaler</button>
                <button className="signalment-button" href="#" onClick={() => { suppressPostInModeration(props.signalment.postId) }}>Supprimer</button>
              </>
              :
              <>
                <button className="signalment-button" href="#" onClick={() => { handleSupressCommentSignalment(props.signalment.id) }}>Dé-signaler</button>
                <button className="signalment-button" href="#" onClick={() => { suppressCommentInModeration(props.signalment.commentId) }}>Supprimer</button>
              </>
            }
            </div>
        </div>
  )
}

export default Signalment;
