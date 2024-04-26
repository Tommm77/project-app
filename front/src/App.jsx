import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import './App.css';
import RegisterContainer from './pages/RegisterContainer';
import LoginContainer from './pages/LoginContainer';
import Messagerie from './pages/Messagerie';

function App() {
  useEffect(() => {
    // Connexion au socket du serveur
    const socket = io('http://localhost:3002'); // Assurez-vous que cette URL correspond à votre serveur

    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.on('messageCreated', (newMessage) => {
        console.log('New message created', newMessage);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    // Nettoyer lors de la déconnexion du composant
    return () => socket.disconnect();
  }, []);

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Messagerie />} />
          <Route path="/create-account" element={<RegisterContainer />} />
          <Route path="/login" element={<LoginContainer />} />
        </Routes>
      </Router>
  );
}

export default App;
