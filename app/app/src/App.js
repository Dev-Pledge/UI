import React from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter as Router, Link } from "react-router-dom";
import route from './routes'
import './style/App.scss';

const App = () => (
  <div className="App">
    <Router>
      <div>
        <div className="nav-bar">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm">
                <p>DevPledge</p>
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
        {renderRoutes(route.routes)}
      </div>
    </Router>
  </div>
);


export default App;
