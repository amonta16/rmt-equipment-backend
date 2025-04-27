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
      <header className="bg-green-600 text-white p-4 text-center text-2xl font-bold shadow-md">
        <span className="inline-flex items-center space-x-2">
          <span>🌾 RMT Equipment Manager</span>
          <span className="soft-bounce">🚜</span>
          <span>🌾</span>
        </span>
        <style>{`
          @keyframes softBounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-8px);
            }
          }
          .soft-bounce {
            animation: softBounce 1.5s infinite;
          }
        `}</style>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4 space-y-10">

        {/* Logout Button */}
        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Add New Equipment */}
        <section className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Add New Equipment</h2>
          <AddEquipmentForm onAdd={loadEquipment} />
        </section>

        {/* Equipment Dashboard */}
        <section className="bg-white p-6 rounded-2xl shadow-lg">
          <EquipmentList equipment={equipment} onDelete={loadEquipment} />
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 p-4 text-center">
        © 2025 RMT Equipment. All rights reserved.
      </footer>

    </div>
  );
}

export default App;
