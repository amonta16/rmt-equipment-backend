import React, { useEffect, useState } from 'react';
import { fetchEquipment } from '../api/equipment';

function EquipmentList() {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    fetchEquipment()
      .then((res) => setEquipment(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Summary calculations
  const totalEquipment = equipment.length;
  const availableEquipment = equipment.filter(item => item.status.toLowerCase() === 'available').length;
  const rentedEquipment = equipment.filter(item => item.status.toLowerCase() === 'rented').length;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Equipment Dashboard 🚜</h1>

      {/* Dashboard Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 text-center">
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Total Equipment</h2>
          <p className="text-3xl font-bold text-green-600">{totalEquipment}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Available</h2>
          <p className="text-3xl font-bold text-blue-600">{availableEquipment}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Rented</h2>
          <p className="text-3xl font-bold text-red-600">{rentedEquipment}</p>
        </div>
      </div>

      {/* Equipment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {equipment.length === 0 ? (
          <p className="text-gray-500">No equipment available.</p>
        ) : (
          equipment.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg p-5 hover:scale-105 hover:shadow-2xl transition-transform duration-300"
              style={{ animation: `fadeIn 0.3s ease forwards`, animationDelay: `${index * 0.05}s` }}
            >
              <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
              <p className="text-gray-600">Type: {item.type}</p>
              <p className="text-gray-600">Status: {item.status}</p>
              <p className="text-gray-500 text-sm mt-3">{item.notes}</p>
            </div>
          ))
        )}
      </div>

      {/* Simple Fade-in Keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default EquipmentList;
