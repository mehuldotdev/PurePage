import React from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from '../pages/Hero.jsx';
import { Routes } from 'react-router-dom';
import { Router } from 'react-router-dom';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div>
      {/* <Router> */}
        <Navbar />
        <Home />
        <Footer />
      {/* </Router> */}
    </div>
  )
}

export default App