import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import Navbar from "./components/Navbar"
import Home from "./views/Home";
import Login from "./views/Login"
import Register from "./views/Register"


function App() {
  return (
    <Router>
      <Container>
        <Navbar />
        <Route exact path='/' component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Container>
    </Router>
  );
}

export default App;
