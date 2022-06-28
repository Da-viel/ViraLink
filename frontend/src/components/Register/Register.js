import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useToken } from "../../TokenContext";

import "./Register.css";

const Register = () => {
  const [token] = useToken();
  const [alias, setAlias] = useState("");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [biography, setBiography] = useState("");
  const [picture, setPicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          alias,
          name,
          firstName,
          lastName,
          email,
          password,
          biography,
          picture,
        }),
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
      //return <Navigate replace to="/login" />;
    }
  };

  useEffect(() => {
    const successP = document.querySelector("p.Success");

    if (successP) {
      const t = setTimeout(() => {
        document.querySelector("p.Success").remove();
      }, 5000);

      return () => clearTimeout(t);
    }
  });

  return (
    <main className="Register">
      <form onSubmit={handleSubmit}>
        <label htmlFor="alias">Alias:</label>
        <input
          type="text"
          name="alias"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
        />

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="firstName">First name:</label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="lastName">Last name:</label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="pass">Contraseña:</label>
        <input
          type="password"
          name="pass"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="biography">Biography:</label>
        <textarea
          type="text"
          name="biography"
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
        />

        <label htmlFor="picture">Avatar:</label>
        <input
          type="file"
          name="picture"
          value={picture}
          onChange={(e) => setPicture(e.target.value)}
        />

        <button disabled={loading}>Sign Up</button>
      </form>
      {error && <p className="Error">{error}</p>}
      {message && <p className="Success">{message}</p>}
    </main>
  );
};

export default Register;
