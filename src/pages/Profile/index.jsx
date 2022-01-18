import HeaderTwo from '../../components/HeaderTwo';
import NavigationBar from '../../components/NavigationBar';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { handleProfile, handleDeleteProfile, handlePassword, handleAvatar, deleteErrors  } from '../../helpers/users';
import './profile.css';

function Profile(){
    const [user, setUser] = useState();
    const { register, handleSubmit, formState: { errors, touchedFields } } = useForm({ mode: 'onBlur' });
    const navigate = useNavigate();

    function onSubmit(data){
        // envoyer seulement les champs modifiés
        const fields = Object.keys(touchedFields)
        const hash = {}
        fields.forEach(field => hash[field] = data.[field])

        fetch("http://localhost:8080/api/users/profile", {
                method: "PUT",
                headers: {  'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(hash),
            })
            .then(response => response.json())
            .then(data => {
                alert("Votre profil a bien été modifié !")
                localStorage.setItem('img', data.user.imageUrl)
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
                    localStorage.setItem('img', data.user.imageUrl)
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
                          <div className="profile-button" onClick={() => { handleProfile(); deleteErrors() }}>
                            Modifier mon profil
                          </div>
                          <div className="profile-button" onClick={() => { handleDeleteProfile(); navigate('/signup') }}>
                          Supprimer mon compte
                          </div>
                        </div>
                      </div>
                      <form className="profile-form hide-profile-element" onSubmit={ handleSubmit(onSubmit) }>
                        <h3>Modifier vos informations</h3>
                        <div className="profile-form-infos">
                          <div className="profile-firstname" >
                            <label htmlFor="firstName">Prénom</label>
                            <input type="text" name="firstName" id="firstName" defaultValue={user.firstName} { ...register("firstName", { required: true, minLength: 2, pattern: /^[a-zA-Z][a-zA-Z-\s]+[a-zA-Z]$/ }) } />
                          </div>
                          {errors.firstName && <p className="errors">Un prénom d'au moins 2 caractères est requis</p>}
                          <div className="profile-lastname">
                            <label htmlFor="lastName">Nom</label>
                            <input type="text" name="lastName" id="lastName" defaultValue={user.lastName} { ...register("lastName", { required: true, minLength: 1, pattern: /^[a-zA-Z][a-zA-Z-\s]+[a-zA-Z]$/ })} />
                          </div>
                          {errors.lastName && <p className="errors">Un nom d'au moins 1 caractère est requis</p>}
                          <div className="profile-email">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" id="email" defaultValue={user.email} { ...register("email", { required: true, pattern: /^[\S]+@[\S]+\.{1}[\S]+$/ }) } />
                          </div>
                          {errors.email && <p className="errors">Un email valide est requis</p>}
                          <h4 className="change-password" onClick={ handlePassword }>Modifier le mot de passe</h4>
                          <div className="profile-password hide-profile-element">
                            <label htmlFor="password">Mot de passe</label>
                            <input type="password" name="password" id="password" { ...register("password", { minLength: 6, maxLength: 30, pattern: /[a-zA-Z\d]+$/ }) } />
                          </div>
                          { errors.password && <p className="errors">Un password de 6 à 30 caratères comprenant une minuscule, une majuscule, un chiffre et sans espace est requis</p>}
                          <h4 className="change-avatar" onClick={ handleAvatar }>Modifier votre photo</h4>
                          <div className="profile-form-avatar hide-profile-element">
                            <label htmlFor="imageUrl">Avatar</label>
                            <input type="file" name="imageUrl" id="imageUrl" { ...register("imageUrl")} />
                          </div>
                          { errors.imageUrl && <p className="errors">Seules sont autorisées les extensions .jpg, .png et .jpeg</p>}
                        </div>
                        <div className="profile-form-buttons">
                          <input type="submit" className="profile-form-button" onClick={ handleProfile }/>
                          <a href="#" className="profile-form-button" onClick={ handleProfile } >Annuler</a>
                        </div>
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
