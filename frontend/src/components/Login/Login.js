import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useToken } from '../../context/TokenContext';

import './Login.css';

const Login = () => {
  const [token, setToken] = useToken();
  let navigate = useNavigate();
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
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/login`, {
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
        return navigate('/articles');
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='center'>
      <div className='container'>
        <div className='row'>
          <div
            className='col-10 offset-1 col-sm-6 offset-sm-0 offset-sm-3
           col-lg-4 offset-lg-0 offset-lg-4 col-xl-4 offset-xl-0 offset-xl-4
             border shadow p-3 mb-5 bg-body rounded'
          >
            <h1>Log In</h1>
            <form>
              <div className='mb-3'>
                <label htmlFor='email' className='form-label'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  className='form-control'
                  placeholder='Enter your email'
                  value={email || ''}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='password' className='form-label'>
                  Password
                </label>
                <input
                  type='password'
                  name='pass'
                  className='form-control'
                  value={password || ''}
                  placeholder='Enter your password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <p>
                  Not registered yet? -
                  <NavLink to='/users' className='loginLink'>
                    click here
                  </NavLink>
                </p>
              </div>

              <div disabled={loading} className='d-grid gap-2 col-6 mx-auto'>
                <button
                  type='submit'
                  onClick={handleSubmit}
                  className='btn btn-primary'
                >
                  Log In
                </button>
              </div>
              {error ? <p className='error'>{error}</p> : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
