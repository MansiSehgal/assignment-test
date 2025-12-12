import { NavLink } from "react-router-dom";

function Menu() {
  return (
    <header>
      <NavLink to="/">Home</NavLink>
      {" | "}
      <NavLink to="/characters">Characters</NavLink>
      {" | "}
      <NavLink to="/locations">Locations</NavLink>
      {" | "}
      <NavLink to="/episodes">Episodes</NavLink>
    </header>
  );
}

export default Menu;
