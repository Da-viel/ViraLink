import useFetch from "../../hooks/useFetch";

import "./Profile.css";
const Profile = () => {
  const { data, status } = useFetch();
  return <div className="avatar"></div>;
};

export default Profile;
