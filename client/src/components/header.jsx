import React from 'react';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-5 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/profile" className="text-lg hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.28 0 4-1.72 4-4s-1.72-4-4-4-4 1.72-4 4 1.72 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </a>
        <h1 className="text-3xl font-bold">My Application</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="/home" className="text-lg hover:text-gray-300">Home</a></li>
            <li><a href="/about" className="text-lg hover:text-gray-300">About</a></li>
            <li><a href="/signin" className="text-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-500 text-white px-4 py-2 rounded">Sign In</a></li>
            <li><a href="/signup" className="text-lg bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500 text-white px-4 py-2 rounded">Sign Up</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}