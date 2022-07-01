import { useState } from "react";
import { useToken } from "../../context/TokenContext";

import "./Profile.css";
const Profile = () => {
  const [token] = useToken();
  const [alias, setAlias] = useState(null);
  const [image, setImage] = useState(null);
  const userData = async () => {
    try {
      const res = await fetch("http://localhost:4000/users", {
        headers: {
          Authorization: token,
        },
      });

      const body = await res.json();

      if (body.status === "ok") {
        setAlias(body.data.user.alias);
        setImage(body.data.user.image);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (token) userData();
  return (
    <div className="avatar">
      <p>{alias}</p>
      <img
        src={`${process.env.REACT_APP_BACKEND}/${image}`}
        alt={`Avatar de ${alias}`}
      />
    </div>
  );
};

export default Profile;
