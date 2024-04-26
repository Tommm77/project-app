import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import './App.css';
import RegisterContainer from './pages/RegisterContainer';
import LoginContainer from './pages/LoginContainer';
import ChatContainer from './pages/ChatContainer';

function App() {

  return (
    <Router>

    <Routes>
      <Route path="/" element={<ChatContainer />} />
      <Route path="/create-account" element={<RegisterContainer />} />
      <Route path="/login" element={<LoginContainer />} />

    </Routes>
  </Router>
  )
}

export default App;
