import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import ArticlesSearch from '../ArticlesSearch/ArticlesSearch';

import NewArticle from '../NewArticle/NewArticle';
import './Navigation.css';

const Navigation = () => {
  let navigate = useNavigate();
  const [, setModal] = useModal();
  const handleHome = () => {
    setModal(null);
    return navigate('/articles');
  };

  return (
    <div className='container-fluid   border shadow bg-body rounded fixed-bottom p-lg-5 bg-white '>
      <div className='row justify-content-around mw-100 '>
        <div className='col-2 col-sm-2 col-md-2 col-lg-12 p-2'>
          <div className='navigationHome'>
            <button
              onClick={handleHome}
              className='btn btn-primary rounded-circle'
            >
              🏠
            </button>
          </div>
        </div>
        <div className='col-2 col-sm-2 col-md-2 col-lg-12 p-2'>
          <div className='navigationSearch'>
            <button
              onClick={() => setModal(<ArticlesSearch />)}
              className='btn btn-primary rounded-circle'
            >
              🔎
            </button>
          </div>
        </div>
        <div className='col-2 col-sm-2 col-md-2 col-lg-12 p-2'>
          <div className='navigationNew'>
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
