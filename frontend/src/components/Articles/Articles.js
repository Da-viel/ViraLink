import { useEffect, useState } from 'react';
import { useToken } from '../../context/TokenContext';
import RatingArticles from '../RatingArticles/RatingArticles';
import { useNavigate, Link } from 'react-router-dom';
import { ErrorOrSucces } from '../ErrorOrSucces/ErrorOrSucces';

import './Articles.css';

const Articles = () => {
  let navigate = useNavigate();
  const [token, setToken] = useToken();
  const [loading, setLoading] = useState(false);
  const [articles, setarticles] = useState(null);
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState(null);
  const getArticles = async () => {
    setLoading(true);
    // Vaciamos el error.
    setError(null);
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/article`, {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });
      const body = await res.json();
      if (body.status === 'error') setError(body.message);
      setarticles(body.data.articles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  // Mediante "useEffect" hacemos que la primera vez que se monta el componente se
  // cargue de forma automática la lista de articles.
  useEffect(() => {
    getArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);
  return (
    <>
      <main className='articleSearch'>
        <ErrorOrSucces error={error} />
        {articles && (
          <ul className='articleList'>
            {articles.map((article) => {
              const dateTime = new Date(article.createdAt).toLocaleString(
                'es-ES'
              );
              return (
                <li key={article.id} data-id={article.id}>
                  <div className='container border'>
                    <div className='row border'>
                      <div className='col-6 border'>
                        <Link
                          className='tosinglepost'
                          to={`/article/${article.id}`}
                        >
                          <h3>{article.Title}</h3>
                        </Link>
                      </div>
                      <div className='col-6 border'>
                        {
                          <time dateTime={dateTime}>
                            {new Date(article.createdAt).toLocaleString(
                              'es-ES'
                            )}
                          </time>
                        }
                      </div>
                    </div>
                    <div className='row border'>
                      <div className='col-3 border'>
                        <img
                          className='avatarimg'
                          src={`${process.env.REACT_APP_BACKEND}/${article.image}`}
                          alt={`Avatar de ${article.alias}`}
                        />
                        <p className='username'>{article.alias}</p>
                      </div>
                      <div className='col-9 border'>
                        <p>{article.Description}</p>
                      </div>
                    </div>
                    <div className='row border'>
                      <div className='col-8 border ' align='center'>
                        <a href={`${article.url}`} target='blank'>
                          {article.url}
                        </a>
                      </div>
                      <div className='col-4 border'>
                        {article.Rating_articles && (
                          <div className='rating'>
                            <p>Avg. rating: {article.Rating_articles}</p>
                          </div>
                        )}
                        <RatingArticles idArticle={article.id} />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </>
  );
};
export default Articles;
