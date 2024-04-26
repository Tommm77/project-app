import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const req = await fetch('http://localhost:3001/api/v1/login', {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password,
        })
      });
      const data = await req.json();
      if (data.message.token) {
        localStorage.setItem('token', data.message.token);
      }
      if (data.message.user) {
        localStorage.setItem('userId', data.message.user._id);
      }
      navigate('/');
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Connexion</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nom d'utilisateur :</label>
          <input
            type="text"
            value={username}
            onChange={handleChangeUsername}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Nom d'utilisateur"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={handleChangePassword}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Mot de passe"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
          Se connecter
        </button>
      </form>
      <div className="mt-4">
        <Link to="/create-account" className="text-blue-500 hover:underline">Créer un compte?</Link>
      </div>
    </div>
  );
};

export default LoginForm;
