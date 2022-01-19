import HeaderOne from '../../components/HeaderOne';
import { useNavigate } from 'react-router-dom';
import './handleErrorNavigation.css'

function HandleErrorNavigation() {
  const navigate = useNavigate();
  return(
      <div>
        < HeaderOne />
        <section className="error-container" role="main">
          <h1>La page demandée n'existe pas...</h1>
          <button className="btn btn-signup" onClick={() => navigate(-1)}>Back to previous page</button>
        </section>
      </div>
    )
}

export default HandleErrorNavigation;
