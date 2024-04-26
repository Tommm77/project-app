import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import RegisterContainer from './pages/RegisterContainer';
import LoginContainer from './pages/LoginContainer';
import Messagerie from './pages/Messagerie';

function App() {


  return (
    <Router>

    <Routes>
      <Route path="/" element={<Messagerie />} />
      <Route path="/create-account" element={<RegisterContainer />} />
      <Route path="/login" element={<LoginContainer />} />

    </Routes>
  </Router>
  )
}

export default App
