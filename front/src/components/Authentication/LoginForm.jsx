import React, { useEffect, useState } from 'react';


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const req = await fetch('http://localhost:3001/api/v1/login',
        {
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({

            email,
            password,

          })
        })


    } catch (e) {
      console.error(e.message)
    } finally {
      setLoading(false)
      setTimeout(() => {
        setError("")
      }, 2000)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 flex flex-col space-y-4">
      <div className="flex flex-col">
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
      <div className="flex flex-col">
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
      <div className="flex flex-col">
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

      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Se connecter
      </button>
    </form>

  );
};

export default LoginForm;
