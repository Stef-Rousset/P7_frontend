import HeaderTwo from '../../components/HeaderTwo';
import NavigationBar from '../../components/NavigationBar';
import Signalment from '../../components/Signalment';
import { useState, useEffect } from 'react';
import './moderation.css';

function Moderation(){
    const [ postSignalments, setPostSignalments ] = useState()
    const [ commentSignalments, setCommentSignalments ] = useState()
    useEffect(() => {
        function getPostSignalments(){
            fetch('http://localhost:8080/api/post_signalments/index', {
                                  method: "GET",
                                  headers: {  'Accept': 'application/json',
                                              'Content-Type': 'application/json',
                                              'Authorization': `Bearer ${localStorage.getItem('token')}`,
                                  }
                    })
                    .then(response => response.json())
                    .then(data => {
                      setPostSignalments(data.postSignalments)
                        return null;
                    })
                    .catch(function(error){
                        alert(error)
                        return null;
                    })
        }
        function getCommentSignalments(){
            fetch('http://localhost:8080/api/comment_signalments/index', {
                                method: "GET",
                                headers: {  'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                                }
                  })
                  .then(response => response.json())
                  .then(data => {
                    setCommentSignalments(data.commentSignalments)
                      return null;
                  })
                  .catch(function(error){
                      alert(error)
                      return null;
                  })
          }
          getPostSignalments()
          getCommentSignalments()
    }, []);
    return (
            <div className="moderation-page">
              <HeaderTwo />
              <div className="moderation-container" role="main">
                <section className="moderation-dashboard">
                  <div className="moderation-dashboard-posts">
                    <h3>Posts signalés</h3>
                    { postSignalments && postSignalments.map(postSignalment => (
                        <Signalment signalment={postSignalment} />
                    ))
                    }
                  </div>
                  <div className="moderation-dashboard-comments">
                    <h3>Commentaires signalés</h3>
                    { commentSignalments && commentSignalments.map(commentSignalment => (
                        <Signalment signalment={commentSignalment} />
                    ))
                    }
                  </div>
                </section>
                <nav className="navbar">
                  < NavigationBar />
                </nav>
              </div>

            </div>
            )
}

export default Moderation;
