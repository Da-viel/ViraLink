import { useState, useEffect } from "react";
import { useToken } from "../../context/TokenContext";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import { ErrorOrSucces } from "../ErrorOrSucces/ErrorOrSucces";

import "./EditUser.css";

const EditUser = () => {
  const navigate = useNavigate();
  const [token] = useToken();
  const [modal, setModal] = useModal();
  const [alias, setAlias] = useState("");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rPass, setRpass] = useState("");
  const [biography, setBiography] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

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

      if (password !== rPass) {
        return setError("Passwords don't match");
      }
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
        headers: {
          Authorization: token,
        },
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

  const handleBack = (e) => {
    e.preventDefault();
    setModal(null);
    navigate("/articles");
  };

  useEffect(() => {
    const successP = document.querySelector("p.Success");

    if (successP) {
      const t = setTimeout(() => {
        document.querySelector("p.Success").remove();
        navigate("/articles");
      }, 1500);

      setModal(null);
      return () => clearTimeout(t);
    }
  });

  return (
    <div className="center">
      <div className="container">
        <div className="row">
          <div
            className="
             border shadow p-3 mb-5 bg-body rounded"
          >
            <h1>Edit User</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="alias">Alias</label>
                <input
                  type="text"
                  name="alias"
                  className="form-control"
                  value={alias || ""}
                  placeholder="Enter your alias"
                  maxLength="20"
                  onChange={(e) => setAlias(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={name || ""}
                  placeholder="Enter your name"
                  maxLength="40"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  value={firstName || ""}
                  placeholder="Enter your first name"
                  maxLength="50"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  value={lastName || ""}
                  placeholder="Enter your last name"
                  maxLength="50"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={email || ""}
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="pass"
                  className="form-control"
                  value={password || ""}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="rPass" className="form-label">
                  Repeat Password
                </label>
                <input
                  type="password"
                  name="rPass"
                  className="form-control"
                  value={rPass || ""}
                  placeholder="Re-enter your password"
                  onChange={(e) => setRpass(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="biography">Biography</label>
                <textarea
                  rows="4"
                  cols="50"
                  maxLength="210"
                  type="text"
                  name="biography"
                  className="form-control"
                  value={biography || ""}
                  onChange={(e) => setBiography(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => {
                    setSelectedFile(e.target.files[0]);
                  }}
                />
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="mb-3">
                    <button
                      onClick={handleBack}
                      className="btn btn-danger col-12"
                    >
                      Back
                    </button>
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <button
                      className="btn btn-primary col-12"
                      disabled={loading}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <ErrorOrSucces error={error} message={message} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
