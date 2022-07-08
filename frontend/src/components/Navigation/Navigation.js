import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import NewArticle from '../NewArticle/NewArticle';

import './Navigation.css';

const Navigation = ({ articles, setArticles }) => {
  const navigate = useNavigate();
  const [, setModal] = useModal();
  const handleHome = () => {
    setModal(null);
    return navigate('/articles');
  };

  return (
    <div className='container-fluid border shadow bg-body rounded fixed-bottom p-lg-5 bg-white '>
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
              onClick={() => {
                navigate('/article/search');
              }}
              className='btn btn-primary rounded-circle'
            >
              🔎
            </button>
          </div>
        </div>
        <div className='col-2 col-sm-2 col-md-2 col-lg-12 p-2'>
          <div className='navigationNew'>
            <button
              onClick={() => {
                navigate('/modalpage');
                setModal(
                  <NewArticle articles={articles} setArticles={setArticles} />
                );
              }}
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
