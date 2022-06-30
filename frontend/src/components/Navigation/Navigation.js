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
      <button className="home" onClick={handleHome}>
        🏠
      </button>
      <button className="search">🔎</button>
      <button className="newArticle" onClick={() => setModal(<NewArticle />)}>
        +
      </button>
    </div>
  );
};

export default Navigation;
