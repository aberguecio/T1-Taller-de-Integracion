import React, { useState, useEffect} from 'react';
import './App.css';
import Appnavbar from "./Navbar.js";
import Modal  from "./Modal.js"

function App() {
  const [consult, setConsult] = useState("trays");
  const [data, setData] = useState([]);
  const [revdata, setRevdata] = useState([]);
  const [returndata, setReturndata] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");

  const [show, setShow] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const [searchText, setSearchText] = useState('');


  async function Makecall(){
    await fetch(`https://tarea-1.2023-1.tallerdeintegracion.cl/${consult}?sort=${sort}&order=${order}&page=${page}&size=25`, {method: "GET"})
    .then((response) => response.json())
    .then((data) => {
      console.log("Makecall:",data)
      setReturndata(data);
    });
  }

  useEffect(() => {
    Makecall()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[page]);

  useEffect(() => {
    setData([]);
    setPage(1)
    page === 1 && Makecall()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[consult,sort,order]);

/*   useEffect(() => {
    setSearchText("")
    setShow(false)
  },[]); */


  useEffect(() => {Array.isArray(Object.values(returndata)[0]) ? (setData(data.concat(Object.values(returndata)[0]))):
    (setData(data.concat(Object.values(returndata))));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[returndata]);

  function moreClick(){
    setPage(page+1)
  }

  function hideModal() {
    setShow(false);
  };
  function sortClick(){
    sort === "name"? (setSort("price")):(setSort("name"))
  }  
  function orderClick(){
    order === "asc"? (setOrder("desc")):(setOrder("asc"))
  }


  async function TableClick(id){
    await fetch(`https://tarea-1.2023-1.tallerdeintegracion.cl/${consult}/${id}`, {method: "GET"})
    .then((response) => response.json())
    .then((data) => {
      setSelectedData(data);
      console.log("TableClick:",data)
      handleReviews(id)
    });
  }

  async function handleReviews(id) {
    await fetch(`https://tarea-1.2023-1.tallerdeintegracion.cl/reviews/${id}`, {method: "GET"})
    .then((response) => response.json())
    .then((data) => {
      console.log("handleReviews:",data)
      setRevdata(data);
    });
  }

  useEffect(() => {
    (Object.values(selectedData).length !== 0 && setShow(true))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[revdata]);


  async function handleInputChange() {
    await fetch(`https://tarea-1.2023-1.tallerdeintegracion.cl/search/${consult}?name=${searchText}`, {method: "GET"})
    .then((response) => response.json())
    .then((data) => {
      setData([]);
      console.log(data)
      setReturndata(data);
    });
  }

  function searchInput(event) {
    setSearchText(event.target.value);
    handleInputChange()
  }

  useEffect(() => {
    handleInputChange()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[searchText]);

  return (
    <div className="App">
      <Appnavbar seter = {setConsult}/>
      <header className="App-header">
        <h1 className = "Title">Le Puerquito</h1>
        <img src={require("./puerco.png")} className="App-logo" alt="logo" />
      </header>
      <div>
        <label>
          Search:
          <input type="text" value={searchText} onChange={searchInput} />
        </label>
      </div>
      <MyButton onClick={sortClick} text="sort"/>
      <MyButton onClick={orderClick} text="order"/>

      {show && <Modal details={selectedData} revdetails={revdata} handleClose={hideModal} />}

      {data.length > 0 && (
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
      {data.length > 0 && (
          data.map(tray => {
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
      <MyButton onClick={moreClick} text = "More"/>
    </div>
  );
}

function MyButton({onClick, text}) {
  return (
    <button onClick={onClick} className = "btn">
      {text}
    </button>
  );
}

export default App;
