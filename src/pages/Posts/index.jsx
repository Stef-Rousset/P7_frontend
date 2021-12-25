import HeaderTwo from '../../components/HeaderTwo';
import NavigationBar from '../../components/NavigationBar';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import '../../styles/Posts.css';


function Posts(){
    const [posts, setPosts] = useState(null);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 5;
    let location = useLocation();
    useEffect(() => {
        function postsAll(location){
            // let path = ""
            // if (location.pathname === '/posts'){
            //     path = "http://localhost:8080/api/posts/index"
            // } else if (location.pathname === '/my_posts'){
            //     path = "http://localhost:8080/api/posts/my_posts"
            // } else if (location.pathname === '/posts_latest'){
            //     path = "http://localhost:8080/api/posts/latest"
            // }
            fetch("http://localhost:8080/api/posts/index/", {
                    method: "GET",
                    headers: {  'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then(response => response.json())
                .then(postsList => {
                        setPosts(postsList)
                })
                .catch(error => {
                    setError(error.message)
                })
        }
        postsAll(location)
    }, [location]); //pour que useEffect ne s'effectue qu'au premier render du composant

      function currentData(posts) {
          const begin = (currentPage - 1) * perPage;
          const end = begin + perPage;
          return posts.slice(begin, end);
      }
      function next(page) {
          setCurrentPage(currentPage => Math.min(currentPage + 1, 10));
      }
      function prev(page) {
          setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
      }
      function jump(page) {
          const pageNumber = Math.max(1, page);
          setCurrentPage(currentPage => Math.min(pageNumber, 10));
      }
      const handleChange = (e, p) => {
          setPage(p);
          prev(p)
          next(p)
          jump(p)
      };
    if (error) return alert(error);
    return (
        <div className="posts">
          < HeaderTwo />
          <div className="posts-container">
            <div className="posts-content">
              <div className="posts-sort">
                <Link to="/posts_latest" className="post-links">Dernières publications</Link>
              </div>
              <div className="posts-all">
                { posts && currentData(posts).map(post => (
                          <div key={post.id} className="post">
                              <div className="post-top">
                                <div className="post-top-left">
                                  <img src={ post.User.imageUrl } className='avatar' alt="avatar"  />
                                  <div className="post-title">
                                    <h4>{post.title}</h4>
                                  </div>
                                </div>
                                <p className="post-top-right">publié par { post.User.firstName } { post.User.lastName } le { new Date(post.createdAt).toLocaleDateString() }</p>
                              </div>
                              <div className="post-text">
                                { post.content.length > 250 ?
                                    <p>{ post.content.slice(0,250) + '...' }</p>
                                :
                                    <p>{ post.content }</p>
                                }
                              </div>
                              <Link to={`/posts/${post.id}`} className="post-more">Voir plus</Link>
                          </div>
                        )
                )}
                <Pagination count={5} page={page} onChange={handleChange} />
              </div>
            </div>
            <div className="navbar">
                < NavigationBar />
            </div>
          </div>
        </div>
    );
}

export default Posts;
