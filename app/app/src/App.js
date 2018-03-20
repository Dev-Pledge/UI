import React from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter as Router } from "react-router-dom";
import route from './routes'
import Navbar from './components/Navbar'
import './style/App.scss';

const App = () => (
  <div className="App">
    <Router>
      <div>
        <Navbar />
        <div className="content-wrapper">
          {renderRoutes(route.routes)}
        </div>
      </div>
    </Router>
  </div>
);


export default App;
