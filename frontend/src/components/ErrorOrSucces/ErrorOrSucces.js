import './ErrorOrSucces.css';

export const ErrorOrSucces = ({ error, message }) => {
  return (
    <>
      {error && <p className='Error'>{error}</p>}
      {message && <p className='Success'>{message}</p>}
    </>
  );
};
