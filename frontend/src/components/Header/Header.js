import { NavLink, useNavigate } from "react-router-dom";
import { useToken } from "../../context/TokenContext";
import { useModal } from "../../context/ModalContext";
import Accordion from "../Accordion/Accordion";
import EditUser from "../EditUser/EditUser";

import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [token, setToken] = useToken();
  const [, setModal] = useModal();

  return (
    <div className="allHeader">
      {token && (
        <div className="logoHeader">
          <NavLink to="/articles">
            <img src="/logo732.png " alt="logo ViraLink" />
          </NavLink>
        </div>
      )}
      {token ? (
        <div className="avatarHeader">
          <Accordion>
            <button
              className="btn btn-primary m-1"
              onClick={() => {
                localStorage.removeItem("token");
                setToken(null);
                navigate("/login");
              }}
            >
              Log Out
            </button>
            <button
              className="btn btn-primary m-1"
              onClick={() => {
                navigate("/article/search");
                setModal(<EditUser />);
              }}
            >
              Edit Profile
            </button>
          </Accordion>
        </div>
      ) : null}
    </div>
  );
};
export default Header;
