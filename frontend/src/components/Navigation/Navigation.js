import { Link } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import NewArticle from '../NewArticle/NewArticle';
import './Navigation.css';
const Navigation = () => {
  const [, setModal] = useModal();
  const handleHome = (e) => {
    e.preventDefault();
    <Link to='/articles'></Link>;
  };
  return (
    <div className='container-fluid bg-white fixed-bottom'>
      <div className='row justify-content-around mw-100 '>
        <div className='col-2 p-2'>
          <div className='navigation'>
            <button
              onClick={handleHome}
              className='btn btn-primary rounded-circle'
            >
              🏠
            </button>
          </div>
        </div>
        <div className='col-2 p-2'>
          <div className='navigation'>
            <button className='btn btn-primary rounded-circle'>🔎</button>
          </div>
        </div>
        <div className='col-2 p-2'>
          <div className='navigation'>
            <button
              onClick={() => setModal(<NewArticle />)}
              className='btn btn-primary rounded-circle'
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navigation;
