import HeaderOne from '../../components/HeaderOne';
import { useForm } from 'react-hook-form';
import '../../styles/Signup.css';

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });
  const onSubmit = data => console.log(data);

  return (
    <div className="signup">
      < HeaderOne />
      <div className="home-container">
        <div className="home-container-text">
          <h1>BIENVENUE SUR GROUPBOOK</h1>
          <h2>Le réseau social qui rapproche les collaborateurs de Groupomania</h2>
        </div>
        <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
          <h3>Entrez vos informations</h3>
          <div className="signup-form-line">
            <label htmlFor="firstName">Prénom</label>
            <input type="text" name="firstName" id="firstName" placeholder="Paul"{ ...register("firstName", { required: true, minLength: 2, pattern: /^[a-zA-Z][a-zA-Z-\s]+[a-zA-Z]$/ }) } />
          </div>
          {errors.firstName && <p>Un prénom d'au moins 2 caractères est requis</p>}
          <div className="signup-form-line">
            <label htmlFor="lastName">Nom</label>
            <input type="text" name="lastName" id="lastName" placeholder="Martin" { ...register("lastName", { required: true, minLength: 1, pattern: /^[a-zA-Z][a-zA-Z-\s]+[a-zA-Z]$/ }) } />
          </div>
          {errors.lastName && <p>Un nom d'au moins 1 caractère est requis</p>}
          <div className="signup-form-line">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" placeholder="paul.martin@gmail.com" { ...register("email", { required: true, pattern: /^\A[\w]+@[\w]+\.{1}[\w]+\z$/ }) } />
          </div>
          { errors.email && <p>Un email valide est requis</p>}
          <div className="signup-form-line">
            <label htmlFor="password">Mot de passe</label>
            <input type="text" name="password" id="password" { ...register("password", { required: true, minLength: 6, maxLength: 30, pattern: /^[a-z]+[A-Z]+[\d]+$/ }) } />
          </div>
          { errors.password && <p>Un password de 6 à 30 caratères comprenant une minuscule, une majuscule, un chiffre et sans espace est requis</p>}
          <input type="submit" />
        </form >
      </div>
    </div>
  );
}

export default Signup;
