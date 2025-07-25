import React, { useEffect, useState } from 'react';
import EquipmentList from './components/EquipmentList';
import AddEquipmentForm from './components/AddEquipmentForm';
import DeleteEquipmentForm from './components/DeleteEquipmentForm';
import LoginPage from './components/LoginPage';
import { fetchEquipment } from './api/equipment';
import { fetchRenters } from './api/renters';

import AppTabs from './components/AppTabs';

function App() {
  const [equipment, setEquipment] = useState([]);
  const [renters, setRenters] = useState([]);
  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem('loggedIn') === 'true';
  });


  const loadEquipment = () => {
    fetchEquipment()
      .then((res) => setEquipment(res.data))
      .catch((err) => console.error(err));
  };
  const loadRenters = () => {
    fetchRenters()
      .then((res) => setRenters(res.data))
      .catch((err) => console.error(err));
  };

  const loadData = () => {
    loadEquipment();
    loadRenters();
  }

  useEffect(() => {
    loadData();
    if (loggedIn) {
      loadEquipment();
      loadRenters();
    }
  }, [loggedIn]);

  const handleLogin = () => {
    localStorage.setItem('loggedIn', 'true');
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      
      {/* Header */}
      <header className="bg-green-700 text-white p-4 text-center text-3xl font-bold shadow-md flex justify-center items-center gap-2">
        <img src="/icon-192x192.png" alt="RMT Logo" className="w-10 h-10 animate-bounce" />
        RMT Equipment Manager
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-6 space-y-10">

        {/* Logout Button */}
        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Logout
          </button>
        </div>

        <AppTabs equipment={equipment} renters={renters} onReload={loadData} />

      </main>

      {/* Footer */}
      <footer className="bg-green-800 text-white p-4 text-center text-sm">
        © 2025 RMT Equipment. All rights reserved!.
      </footer>

    </div>
  );
}

export default App;
