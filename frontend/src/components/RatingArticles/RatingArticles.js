import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../../context/TokenContext';

import './RatingArticles.css';

const RatingArticles = ({ idArticle }) => {
  let navigate = useNavigate();
  const [token] = useToken();
  const [rating, setRating] = useState(null);
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
          id='rating'
          onChange={(e) => setRating(e.target.value)}
        >
          <option value='DEFAULT' disabled>
            Your rating
          </option>
          <option value='1'>1 - The lowest rating</option>
          <option value='2'>2 - Low rating </option>
          <option value='3'>3 - Indifferent</option>
          <option value='4'>4 - High rating</option>
          <option value='5'>5 - The highest rating</option>
        </select>
        <button disabled={loading}>Submit</button>
      </form>
      {error && <p className='Error'>{error}</p>}
      {message && <p className='Success'>{message}</p>}
    </div>
  );
};

export default RatingArticles;
