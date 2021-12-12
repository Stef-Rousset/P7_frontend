import { useForm } from 'react-hook-form';
import HeaderOne from '../../components/HeaderOne';
import { useNavigate } from 'react-router-dom';

function Login() {
  let navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });
  const onSubmit = data => {
      fetch("http://localhost:3000/api/users/login", {
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
                  // stocker le token généré et rediriger sur la page des posts
                localStorage.setItem('token', data.token)
                navigate('/')
          })
          .catch(function(error){
              alert(error);
          });
  };

  return (
    <div className="login">
      < HeaderOne />
      <div className="home-container">
        <div className="home-container-text">
          <h1>BIENVENUE SUR GROUPBOOK</h1>
          <h3>Le réseau social qui rapproche les collaborateurs de Groupomania</h3>
        </div>
        <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <h3>Connexion</h3>
          <div className="signup-form-line">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="email" placeholder="paul.martin@gmail.com" { ...register("email", { required: true, pattern: /^[\S]+@[\S]+\.{1}[\S]+$/ }) } />
            </div>
            { errors.email && <p>Un email valide est requis</p>}
            <div className="signup-form-line">
              <label htmlFor="password">Mot de passe</label>
              <input type="text" name="password" id="password" { ...register("password", { required: true, minLength: 6, maxLength: 30, pattern: /[a-zA-Z\d]+$/ }) } />
            </div>
            { errors.password && <p>Un password de 6 à 30 caratères comprenant une minuscule, une majuscule, un chiffre et sans espace est requis</p>}
            <input type="submit" />
          </form >
      </div>
    </div>
  );
}

export default Login;
