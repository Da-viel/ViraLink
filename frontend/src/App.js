import { Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import Header from './components/Header/Header';
import Modal from './components/Modal/Modal';
import { useModal } from './context/ModalContext';
import './App.css';
import { Prueba } from './components/Prueba/Prueba';

function App() {
  const [modal] = useModal();
  return (
    <div className='App'>
      <Header />
      {modal && <Modal>{modal}</Modal>}
      <Routes>
        <Route path='/users' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/article/:idArticle' element={<ArticlePage />} />
        <Route path='/articles' element={<HomePage />} />
        <Route path='*' element={<LoginPage />} />
      </Routes>
      {/* <Prueba /> */}
    </div>
  );
}

export default App;
