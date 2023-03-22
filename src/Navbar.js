import "./Navbar.css";
function Appnavbar({seter}) {
  return (
    <ul>
        <li>
            <NavButton seter={seter} tipe = {"trays"}/>
            <NavButton seter={seter} tipe = {"courses"}/>
            <NavButton seter={seter} tipe = {"ingredients"}/>
        </li>
  </ul> 
  );
}

function NavButton({seter,tipe}) {
    function handleClick(){
        seter(tipe)
    }
    return (
      <button onClick={handleClick} className = "btn">
        {tipe}
      </button>
    );
  }

export default Appnavbar;