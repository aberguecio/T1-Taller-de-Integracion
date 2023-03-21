import React, { useState} from 'react';
import './App.css';

function MyButton() {
  const [trays, setTrays] = useState(true);
  async function HandleClick(){
    await fetch('https://tarea-1.2023-1.tallerdeintegracion.cl/trays', {method: "GET"})
    .then((response) => response.json())
    .then((data) => {
      setTrays(data);
    });
  }
  /* console.log(Object.values(trays)[0]) */
  return (
  <div>
    {Object.values(trays)[0] ? (
      Object.values(trays)[0].map(tray => {
        return(
            <div key={tray.id}>
              <h3> Nombre: {tray.name}</h3>
              <h3>Precio: {tray.price}</h3>
            </div>
        );
      })
    ) : (
      <button onClick={HandleClick} className = "btn">
      Click me
    </button>
    )}
  </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className = "Title">EL Puerquito</h1>
        <img src={require("./puerco.png")} className="App-logo" alt="logo" />
        <MyButton/>
      </header>
    </div>
  );
}

export default App;
