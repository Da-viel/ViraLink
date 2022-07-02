import { useEffect, useState } from 'react';
import { useToken } from '../../context/TokenContext';
import Navigation from '../Navigation/Navigation';

import './SingleArticle.css';

const SingleArticle = ({ idArticle }) => {
  const [token] = useToken();
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState(null);
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState(null);

  const getArticleById = async () => {
    setLoading(true);

    // Vaciamos el error.
    setError(null);

    // Si hay token nos interesa mandarlo para comprobar los articles de los que somos dueños.

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND}/article/${idArticle}/single`,
        {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        }
      );

      const body = await res.json();

      if (body.status === 'error') setError(body.message);

      setArticle(body.data.article);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Mediante "useEffect" hacemos que la primera vez que se monta el componente se
  // cargue de forma automática la lista de articles.
  useEffect(() => {
    getArticleById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  return (
    <>
      <main className='ArticleById'>
        <Navigation />
        {error && <p className='Error'>{error}</p>}

        {article && (
          <ul className='articleList'>
            {article.map((article) => {
              const dateTime = new Date(article.createdAt).toLocaleString();

              return (
                <li key={article.id} data-id={article.id}>
                  <header>
                    <p>{article.Title}</p>
                    {
                      <time dateTime={dateTime}>
                        {new Date(article.createdAt).toLocaleString()}
                      </time>
                    }
                  </header>
                  <div>
                    <p>{article.alias}</p>
                    <img
                      src={`${process.env.REACT_APP_BACKEND}/${article.image}`}
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

export default SingleArticle;
