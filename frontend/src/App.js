import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useToken } from './context/TokenContext';
import { useModal } from './context/ModalContext';
import Navigation from './components/Navigation/Navigation';
import Modal from './components/Modal/Modal';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import SearchArticlePage from './pages/SearchArticlePage';
import Header from './components/Header/Header';

import './App.css';
import ModalPage from './pages/ModalPage';

function App() {
  const [modal] = useModal();
  const [token] = useToken();
  const [articles, setArticles] = useState(null);

  return (
    <div className='App'>
      <Header />
      {modal && <Modal>{modal}</Modal>}
      <Routes>
        <Route path='/users' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/modalpage' element={<ModalPage />} />
        <Route path='/article/:idArticle' element={<ArticlePage />} />
        <Route path='/article/search' element={<SearchArticlePage />} />
        <Route
          path='/articles'
          element={<HomePage articles={articles} setArticles={setArticles} />}
        />
        {token ? (
          <Route
            path='*'
            element={<HomePage articles={articles} setArticles={setArticles} />}
          />
        ) : (
          <Route path='*' element={<LoginPage />} />
        )}
      </Routes>
      {!modal && token ? (
        <Navigation articles={articles} setArticles={setArticles} />
      ) : null}
    </div>
  );
}

export default App;
