import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../../context/TokenContext';
import { ErrorOrSucces } from '../ErrorOrSucces/ErrorOrSucces';

import './RatingArticles.css';

const RatingArticles = ({ idArticle }) => {
  let navigate = useNavigate();
  const [token] = useToken();
  const [rating, setRating] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND}/article/${idArticle}/rating`,
        {
          method: 'POST',
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({ rating: parseInt(rating) }),
        }
      );

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

  useEffect(() => {
    const successP = document.querySelector('p.Success');

    if (successP) {
      const t = setTimeout(() => {
        document.querySelector('p.Success').remove();
        return navigate('/articles');
      }, 3000);

      return () => clearTimeout(t);
    }
  });

  return (
    <div className='RatingForm'>
      <form onSubmit={handleSubmit}>
        <select
          value='DEFAULT'
          name='DEFAULT'
          className='form-select'
          onChange={(e) => setRating(e.target.value)}
        >
          <option value='DEFAULT'>Your rating</option>
          <option value='5'>5 - The highest rating</option>
          <option value='4'>4 - High rating</option>
          <option value='3'>3 - Indifferent</option>
          <option value='2'>2 - Low rating </option>
          <option value='1'>1 - The lowest rating</option>
        </select>
        <button className='btn btn-primary' disabled={loading}>
          Submit
        </button>
      </form>
      <ErrorOrSucces error={error} message={message} />
    </div>
  );
};

export default RatingArticles;
