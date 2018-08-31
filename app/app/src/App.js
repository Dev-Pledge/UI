import React from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter as Router } from "react-router-dom";
import route from './routes'
import './style/App.scss'

const App = () => (
  <div className="App">
    <Router>
      {renderRoutes(route.routes)}
    </Router>
  </div>
);

export default App;
