import './Header.css';
import Accordion from '../Accordion/Accordion';
import EditUser from '../EditUser/EditUser';
import { useModal } from '../../context/ModalContext';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../../context/TokenContext';
const Header = () => {
  let navigate = useNavigate();
  const [token, setToken] = useToken();
  const [, setModal] = useModal();
  return (
    <div className='allHeader'>
      <div className='logoHeader'>
        <img src='/logo732.png ' alt='logo ViraLink' />
      </div>
      {token ? (
        <div className='avatarHeader'>
          <Accordion>
            <button
              className='btn btn-primary'
              onClick={() => {
                localStorage.removeItem('token');
                setToken(null);
                return navigate('/login');
              }}
            >
              Log Out
            </button>
            <button
              className='btn btn-primary'
              onClick={() => setModal(<EditUser />)}
            >
              Edit Profile
            </button>
          </Accordion>
        </div>
      ) : null}
    </div>
  );
};
export default Header;
