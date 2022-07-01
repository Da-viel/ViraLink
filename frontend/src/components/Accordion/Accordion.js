import { useState } from "react";
import Profile from "../Profile/Profile";
import "./Accordion.css";

const Accordion = ({ children }) => {
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  return (
    <div className="Accordion">
      <button className="Avatar" onClick={handleClick}>
        <Profile />
      </button>
      {show && <div>{children}</div>}
    </div>
  );
};

export default Accordion;
