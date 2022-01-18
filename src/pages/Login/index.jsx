import { useForm } from 'react-hook-form';
import HeaderOne from '../../components/HeaderOne';
import { useNavigate } from 'react-router-dom';

function Login() {
  let navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: 'onBlur' });
  const onSubmit = data => {
      fetch("http://localhost:8080/api/users/login", {
              method: "POST",
              headers: {  'Accept': 'application/json',
                          'Content-Type': 'application/json'
              },
              body: JSON.stringify(
                                    {
                                      email: document.getElementById('email').value,
                                      password: document.getElementById('password').value,
                                    }
                                  )
          })
          .then(response => response.json())
          .then(data => {
                  // stocker dans le localStorage les infos nécessaires, et rediriger sur la page des posts
                localStorage.setItem('token', data.token)
                localStorage.setItem('img', data.user.imageUrl)
                localStorage.setItem('id', data.user.id)
                navigate('/posts')
                return null;
          })
          .catch(function(error){
              console.log(error);
              alert("Wrong email or password. Please try again");
              reset(); // vider les inputs du form
              return null;
          });
  };

  return (
    <div className="login">
      < HeaderOne />
      <div className="signup-container">
        <div className="signup-container-text">
          <h1>BIENVENUE SUR GROUPBOOK</h1>
          <h2>Le réseau social qui rapproche les collaborateurs de Groupomania</h2>
        </div>
        <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <h3>Connexion</h3>
          <div className="signup-form-line">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="email" placeholder="paul.martin@gmail.com" { ...register("email", { required: true, pattern: /^[\S]+@[\S]+\.{1}[\S]+$/ }) } />
            </div>
            <div className="signup-form-line">
              <label htmlFor="password">Mot de passe</label>
              <input type="password" name="password" id="password" { ...register("password", { required: true, minLength: 6, maxLength: 30, pattern: /[a-zA-Z\d]+$/ }) } />
            </div>
            <input type="submit" />
          </form >
      </div>
    </div>
  );
}

export default Login;
