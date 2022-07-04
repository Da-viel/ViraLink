import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToken } from '../../context/TokenContext';
import { useModal } from '../../context/ModalContext';

import './NewArticle.css';

const NewArticle = () => {
  let navigate = useNavigate();
  const [token] = useToken();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [, setModal] = useModal();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/article`, {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, url }),
      });

      const body = await res.json();

      if (body.status === 'error') {
        setError(body.message);
      } else {
        setMessage(body.message);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleBack = (e) => {
    e.preventDefault();
    setModal(null);
  };
  useEffect(() => {
    const successP = document.querySelector('p.success');

    if (successP) {
      const t = setTimeout(() => {
        document.querySelector('p.success').remove();
        return setModal(null);
      }, 3000);

      return () => clearTimeout(t);
    }
  });

  return (
    <div className='container'>
      <div
        className='
                 border shadow p-3 mb-5 bg-body rounded'
      >
        <h1>New Article</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='title'>Title:</label>
            <input
              type='text'
              name='title'
              className='form-control'
              value={title || ''}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='description'>Description:</label>
            <textarea
              type='text'
              name='description'
              className='form-control'
              value={description || ''}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='url'>URL:</label>
            <input
              type='text'
              name='url'
              value={url || ''}
              className='form-control'
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div className='row'>
            <div className='col-6'>
              <div className='mb-3'>
                {
                  <button
                    onClick={handleBack}
                    className='btn btn-danger col-12'
                  >
                    Back
                  </button>
                }
              </div>
            </div>
            <div className='col-6'>
              <div className='mb-3'>
                {
                  <button
                    onClick={handleSubmit}
                    className='btn btn-primary col-12'
                  >
                    Submit
                  </button>
                }
              </div>
            </div>
          </div>
        </form>
        {error && <p className='error'>{error}</p>}
        {message && <p className='success'>{message}</p>}
      </div>
    </div>
  );
};

export default NewArticle;
