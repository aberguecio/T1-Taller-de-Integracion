import React, { useState,useEffect} from 'react';

const Modal = ({ handleClose, details, revdetails }) => {
  const [ratingdata, setRatingdata] = useState([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  async function Modalrev(){
    console.log(ratingdata)
    await fetch(`https://tarea-1.2023-1.tallerdeintegracion.cl/reviews`, {method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"entity_id":ratingdata[0],"email":ratingdata[1],"password":ratingdata[2],"content":ratingdata[3],"rating":rating})
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Modalrev:",data)
    });
  }

  useEffect(() => {
    console.log(ratingdata)
    Modalrev(ratingdata)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ratingdata]);

  function StarRating() {
    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? "on" : "off"}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="modal display-block">
      <section className="modal-main">
        <div className="App">
        <h1 className = "header">Informacion</h1>
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
            <h1 className = "header">Comentarios</h1>

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
          <div className="coments">
          <label>
              Mail Uc:
              <input type="text" name="email" />
              Numero Alumno
              <input type="text" name="password" />
              Comentario
              <input type="text" name="content" />
              <StarRating />
              <button onClick={() => setRatingdata([details?.id,
                document.getElementsByName('email')[0].value,
                document.getElementsByName('password')[0].value,
                document.getElementsByName('content')[0].value]
              )}>send</button>
          </label>
          </div>
  
          <button className = "btn" onClick={handleClose}>close</button>
        </div>
      </section>
    </div>
  );
};



export default Modal;
