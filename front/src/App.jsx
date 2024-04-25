import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import RegisterContainer from './pages/RegisterContainer';
import LoginContainer from './pages/LoginContainer';
import Navbar from './Layout/Navbar';
import HomeContainer from './pages/HomeContainer';
function App() {


  return (
    <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomeContainer />} />
      <Route path="/create-account" element={<RegisterContainer />} />
      <Route path="/login" element={<LoginContainer />} />

    </Routes>
  </Router>
  )
}

export default App
