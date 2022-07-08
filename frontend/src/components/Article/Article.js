import { useToken } from "../../context/TokenContext";
import { Link } from "react-router-dom";

import "./Article.css";

const Article = ({ key, article }) => {
  const [token] = useToken();
  const dateTime = new Date(article.createdAt).toLocaleString("es-ES");
  return (
    <li key={article.id} data-id={article.id}>
      <div className="container shadow p-3 pt-2 mb-5 bg-body rounded">
        <div className="row mb-1 border-bottom">
          <div className="col-6 d-flex justify-content-center align-items-center">
            {token && (
              <Link className="tosinglepost" to={`/article/${article.id}`}>
                <h4>{article.Title}</h4>
              </Link>
            )}
          </div>
          <div className="col-6 mb-1 d-flex justify-content-center align-items-center">
            {
              <time dateTime={dateTime}>
                {new Date(article.createdAt).toLocaleString("es-ES")}
              </time>
            }
          </div>
        </div>
        <div className="row pb-1 ">
          <div className="col-4 ">
            <img
              className="avatarimg  mt-2"
              src={`${process.env.REACT_APP_BACKEND}/${article.image}`}
              alt={`Avatar de ${article.alias}`}
            />
            <p className="username">{article.alias}</p>
          </div>
          <div className="auxiliar col-8 rounded d-flex justify-content-center align-items-center ">
            <p>{article.Description}</p>
          </div>
        </div>
        <div className="row ">
          <div className="auxurl col-8 bg-info mb-2 mt-1 rounded d-flex justify-content-center align-items-center ">
            <a className="rounded" href={`${article.url}`} target="blank">
              {article.url}
            </a>
          </div>
          <div className="col-4">
            {article.Rating_articles && (
              <div className="rating">
                <p>Avg. rating: {article.Rating_articles}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Article;
