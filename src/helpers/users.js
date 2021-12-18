
export const getUserById = (id) => {
  const requestOptions = {
      method: "GET",
      headers: {  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
  }
  fetch(`http://localhost:8080/api/users/profile/${id}`, requestOptions)
  .then(response => response.json())
  .then(data => { return data.user } )
  .catch(function(error){
      alert(error);
  });

}
export const getUserImgByToken = () => {
  const requestOptions = {
      method: "GET",
      headers: {  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
  }
  fetch('http://localhost:8080/api/users/profile', requestOptions)
  .then(response => response.json())
  .then(data => { return data.user.imageUrl } )
  .catch(function(error){
      alert(error);
  });

}
export const handleLogOut = () => {
    localStorage.removeItem('token')
}


