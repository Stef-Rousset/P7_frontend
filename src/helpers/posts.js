
export const handlePostSignalment = (id) => {
    const requestOptions = {
      method: "POST",
      headers: {  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
      body: JSON.stringify({ id: `${id}` })
    }
    fetch(`http://localhost:8080/api/posts/post_signalments/new`, requestOptions)
    .then(response => {
        alert('Post signalment added')
        return null;
    })
    .catch(function(error){
        alert(error);
        return null;
    });
}

export const addLikeToPost = (id) => {
  const requestOptions = {
      method: "POST",
      headers: {  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
      body: JSON.stringify({ postId: `${id}`, status: 'like' })
    }
    fetch('http://localhost:8080/api/posts/like', requestOptions)
    .then(response => {
        if (response.status === 201){
            alert('Like added to post')
            window.location.reload()
        } else if (response.status === 200 ){
            alert('Like status modified')
            window.location.reload()
        } else if (response.status === 401){
            alert('You cannot like or dislike your own post')
        }
        return null;
    })
    .catch(function(error){
        alert(error);
        return null;
    });
}

export const addDislikeToPost = (id) => {
  const requestOptions = {
      method: "POST",
      headers: {  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
      body: JSON.stringify({ postId: `${id}`, status: 'dislike' })
    }
    fetch('http://localhost:8080/api/posts/like', requestOptions)
    .then(response => {
        if (response.status === 201){
            alert('Dislike added to post')
            window.location.reload()
        } else if (response.status === 200 ){
            alert('Like status modified')
            window.location.reload()
        } else if (response.status === 401){
            alert('You cannot like or dislike your own post')
        }
        return null;
    })
    .catch(function(error){
        alert(error);
        return null;
    });
}

export const handleSuppressPost = (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
    }
    fetch(`http://localhost:8080/api/posts/delete/${id}`, requestOptions)
    .then(response => {
        alert('post deleted')
        return null;
    })
    .catch(function(error){
        alert(error);
        return null;
    });
}

export const handleComments = () => {
    const commentsDiv = document.querySelector('.comments');
    commentsDiv.classList.toggle('show-comments');
}

export const handleCommentSignalment = (id) => {
    const requestOptions = {
      method: "POST",
      headers: {  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
      body: JSON.stringify({ id: `${id}` })
    }
    fetch(`http://localhost:8080/api/comment_signalments/new`, requestOptions)
    .then(response => {
        alert('Comment signalment added')
        return null;
    })
    .catch(function(error){
        alert(error);
        return null;
    });
}


