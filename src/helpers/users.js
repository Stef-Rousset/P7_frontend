
export const handleLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('imageUrl')
    localStorage.removeItem('id')
}

export const handleProfile = () => {
  const profileDiv = document.querySelector('.profile-infos')
  const profileForm = document.querySelector('.profile-form')
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

