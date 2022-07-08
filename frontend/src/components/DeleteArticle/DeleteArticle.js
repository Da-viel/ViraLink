import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../../context/TokenContext';

import './DeleteArticle.css';

const DeleteArticle = (idArticle) => {
  let navigate = useNavigate();
  const [token] = useToken();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [update, setUpdate] = useState(false);

  const handleDeleteArticle = async ({ idArticle }) => {
    setLoading(true);
    setError(null);

    if (window.confirm('¿Do you wat to delete this article?')) {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND}/article/${idArticle}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: token,
            },
          }
        );

        const body = await res.json();

        if (body.status === 'error') {
          setError(body.message);
        } else {
          setUpdate(!update);
          setMessage(body.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const successP = document.querySelector('p.Success');

    if (successP) {
      const t = setTimeout(() => {
        document.querySelector('p.Success').remove();
        navigate('/articles');
      }, 1500);

      return () => clearTimeout(t);
    }
  });

  return (
    <div className='container'>
      {token && (
        <button
          className='col-12 btn btn-danger'
          onClick={() => handleDeleteArticle(idArticle)}
        >
          Borrar
        </button>
      )}
      {error && <p className='Error'>{error}</p>}
      {message && <p className='Success'>{message}</p>}
    </div>
  );
};

export default DeleteArticle;
