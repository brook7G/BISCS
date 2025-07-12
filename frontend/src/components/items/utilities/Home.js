import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate('/');
  };
  return (
    <div
      className="logoutContainer"
      onClick={() => {
        handleHome();
      }}
    >
      <FaHome color="lightgreen" />
    </div>
  );
};

export default Home;
