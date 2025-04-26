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
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <AddEquipmentForm onAdd={loadEquipment} />
      <EquipmentList equipment={equipment} onDelete={loadEquipment} />
    </div>
  );
}

export default App;
