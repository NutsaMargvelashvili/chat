import React from "react";
import "./style.scss";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div className="header">
      <nav className="navigation">
        <ul className="list-items">
          <NavLink className="list-item" to={"cv"}>
            CV
          </NavLink>
          <NavLink className="list-item" to={"chat"}>
            Chat
          </NavLink>
          <li className="list-item">Home</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
