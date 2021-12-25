import HeaderTwo from '../../components/HeaderTwo';
import NavigationBar from '../../components/NavigationBar';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../../styles/NewPost.css';


function NewPost(){
    let navigate = useNavigate();
    const { register, handleSubmit } = useForm({ mode: 'onBlur' });
    function onSubmit(){
        fetch("http://localhost:8080/api/posts/new", {
                method: "POST",
                headers: {  'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify( {
                                      title: document.getElementById("title").value,
                                      content: document.getElementById("content").value,
                                      userId: parseInt(localStorage.getItem('id'))
                                      }
                                    )
            })
            .then(response => response.json())
            .then(post => {
                alert("Votre post a bien été crée !")
                navigate('/posts')
            })
            .catch(function(error){
                alert(error)
            })
    }
    return(
          <div className="new-post">
            < HeaderTwo />
            <div className="new-post-container">
              <div className="new-post-content">
                <h3> Nouveau post</h3>
                <form className="new-post-form" onSubmit={ handleSubmit(onSubmit) }>
                  <label htmlFor="title">Titre du post</label>
                  <input type="text" name="title" id="title" placeholder="mon titre" { ...register("title")} />
                  <label htmlFor="content">Contenu du post</label>
                  <textarea name="content" id="content" placeholder="mon texte" { ...register("content")} />
                  <input type="submit" />
                </form>
              </div>
              <div className="navbar">
                < NavigationBar />
              </div>
            </div>
          </div>)
}

export default NewPost;
