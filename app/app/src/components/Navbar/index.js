import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => (
  <div className="nav-bar">
    <div className="container-fluid">
      <div className="row d-flex align-items-center">
        <div className="col-sm">
          <h2>DevPledge</h2>
        </div>
        <div className="col-sm">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/feed">Feed</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default Navbar;

