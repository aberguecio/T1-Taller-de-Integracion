import React, { useState, useEffect} from 'react';
import './App.css';
import Appnavbar from "./Navbar.js";
import Modal  from "./Modal.js"

function App() {
  const [consult, setConsult] = useState("trays");
  const [trays, setTrays] = useState([]);
  const [returntrays, setReturntrays] = useState([]);
  const [page, setPage] = useState(1);

  const [show, setShow] = useState(false);
  const [selectedData, setSelectedData] = useState({});


  function hideModal() {
    setShow(false);
  };

  async function Makecall(){
    await fetch(`https://tarea-1.2023-1.tallerdeintegracion.cl/${consult}?sort=name&order=asc&page=${page}&size=25`, {method: "GET"})
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

  async function TableClick(id){
    await fetch(`https://tarea-1.2023-1.tallerdeintegracion.cl/${consult}/${id}`, {method: "GET"})
    .then((response) => response.json())
    .then((data) => {
      setSelectedData(data);
      console.log(data)
      setShow(true);
    });
  }

  return (
    <div className="App">
      <Appnavbar seter = {setConsult}/>
      <header className="App-header">
        <h1 className = "Title">Le Puerquito</h1>
        <img src={require("./puerco.png")} className="App-logo" alt="logo" />
      </header>

      {show && <Modal details={selectedData} handleClose={hideModal} />}

      {trays.length > 0 && (
        <table className= "table">
          <tbody>
            <tr >
              <th className = "first">Image</th>
              <th className = "tablename">Nombre</th>
              <th>Precio</th>
            </tr>
          </tbody>
        </table>
      )}
      {trays.length > 0 && (
          trays.map(tray => {
            return(
              <> 
              <table className= "table" key={tray.id}>
                
                <tbody>
                  <tr onClick={() => TableClick(tray.id)} >
                    {
                    tray.img_url ? (<td className = "first">{<img src={tray.img_url} className = "tableimage" alt=""/>}</td>):
                    (<td className = "first"><img src={require("./menu.png")} className="tableimage" alt="menu"/></td>)}
                    <td className = "tablename">{tray.name}</td>
                    <td>{tray.price}</td>
                  </tr>
                </tbody>
              </table>
              </>
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
