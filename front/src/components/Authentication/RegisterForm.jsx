import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const navigate = useNavigate();

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeFirstname = (e) => {
    setFirstname(e.target.value);
  };

  const handleChangeLastname = (e) => {
    setLastname(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const req = await fetch('http://localhost:3001/api/v1/registration', {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          email,
          password,
          firstname,
          lastname
        })
      });
      navigate('/login');
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Inscription</h2>
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
          <label className="block text-gray-700 text-sm font-bold mb-2">Email :</label>
          <input
            type="email"
            value={email}
            onChange={handleChangeEmail}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Email"
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
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Prénom :</label>
          <input
            type="text"
            value={firstname}
            onChange={handleChangeFirstname}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Prénom"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nom de famille :</label>
          <input
            type="text"
            value={lastname}
            onChange={handleChangeLastname}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Nom de famille"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
          Créer
        </button>
      </form>
      <div className="mt-4">
        <Link to="/login" className="text-blue-500 hover:underline">Vous avez un compte?</Link>
      </div>
    </div>
  );
};

export default RegisterForm;
