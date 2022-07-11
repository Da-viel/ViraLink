import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../../context/MessageContext';
import { Toaster } from 'react-hot-toast';
import { useToast } from '../../hooks/useToast';
import { ErrorOrSucces } from '../ErrorOrSucces/ErrorOrSucces';

import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [, setMessage] = useMessage();

  const [alias, setAlias] = useState('');
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rPass, setRpass] = useState('');
  const [biography, setBiography] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [error, setError] = useState(null);

  //useToast();

  // Si estamos logueados redireccionamos a la página principal.
  //Pero esta línea va a dar error, porque el useEffect entraría dentro
  // de un código condicional.
  //if (token) return <Navigate to="/articles" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      if (password !== rPass) {
        return setError("Passwords don't match");
      }
      // Si queremos enviar un body con formato "form/data" es necesario
      // crear un objeto de tipo FormData y "pushear" los elementos que queramos
      // enviar.
      const formData = new FormData();

      // Pusheamos las propiedades con append.
      formData.append('alias', alias);
      formData.append('name', name);
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('biography', biography);
      formData.append('image', selectedFile);

      const res = await fetch(`${process.env.REACT_APP_BACKEND}/users`, {
        method: 'POST',
        body: formData,
      });

      const body = await res.json();

      setMessage({ status: body.status, text: body.message });

      if (body.status === 'ok') {
        navigate('/login');
      } else {
        //setAlert(body.message);
      }
    } catch (err) {
      console.error(err);
      //setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  /*
  useEffect(() => {
    const successP = document.querySelector("p.Success");

    if (successP) {
      const t = setTimeout(() => {
        document.querySelector("p.Success").remove();
        navigate("/login");
      }, 3000);

      return () => clearTimeout(t);
    }
  });*/

  return (
    <div className='container welcome mt-0'>
      <div className=''>
        <img src='/logo732.png ' alt='logo ViraLink' />
      </div>
      <div className='row'>
        <div
          className='col-10 offset-1 col-sm-6 offset-sm-0 offset-sm-3
           col-lg-4 offset-lg-0 offset-lg-4 col-xl-4 offset-xl-0 offset-xl-4
             border shadow p-3 mb-5 bg-body rounded'
        >
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='alias'>Alias</label>
              <input
                type='text'
                name='alias'
                className='form-control'
                value={alias || ''}
                placeholder='Enter your alias'
                required
                maxLength='20'
                onChange={(e) => setAlias(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                name='name'
                className='form-control'
                value={name || ''}
                placeholder='Enter your name'
                required
                maxLength='40'
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='firstName'>First name</label>
              <input
                type='text'
                name='firstName'
                className='form-control'
                value={firstName || ''}
                placeholder='Enter your first name'
                required
                maxLength='50'
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='lastName'>Last name</label>
              <input
                type='text'
                name='lastName'
                className='form-control'
                value={lastName || ''}
                placeholder='Enter your last name'
                required
                maxLength='50'
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input
                type='email'
                name='email'
                className='form-control'
                value={email || ''}
                placeholder='Enter your email'
                required
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
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='rPass' className='form-label'>
                Repeat Password
              </label>
              <input
                type='password'
                name='rPass'
                className='form-control'
                value={rPass || ''}
                placeholder='Re-enter your password'
                required
                onChange={(e) => setRpass(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='biography'>Biography</label>
              <textarea
                rows='4'
                cols='50'
                maxLength='210'
                type='text'
                name='biography'
                className='form-control'
                value={biography || ''}
                onChange={(e) => setBiography(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <input
                type='file'
                className='form-control'
                onChange={(e) => {
                  setSelectedFile(e.target.files[0]);
                }}
              />
            </div>
            <div className='row'>
              <div className='col-6'>
                <div className='mb-3'>
                  <button
                    className='btn btn-danger col-12'
                    onClick={handleBack}
                  >
                    Back
                  </button>
                </div>
              </div>
              <div className='col-6'>
                <div className='mb-3'>
                  <button className='btn btn-primary col-12' disabled={loading}>
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </form>
          <Toaster
            containerStyle={{
              position: 'relative',
              width: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
          <ErrorOrSucces error={error} message={alert} />
        </div>
      </div>
    </div>
  );
};

export default Register;
