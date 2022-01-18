
export const handleLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('imageUrl')
    localStorage.removeItem('id')
}

export const handleProfile = () => {
  const profileDiv = document.querySelector('.profile-infos')
  const profileForm = document.querySelector('.profile-form')
  const changePassword = document.querySelector('.change-password');
  const passwordDiv = document.querySelector('.profile-password');
  const changeAvatar = document.querySelector('.change-avatar');
  const avatarDiv = document.querySelector('.profile-form-avatar');
  if (changePassword.classList.contains('hide-profile-element')){
      changePassword.classList.remove('hide-profile-element')
      passwordDiv.classList.add('hide-profile-element')
  }
  if (changeAvatar.classList.contains('hide-profile-element')){
      changeAvatar.classList.remove('hide-profile-element')
      avatarDiv.classList.add('hide-profile-element')
  }
  profileForm.classList.toggle('hide-profile-element')
  profileDiv.classList.toggle('hide-profile-element')
}

export const handleDeleteProfile = () => {
    const requestOptions = {
      method: "DELETE",
      headers: {  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
    }
    fetch(`http://localhost:8080/api/users/profile/`, requestOptions)
    .then(response => response.json())
    .then(data => {
          alert('Your account is deleted ')
          return null;
    })
    .catch(function(error){
        alert(error);
        return null;
    });
}
export const handlePassword = (event) => {
  const passwordDiv = document.querySelector('.profile-password');
  event.target.classList.toggle('hide-profile-element');
  passwordDiv.classList.toggle('hide-profile-element');
}
export const handleAvatar = (event) => {
  const avatarDiv = document.querySelector('.profile-form-avatar');
  event.target.classList.toggle('hide-profile-element');
  avatarDiv.classList.toggle('hide-profile-element');
}
export const deleteErrors = () => {
  // s'il y avait des messages d'erreur dans le form, on les supprime
  const errors = document.querySelectorAll('.errors');
  errors.forEach(error => error.remove())
}

