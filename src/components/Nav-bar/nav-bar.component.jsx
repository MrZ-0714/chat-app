import React from "react";
import "./nav-bar.styles.scss";

import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <Link className="nav-bar-options" to="/friends">
        Friends
      </Link>
      <Link className="nav-bar-options" to="/me">
        Me
      </Link>
    </div>
  );
};

export default NavBar;
