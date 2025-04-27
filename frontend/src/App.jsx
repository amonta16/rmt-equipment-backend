import React, { useEffect, useState } from 'react';
import EquipmentList from './components/EquipmentList';
import AddEquipmentForm from './components/AddEquipmentForm';
import LoginPage from './components/LoginPage';
import { fetchEquipment } from './api/equipment';

function App() {
  const [equipment, setEquipment] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const loadEquipment = () => {
    fetchEquipment()
      .then((res) => setEquipment(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadEquipment();
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Header */}
      <header className="bg-green-600 text-white flex items-center justify-between p-4 shadow-md">
        <h1 className="text-2xl font-bold flex items-center">
          🌾 RMT Equipment Manager
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition text-sm"
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6 flex-grow space-y-8">

        {/* Add Equipment */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">Add New Equipment</h2>
          <AddEquipmentForm onAdd={loadEquipment} />
        </section>

        {/* Equipment List */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <EquipmentList equipment={equipment} onDelete={loadEquipment} />
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 p-4 text-center text-sm">
        © 2025 RMT Equipment Manager. All rights reserved.
      </footer>

    </div>
  );
}

export default App;
