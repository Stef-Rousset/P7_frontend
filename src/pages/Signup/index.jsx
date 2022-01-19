import HeaderOne from '../../components/HeaderOne';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './signup.css';

function Signup() {
  let navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });
  const onSubmit = data => {
      fetch("http://localhost:8080/api/users/signup", {
              method: "POST",
              headers: {  'Accept': 'application/json',
                          'Content-Type': 'application/json'
              },
              body: JSON.stringify(
                                    { firstName: data.firstName,
                                      lastName: data.lastName,
                                      email: data.email,
                                      password: data.password,
                                    }
                                  )
          })
          .then(response => response.json())
          .then(data => {
              // stocker dans le localStorage les infos nécessaires, puis message de succès et redirection sur la page des posts
              localStorage.setItem('token', data.token)
              localStorage.setItem('img', data.user.imageUrl)
              localStorage.setItem('id', data.user.id)
              alert(`Bienvenue ${data.user.firstName} ${data.user.lastName} au sein du réseau social interne de Groupomania ! `)
              navigate('/posts')
              return null;
          })
          .catch(function(error){
              alert("An error occured, please try again");
              console.log(error);
              return null;
          });
  };

  return (
    <div className="signup" role="main">
      < HeaderOne />
      <section className="signup-container">
        <div className="signup-container-text">
          <h1>BIENVENUE SUR GROUPBOOK</h1>
          <h2>Le réseau social qui rapproche les collaborateurs de Groupomania</h2>
        </div>
        <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
          <h3>Entrez vos informations</h3>
          <div className="signup-form-line">
            <label htmlFor="firstName">Prénom</label>
            <input type="text" name="firstName" id="firstName" placeholder="Paul" { ...register("firstName", { required: true, minLength: 2, pattern: /^[a-zA-Z][a-zA-Z-\s]+[a-zA-Z]$/ }) } />
          </div>
          {errors.firstName && <p>Un prénom d'au moins 2 caractères est requis</p>}
          <div className="signup-form-line">
            <label htmlFor="lastName">Nom</label>
            <input type="text" name="lastName" id="lastName" placeholder="Martin" { ...register("lastName", { required: true, minLength: 1, pattern: /^[a-zA-Z][a-zA-Z-\s]+[a-zA-Z]$/ }) } />
          </div>
          {errors.lastName && <p>Un nom d'au moins 1 caractère est requis</p>}
          <div className="signup-form-line">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" placeholder="paul.martin@gmail.com" { ...register("email", { required: true, pattern: /^[\S]+@[\S]+\.{1}[\S]+$/ }) } />
          </div>
          {errors.email && <p>Un email valide est requis</p>}
          <div className="signup-form-line">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" id="password" { ...register("password", { required: true, minLength: 6, maxLength: 30, pattern: /[a-zA-Z\d]+$/ }) } />
          </div>
          { errors.password && <p>Un password de 6 à 30 caratères comprenant une minuscule, une majuscule, un chiffre et sans espace est requis</p>}
          <input type="submit" />
        </form >
      </section>
    </div>
  );
}

export default Signup;
