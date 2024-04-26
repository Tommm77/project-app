/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';


const ProfileComponent = () => {
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate();
   const userId = localStorage.getItem('userId');
   const token = localStorage.getItem('token');
   
   useEffect(() => {
      const fetchData = async () => {
         try {
            // Fetch des conversations de l'utilisateur
            const req = await fetch(`http://localhost:3001/api/v1/user/${userId}`, {
               method: "GET",
               headers: {
                     Accept: 'application/json',
                     'Content-Type': 'application/json',
                     'Authorization': `${token}`
               }
            });

            if (!req.ok) {
               throw new Error('Erreur réseau lors de la récupération des informations utilisateur');
            }
            const data = await req.json();
            console.log(data);
            setUsername(data.message.username)
            setEmail(data.message.email)
            } catch (error) {
               console.error(error.message);
            }
      };
      fetchData();
   }, []);
   

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
         if(password == "") {
            const req = await fetch(`http://localhost:3001/api/v1/user/${userId}`, {
               method: "PATCH",
               headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `${token}`
               },
               body: JSON.stringify({
                  username,
                  email
               })
            });
            navigate('/');
         } 
         else {
            const req = await fetch(`http://localhost:3001/api/v1/user/${userId}`, {
               method: "PATCH",
               headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `${token}`
               },
               body: JSON.stringify({
                  username,
                  email,
                  password
               })
            });
            navigate('/');
         }
      } catch (e) {
        console.error(e.message);
      }
    };

   return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-xl font-bold mb-4">Mon Profil</h2>
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
            <label className="block text-gray-700 text-sm font-bold mb-2">Nouveau mot de passe :</label>
            <input
              type="password"
              value={password}
              onChange={handleChangePassword}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Nouveau mot de passe"
              
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
            Modifier
          </button>
        </form>
      </div>
    );
}


export default ProfileComponent;