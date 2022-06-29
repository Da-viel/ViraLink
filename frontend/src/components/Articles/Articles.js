import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useToken } from '../../TokenContext';
import Navigation from '../Navigation/Navigation';

import './Articles.css';
const Articles = () => {
  const [token] = useToken();
  const [loading, setLoading] = useState(false);
  const [articles, setarticles] = useState(null);
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState(null);

  const getArticles = async () => {
    setLoading(true);

    // Vaciamos el error.
    setError(null);

    // Si hay token nos interesa mandarlo para comprobar los articles de los que somos dueños.

    try {
      const res = await fetch('http://localhost:4000/article', {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });

      const body = await res.json();
      console.log(body.data);
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
        <Navigation />
        {error && <p className='Error'>{error}</p>}

        {articles && (
          <ul className='articleList'>
            {articles.map((article) => {
              const dateTime = format(
                new Date(article.createdAt),
                'yyyy-MM-dd'
              );

              return (
                <li key={article.id} data-id={article.id}>
                  <header>
                    <p>{article.Title}</p>
                    {
                      <time dateTime={dateTime}>
                        {format(
                          new Date(article.createdAt),
                          'hh:mm - dd/MM/yyyy'
                        )}
                      </time>
                    }
                  </header>
                  <div>
                    <p>{article.alias}</p>
                    <img
                      src={`http://localhost:4000/${article.image}`}
                      alt={`Avatar de ${article.alias}`}
                    />
                  </div>
                  <div>
                    <p>{article.Description}</p>
                    <a href={`https://${article.url}`} target='blank'>
                      {article.url}
                    </a>
                  </div>
                  {article.Rating_articles && <p>{article.Rating_articles}</p>}
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
