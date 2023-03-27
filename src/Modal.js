
const Modal = ({ handleClose, details, revdetails }) => {
  
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

          <table class="table">
            <thead>
              <tr>
                <th className= "first">username</th>
                <th className= "first">rating</th>
                <th className= "first">content</th>
                <th className= "first">daten</th>
              </tr>
            </thead>
            </table>

          {revdetails.length > 0 && (
          revdetails.map(rev => {
            return(
              <table class="table">
                <tbody>
                  <tr>
                    <td className= "first">{rev.username}</td>
                    <td className= "first">{rev.rating}</td>
                    <td className= "first">{rev.content}</td>
                    <td className= "first">{rev.date}</td>
                  </tr>
                </tbody>
              </table>
            )
          }))}
          <div>
          <label>
              Name:
              <input type="text" name="email" />
              password
              <input type="text" name="password" />
              content
              <input type="text" name="content" />
              rating
              <input type="text" name="rating" />

{/*               entity_id": "string", */}
          </label>
          <button onClick={handleClose}>send</button>
          </div>
  
          <button onClick={handleClose}>close</button>
        </div>
      </section>
    </div>
  );
};



export default Modal;
