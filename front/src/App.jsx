import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import RegisterContainer from './pages/RegisterContainer';
import LoginContainer from './pages/LoginContainer';

import WhatsApp from './pages/WhatsApp';
function App() {


  return (
    <Router>

    <Routes>
      <Route path="/" element={<WhatsApp />} />
      <Route path="/create-account" element={<RegisterContainer />} />
      <Route path="/login" element={<LoginContainer />} />

    </Routes>
  </Router>
  )
}

export default App
