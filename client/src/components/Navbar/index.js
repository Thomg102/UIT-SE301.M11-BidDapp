import React, {useState} from "react";
import { MenuItems } from "./MenuItems";

const Navbar = () => {
  const [state, setState] = useState(false);

  const handleClick = () => {
    setState(!state);
  };
  
  return (
    <nav className="navbar">
      <h1 className="navbar__logo">Sport</h1>
      <div className="navbar__menu-icon" onClick={handleClick}>
        <i className={state ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={state ? "navbar__menu navbar__active" : "navbar__menu"}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <a className={item.cName} href={item.url}>
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
