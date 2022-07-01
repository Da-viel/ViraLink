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
        <button onClick={handleHome}>:house:</button>
      </div>
      <div className="search">
        {" "}
        <button>:mag_right:</button>
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
