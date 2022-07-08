import { Link } from 'react-router-dom';
import { useToken } from '../../context/TokenContext';
import { useUser } from '../../context/UserContext';
import DeleteArticle from '../DeleteArticle/DeleteArticle';

import './ArticlesSearch.css';

const ArticlesSearch = ({ articles }) => {
  const [token] = useToken();
  const [user] = useUser();

  return (
    <>
      {articles ? (
        <main className='ArticlesSearch'>
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
                        <div className='col-8 border'>
                          <a href={`https://${article.url}`} target='blank'>
                            {article.url}
                          </a>
                        </div>
                        <div className='col-2 border'>
                          {article.Rating_articles && (
                            <div className='rating'>
                              <p>Avg. rating: {article.Rating_articles}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </main>
      ) : null}
    </>
  );
};

export default ArticlesSearch;
