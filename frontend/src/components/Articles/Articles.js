import { useEffect, useState } from 'react';
import { useToken } from '../../context/TokenContext';
import RatingArticles from '../RatingArticles/RatingArticles';
import { useNavigate, Link } from 'react-router-dom';
import { ErrorOrSucces } from '../ErrorOrSucces/ErrorOrSucces';

import './Articles.css';

const Articles = ({ articles, setArticles }) => {
  const [token, setToken] = useToken();
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState(null);

  // Mediante "useEffect" hacemos que la primera vez que se monta el componente se
  // cargue de forma automática la lista de articles.
  useEffect(() => {
    const fetchData = async () => {
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
        setArticles(body.data.articles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);
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
                  <div className='container shadow p-3 pt-2 mb-5 bg-body rounded'>
                    <div className='row mb-1 border-bottom'>
                      <div className='col-6 d-flex justify-content-center align-items-center'>
                        <Link
                          className='tosinglepost'
                          to={`/article/${article.id}`}
                        >
                          <h4>{article.Title}</h4>
                        </Link>
                      </div>
                      <div className='col-6 mb-1 d-flex justify-content-center align-items-center'>
                        {
                          <time dateTime={dateTime}>
                            {new Date(article.createdAt).toLocaleString(
                              'es-ES'
                            )}
                          </time>
                        }
                      </div>
                    </div>
                    <div className='row pb-1 '>
                      <div className='col-4 '>
                        <img
                          className='avatarimg  mt-2'
                          src={`${process.env.REACT_APP_BACKEND}/${article.image}`}
                          alt={`Avatar de ${article.alias}`}
                        />
                        <p className='username'>{article.alias}</p>
                      </div>
                      <div className='auxiliar col-8 rounded d-flex justify-content-center align-items-center '>
                        <p>{article.Description}</p>
                      </div>
                    </div>
                    <div className='row '>
                      <div className='auxurl col-8 bg-info mb-2 mt-1 rounded d-flex justify-content-center align-items-center '>
                        <a
                          className='rounded'
                          href={`${article.url}`}
                          target='blank'
                        >
                          {article.url}
                        </a>
                      </div>
                      <div className='col-4'>
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
