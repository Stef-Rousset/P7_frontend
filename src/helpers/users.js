
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
      //console.log(data.user)
        if (data.user.role === 'admin'){
          //console.log('true')
          return true
        } else {
          //console.log('false')
          return false
        }
    })
    .catch(function(error){
        alert(error);
    });
}

// export const getIdFromToken = (token) => {
//     const requestOptions = {
//       method: "GET",
//       headers: {  'Accept': 'application/json',
//                   'Content-Type': 'application/json',
//                   'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                 }
//     }
//     fetch(`http://localhost:8080/api/users/profile`, requestOptions)
//     .then(response => response.json())
//     .then(data => {
//       console.log(data.user.id)
//         return data.user.id;
//     })
//     .catch(function(error){
//         alert(error);
//     });
// }
export const handleLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('img')
    localStorage.removeItem('id')
}




