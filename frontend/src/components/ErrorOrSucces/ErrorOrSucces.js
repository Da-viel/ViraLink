import "./ErrorOrSucces.css";

export const ErrorOrSucces = ({ error, message }) => {
  return (
    <>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
    </>
  );
};
