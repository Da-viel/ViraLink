import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useToken } from "../../context/TokenContext";

import "./EditUser.css";

const EditUser = () => {
  let navigate = useNavigate();
  const [token] = useToken();
  const [alias, setAlias] = useState("");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [biography, setBiography] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      // Si queremos enviar un body con formato "form/data" es necesario
      // crear un objeto de tipo FormData y "pushear" los elementos que queramos
      // enviar.
      const formData = new FormData();

      // Pusheamos las propiedades con append.
      formData.append("alias", alias);
      formData.append("name", name);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("biography", biography);
      formData.append("image", selectedFile);

      const res = await fetch(`${process.env.REACT_APP_BACKEND}/users`, {
        method: "PUT",
        body: formData,
      });

      const body = await res.json();

      if (body.status === "error") {
        setError(body.message);
      } else {
        setMessage(body.message);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const successP = document.querySelector("p.Success");

    if (successP) {
      const t = setTimeout(() => {
        document.querySelector("p.Success").remove();
        return navigate("/articles");
      }, 3000);

      return () => clearTimeout(t);
    }
  });

  return (
    <main className="EditUSer">
      <form onSubmit={handleSubmit}>
        <label htmlFor="alias">Alias:</label>
        <input
          type="text"
          name="alias"
          value={alias || ""}
          onChange={(e) => setAlias(e.target.value)}
        />

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="firstName">First name:</label>
        <input
          type="text"
          name="firstName"
          value={firstName || ""}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="lastName">Last name:</label>
        <input
          type="text"
          name="lastName"
          value={lastName || ""}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="pass">Contraseña:</label>
        <input
          type="password"
          name="pass"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="biography">Biography:</label>
        <textarea
          type="text"
          name="biography"
          value={biography || ""}
          onChange={(e) => setBiography(e.target.value)}
        />

        <label htmlFor="image">Avatar:</label>
        <input
          type="file"
          onChange={(e) => {
            setSelectedFile(e.target.files[0]);
          }}
        />
        <button disabled={loading}>Submit</button>
      </form>

      <button
        className="home"
        onClick={() => <Link to="/articles"> 🏠</Link>}
      ></button>

      {error && <p className="Error">{error}</p>}
      {message && <p className="Success">{message}</p>}
    </main>
  );
};

export default EditUser;
