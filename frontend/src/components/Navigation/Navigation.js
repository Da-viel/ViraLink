import './Navigation.css';
import { useNavigate } from 'react-router-dom';
const Navigation = () => {
  let navigate = useNavigate();
  const handleHome = (e) => {
    e.preventDefault();
    return navigate('/articles');
  };
  return (
    <div className='navigation'>
      <button className='home' onClick={handleHome}>
        🏠
      </button>
      <button className='search'>🔎</button>
      <button className='newArticle'>+</button>
    </div>
  );
};

export default Navigation;
