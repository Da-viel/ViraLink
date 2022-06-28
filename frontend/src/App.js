import { Routes, Route } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

import './App.css';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/users' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
