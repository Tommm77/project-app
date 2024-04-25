import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
const HomeComponent = ({data}) => {
    return (
     
<div className="relative overflow-x-auto">
  <table className="w-full text-sm text-left">
    <thead className="text-xs uppercase border-b">
      <tr>
        <th scope="col" className="px-4 py-2 border-r">
          Titre
        </th>
        <th scope="col" className="px-4 py-2 border-r">
          Genre
        </th>
        <th scope="col" className="px-2 py-2 border-r">
          Vu
        </th>
        <th scope="col" className="px-2 py-2">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {data.map((elms, idx) => (
        <tr key={elms._id} className="border-b">
          <td className="px-4 py-2 font-medium whitespace-nowrap">
            {elms.name}
          </td>
          <td className="px-4 py-3">
            {elms.type}
          </td>
          <td className="px-2 py-2">
            {elms.alreadyViewed ? "Vu" : "Pas Vu"}
          </td>
          <td className="px-2 py-2">
     

          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


   
    );
};

export default HomeComponent;
