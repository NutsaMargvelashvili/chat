import React from "react";
import "./style.scss";

function Header() {
  return (
    <div className={"header"}>
      <nav className={"navigation"}>
        <ul className={"list-items"}>
          <li className={"list-item"}>CV</li>
          <li className={"list-item"}>Chat</li>
          <li className={"list-item"}>Home</li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
