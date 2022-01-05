import HeaderTwo from '../../components/HeaderTwo';
import NavigationBar from '../../components/NavigationBar';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { handleProfile, handleDeleteProfile } from '../../helpers/users';
import './profile.css';

function Profile(){
    const [user, setUser] = useState();
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });
    const navigate = useNavigate();

    function onSubmit(data){
        //console.log(data)
        fetch("http://localhost:8080/api/users/profile", {
                method: "PUT",
                headers: {  'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(
                                      { firstName: data.firstName,
                                        lastName: data.lastName,
                                        email: data.email,
                                        password: data.password,
                                      }
                                    ),
            })
            .then(response => response.json())
            .then(data => {
                alert("Votre profil a bien été modifié !")
                localStorage.setItem('imageUrl', data.user.imageUrl)
                return null;
            })
            .catch(function(error){
                alert(error)
                return null;
            })
            const file = data.imageUrl[0];
            //console.log(file)
            if (file !== undefined) {
                const formData = new FormData();
                formData.append('image', file)
                fetch("http://localhost:8080/api/users/profile", {
                    method: "PUT",
                    headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: formData,
                })
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('imageUrl', data.user.imageUrl)
                    return null;
                })
                .catch(function(error){
                    alert(error)
                    return null;
                })
            }
    }

    useEffect(() => {
        function getUserProfile(){
            fetch('http://localhost:8080/api/users/profile', {
                          method: "GET",
                          headers: {  'Accept': 'application/json',
                                      'Content-Type': 'application/json',
                                      'Authorization': `Bearer ${localStorage.getItem('token')}`,
                          }
            })
            .then(response => response.json())
            .then(data => {
              setUser(data.user)
                return null;
            })
            .catch(function(error){
                alert(error)
                return null;
            })
        }
        getUserProfile();
    }, []);

    return(
        <div className="profile-page">
          < HeaderTwo />
          <div className="profile-container">
              {user && <>
                      <div className="profile-infos">
                        <div className="profile-top">
                          <img src={ user.imageUrl } className="profile-avatar" alt="avatar" />
                          <h3>Mes informations</h3>
                        </div>
                        <div className="profile-bottom">
                          <div className="profile-firstname">
                            <h4>Prénom</h4>
                            <p>{ user.firstName }</p>
                          </div>
                          <div className="profile-lastname">
                            <h4>Nom</h4>
                            <p>{ user.lastName }</p>
                          </div>
                          <div className="profile-email">
                            <h4>Email</h4>
                            <p>{ user.email }</p>
                          </div>
                        </div>
                        <div className='profile-buttons'>
                          <div className="profile-button" onClick={() => { handleProfile() }}>
                            Modifier mon profil
                          </div>
                          <div className="profile-button" onClick={() => { handleDeleteProfile(); navigate('/signup') }}>
                          Supprimer mon compte
                          </div>
                        </div>
                      </div>
                      <form className="profile-form hide-profile-element" onSubmit={ handleSubmit(onSubmit) }>
                        <label htmlFor="firstName">Prénom</label>
                        <input type="text" name="firstName" id="firstName" defaultValue={user.firstName} { ...register("firstName", { required: true, minLength: 2, pattern: /^[a-zA-Z][a-zA-Z-\s]+[a-zA-Z]$/ }) } />
                        {errors.firstName && <p>Un prénom d'au moins 2 caractères est requis</p>}
                        <label htmlFor="lastName">Nom</label>
                        <input type="text" name="lastName" id="lastName" defaultValue={user.lastName} { ...register("lastName", { required: true, minLength: 1, pattern: /^[a-zA-Z][a-zA-Z-\s]+[a-zA-Z]$/ })} />
                        {errors.lastName && <p>Un nom d'au moins 1 caractère est requis</p>}
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" defaultValue={user.email} { ...register("email", { required: true, pattern: /^[\S]+@[\S]+\.{1}[\S]+$/ }) } />
                        {errors.email && <p>Un email valide est requis</p>}
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" name="password" id="password" { ...register("password", { required: true, minLength: 6, maxLength: 30, pattern: /[a-zA-Z\d]+$/ }) } />
                        { errors.password && <p>Un password de 6 à 30 caratères comprenant une minuscule, une majuscule, un chiffre et sans espace est requis</p>}
                        <label htmlFor="imageUrl">Avatar</label>
                        <input type="file" name="imageUrl" id="imageUrl" { ...register("imageUrl")} />
                        { errors.imageUrl && <p>Seules sont autorisées les extensions .jpg, .png et .jpeg</p>}
                        <input type="submit" />
                      </form>
                      </>
              }
              <div className="navbar">
                 < NavigationBar />
              </div>
          </div>
        </div>
      )
}

export default Profile;
