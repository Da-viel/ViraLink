import { Link } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import NewArticle from "../NewArticle/NewArticle";
import "./Navigation.css";
const Navigation = () => {
  const [, setModal] = useModal();
  const handleHome = (e) => {
    e.preventDefault();
    <Link to="/articles"></Link>;
  };
  return (
    <div className="navigation">
      <div className="home">
        <button onClick={handleHome}>🏠</button>
      </div>
      <div className="search">
        {" "}
        <button>🔎</button>
      </div>
      <div className="newArticle">
        <button onClick={() => setModal(<NewArticle />)}>
          <p>+</p>
        </button>
      </div>
    </div>
  );
};
export default Navigation;
