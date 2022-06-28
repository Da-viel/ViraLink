import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useToken } from '../../TokenContext';

import './Login.css';

const Login = () => {
  const [token, setToken] = useToken();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Si estamos logueados redireccionamos a la página principal.
  // if (token) return <Navigate to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const body = await res.json();

      if (body.status === 'error') {
        setError(body.message);
      } else {
        setToken(body.data.token);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='form'>
      <div className='form-panel one'>
        <div className='form-header'>
          <h1>Account Login</h1>
        </div>
        <div className='form-content'>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='username'>Email</label>
              <input
                type='email'
                name='email'
                value={email || ''}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='pass'
                value={password || ''}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className='form-group'>
                <p className='form-singup'>
                  Not registered yet? -
                  <NavLink to='/users' className='loginLink'>
                    click here
                  </NavLink>
                </p>
              </div>
            </div>
            <div disabled={loading} className='form-group'>
              <button type='submit'>Log In</button>
            </div>
          </form>
        </div>
        {error && <p className='Error'>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
