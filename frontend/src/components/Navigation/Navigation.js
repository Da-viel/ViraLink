import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import NewArticle from "../NewArticle/NewArticle";

import "./Navigation.css";

const Navigation = ({ articles, setArticles }) => {
  const navigate = useNavigate();
  const [, setModal] = useModal();
  const handleHome = () => {
    setModal(null);
    return navigate("/articles");
  };

  return (
    <div className="container-fluid border shadow bg-body rounded fixed-bottom p-lg-5 bg-white ">
      <div className="row justify-content-between mw-200 ">
        <div className="col-2 col-sm-2 col-md-2 col-lg-12 p-2">
          <div className="navigationHome">
            <button
              onClick={handleHome}
              className="btn btn-primary rounded-circle"
            >
              🏠
            </button>
            <p className="homebutton mx-4">HOME</p>
          </div>
        </div>
        <div className="col-2 col-sm-2 col-md-2 col-lg-12 p-2">
          <div className="navigationSearch">
            <button
              onClick={() => {
                navigate("/article/search");
              }}
              className="btn btn-primary rounded-circle"
            >
              🔎
            </button>
            <p className="searchbutton mx-3">SEARCH</p>
          </div>
        </div>
        <div className="col-2 col-sm-2 col-md-2 col-lg-12 p-2">
          <div className="navigationNew">
            <button
              onClick={() => {
                navigate("/modalpage");
                setModal(
                  <NewArticle articles={articles} setArticles={setArticles} />
                );
              }}
              className="btn btn-primary rounded-circle"
            >
              <h3>+</h3>
            </button>
            <p className="addbutton mx-3">NEW ARTICLE</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navigation;
