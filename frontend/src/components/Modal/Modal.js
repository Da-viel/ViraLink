import { useModal } from '../../context/ModalContext';
import './Modal.css';

const Modal = ({ children }) => {
  const [, setModal] = useModal();

  return (
    <div className='modalBG' onClick={() => setModal(null)}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default Modal;
