import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex space-x-4">
        <li className="text-white">
          <Link to="/">Accueil</Link>
        </li>
        <li className="text-white">
          <Link to="/create-account">Créer un compte</Link>
        </li>
        <li className="text-white">
          <Link to="/login">Se connecter</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
