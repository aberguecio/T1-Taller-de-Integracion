const Modal = ({ handleClose, details }) => {

  return (
    <div className="modal display-block">
      <section className="modal-main">
        <div className="App">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">expiration</th>
                <th scope="col">price</th>
                <th scope="col">size</th>
                {details?.courses ? (<th scope="col">Courses</th>) : details?.ingredients ? (<th scope="col">Ingredients</th>):(<></>)}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{details?.id}</td>
                <td>{details?.name}</td>
                <td>{details?.description}</td>
                <td>{details?.expiration}</td>
                <td>{details?.price}</td>
                <td>{details?.size}</td>
                {details?.courses && details?.courses.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                  </tr>
                ))}
                {details?.ingredients && details?.ingredients.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                  </tr>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <button onClick={handleClose}>close</button>
      </section>
    </div>
  );
};

export default Modal;
