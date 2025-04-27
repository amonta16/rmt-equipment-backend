import React, { useState } from 'react';

function LoginPage({ onLogin }) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'admin') {
      onLogin();
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80 space-y-6">
        <h1 className="text-2xl font-bold text-center text-green-600">
          Login to RMT Equipment Manager
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
