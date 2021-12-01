import homeImg from '../../assets/home_img.png';
import HeaderOne from '../../components/HeaderOne';
import Footer from '../../components/Footer';
import '../../Home.css';


function Home() {
  return (
    <div className="home">
      < HeaderOne />
      <div className="home-container">
        <div className="home-container-text">
          <h1>BIENVENUE SUR GROUPBOOK</h1>
          <h3>Le réseau social qui rapproche les collaborateurs de Groupomania</h3>
        </div>
        <img src={ homeImg } className="home-container-image" alt="image d'accueil" />
      </div>
      < Footer />
    </div>
  );
}

export default Home;
