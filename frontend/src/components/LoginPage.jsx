import React, { useState } from 'react';

function LoginPage({ onLogin }) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple hardcoded password (later you can connect to real API)
    if (password === 'rmt1234') {
      onLogin();
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Login to RMT Equipment Manager</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-64">
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600 w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
