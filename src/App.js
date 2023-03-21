import React, { useState, useEffect} from 'react';
import './App.css';

function App() {
  const [trays, setTrays] = useState([]);
  const [returntrays, setReturntrays] = useState([]);
  const [page, setPage] = useState(1);

  async function HandleClick(){
    setPage(page+1)
    await fetch(`https://tarea-1.2023-1.tallerdeintegracion.cl/trays?page=${page}`, {method: "GET"})
    .then((response) => response.json())
    .then((data) => {
      setReturntrays(data);
    });
  }
  useEffect(() => {Object.values(returntrays)[0] && setTrays(trays.concat(Object.values(returntrays)[0]));
    console.log(returntrays);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[returntrays]);
  return (
    <div className="App">
      <header className="App-header">
        <h1 className = "Title">EL Puerquito</h1>
        <img src={require("./puerco.png")} className="App-logo" alt="logo" />
      </header>
      {trays.length > 0 && (
        <table className= "table">
          <tbody>
            <tr >
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
      Click me
    </button>
  </div>
  );
}

export default App;
