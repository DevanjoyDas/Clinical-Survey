// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-5 flex flex-col justify-between border-2 border-lime-500">
      {/* Dashboard Header */}
      <div className="flex flex-col items-center mb-8 border-black">
        <h2 className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-400 text-4xl text-lime-400">DASHBOARD</Link>
        </h2>
      </div>

      {/* Links Section */}
      <div className="flex-grow flex flex-col justify-center items-center font-semibold">
        <ul className="space-y-4">
          <li>
            <Link to="/locations" className="hover:text-gray-400 text-2xl">LOCATIONS</Link>
          </li>
          <li>
            <Link to="/demographics" className="hover:text-gray-400 text-2xl">DEMOGRAPHICS</Link>
          </li>
          <li>
            <Link to="/trials" className="hover:text-gray-400 text-2xl">TRIALS</Link>
          </li>
        </ul>
      </div>

      {/* Logo at Bottom */}
      <div className="flex items-center justify-center">
        <img className="h-22 w-22" src='./logo.png' alt="Logo" />
      </div>
    </div>
  );
}

export default Sidebar;
