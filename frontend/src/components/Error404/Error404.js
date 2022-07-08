import { useNavigate } from 'react-router-dom';

export default function ErrorPage({ image, children }) {
  const navigate = useNavigate();

  return (
    <section className='err404 container-fluid '>
      <div className='row'>
        <div className='col-12 d-flex mt-4 justify-content-center align-items-center'>
          <img className='nf' src={`/image/${image}`} alt='Error page' />
        </div>
        <div className='col-12 d-flex mt-1 justify-content-center align-items-center'>
          <h3>{children}</h3>
        </div>
        <div className='col-12 d-flex justify-content-center align-items-center'>
          <button
            className='btn btn-primary'
            onClick={() => navigate('/articles')}
          >
            Back
          </button>
        </div>
      </div>
    </section>
  );
}
