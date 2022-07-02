import Navigation from '../Navigation/Navigation';

export const Prueba = () => {
  return (
    <div className='container border'>
      <div className='row border'>
        <div className='col-6 border'>6</div>
        <div className='col-6 border'>6</div>
      </div>
      <div className='row border'>
        <div className='col-2 border'>3</div>
        <div className='col-9 border'>10</div>
      </div>
      <div className='row border'>
        <div className='col-4 border'>4</div>
        <div className='col-4 border'>4</div>
        <div className='col-4 border'>4</div>
      </div>

      <div class='d-flex flex-column justify-content-between'>
        <div></div>
        <div>bottom content</div>
      </div>

      <Navigation />
    </div>
  );
};
