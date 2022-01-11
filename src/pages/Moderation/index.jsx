import HeaderTwo from '../../components/HeaderTwo';
import NavigationBar from '../../components/NavigationBar';
import './moderation.css';

function Moderation(){

  return (
          <div className="moderation-page">
            <HeaderTwo />
            <div className="moderation-container">
              <div className="moderation-dashboard">
              </div>
              <div className="navbar">
                < NavigationBar />
              </div>
            </div>

          </div>
          )
}

export default Moderation;
