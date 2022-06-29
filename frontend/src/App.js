import { Routes, Route } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Articles from './components/Articles/Articles';
import Header from './components/Header/Header';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/users' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/articles' element={<Articles />} />
        <Route path='*' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
