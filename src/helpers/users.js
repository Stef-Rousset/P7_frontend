
export const isAdmin = (token) => {
    const requestOptions = {
      method: "GET",
      headers: {  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
    }
    fetch(`http://localhost:8080/api/users/profile/`, requestOptions)
    .then(response => response.json())
    .then(data => {
        if (data.user.role === 'admin'){
          return true
        } else {
          return false
        }
    })
    .catch(function(error){
        alert(error);
        return null;
    });
}
export const handleLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('img')
    localStorage.removeItem('id')
}




