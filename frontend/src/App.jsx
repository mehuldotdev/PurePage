import React from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Hero from '../pages/Hero.jsx';
import Cart from '../pages/Cart.jsx';
import Profile from '../pages/Profile.jsx';
import AllBooks from '../pages/AllBooks.jsx';
import Login from '../pages/Login.jsx';
import SignUp from '../pages/SignUp.jsx';
import { Routes, Router, Route } from 'react-router-dom';

function App() {
  return (
    <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Hero />}></Route>
          <Route path='/all-books' element={<AllBooks />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/profiel' element={<Profile />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
        </Routes>
        <Footer />
    </div>
  )
}

export default App