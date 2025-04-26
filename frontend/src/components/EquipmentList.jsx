import React, { useEffect, useState } from 'react';
import { fetchEquipment } from '../api/equipment';

function EquipmentList() {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    fetchEquipment()
      .then((res) => setEquipment(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Calculate summary stats
  const totalEquipment = equipment.length;
  const availableEquipment = equipment.filter(item => item.status.toLowerCase() === 'available').length;
  const rentedEquipment = equipment.filter(item => item.status.toLowerCase() === 'rented').length;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Equipment Dashboard 🚜</h1>

      {/* Dashboard Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-center">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold">Total Equipment</h2>
          <p className="text-2xl font-bold text-green-600">{totalEquipment}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold">Available</h2>
          <p className="text-2xl font-bold text-blue-600">{availableEquipment}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold">Rented</h2>
          <p className="text-2xl font-bold text-red-600">{rentedEquipment}</p>
        </div>
      </div>

      {/* Equipment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {equipment.length === 0 ? (
          <p className="text-gray-500">No equipment available.</p>
        ) : (
          equipment.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition">
              <h2 className="text-xl font-bold mb-2">{item.name}</h2>
              <p className="text-gray-600">Type: {item.type}</p>
              <p className="text-gray-600">Status: {item.status}</p>
              <p className="text-gray-500 text-sm mt-2">{item.notes}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EquipmentList;
