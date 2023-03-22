import React, { useState, useEffect} from 'react';
import './App.css';
import Appnavbar from "./Navbar.js";

function App() {
  const [consult, setConsult] = useState("trays");
  const [trays, setTrays] = useState([]);
  const [returntrays, setReturntrays] = useState([]);
  const [page, setPage] = useState(1);

  async function Makecall(){
    await fetch(`https://tarea-1.2023-1.tallerdeintegracion.cl/${consult}?page=${page}`, {method: "GET"})
    .then((response) => response.json())
    .then((data) => {
      setReturntrays(data);
    });
  }

  useEffect(() => {
    Makecall()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[page]);

  useEffect(() => {
    setTrays([]);
    setPage(1)
    page === 1 && Makecall()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[consult]);

  useEffect(() => {Object.values(returntrays)[0] && setTrays(trays.concat(Object.values(returntrays)[0]));
    console.log(returntrays);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[returntrays]);

  function HandleClick(){
    setPage(page+1)
  }

  return (
    <div className="App">
      <Appnavbar seter = {setConsult}/>
      <header className="App-header">
        <h1 className = "Title">Le Puerquito</h1>
        <img src={require("./puerco.png")} className="App-logo" alt="logo" />
      </header>
      {trays.length > 0 && (
        <table className= "table">
          <tbody>
            <tr >
              <th id = "first">Image</th>
              <th>Nombre</th>
              <th>Precio</th>
            </tr>
          </tbody>
        </table>
      )}
      {trays.length > 0 && (
          trays.map(tray => {
            return(
              <table className= "table" key={tray.id}>
                <tbody>
                  <tr >
                    {tray.img_url ? (<td id = "first">{<img src={tray.img_url} className = "tableimage" alt=""/>}</td>
                      ):(<td id = "first"><img src={require("./menu.png")} className="tableimage" alt="menu"/></td>)}
                    <td>{tray.name}</td>
                    <td>{tray.price}</td>
                  </tr>
                </tbody>
              </table>
            );
          })
        )
      }
      <MyButton onClick={HandleClick}/>
    </div>
  );
}

function MyButton({onClick}) {
  /* console.log(Object.values(trays)[0]) */
  return (
  <div>
    <button onClick={onClick} className = "btn">
      More
    </button>
  </div>
  );
}

export default App;
