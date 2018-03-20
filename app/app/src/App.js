import React from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import route from './routes'
import './style/App.scss';

const App = () => (
  <div className="App">
    <Router>
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm">
              <p>DevPledge</p>
            </div>
            <div className="col-sm">
              <Link to="/">Home</Link>
              <Link to="/feed">Feed</Link>
            </div>
          </div>
        </div>
        {renderRoutes(route.routes)}
      </div>
    </Router>
  </div>
);


export default App;
