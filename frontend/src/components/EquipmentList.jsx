import React, { useEffect, useState } from 'react';
import { fetchEquipment } from '../api/equipment';

function EquipmentList() {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    fetchEquipment()
      .then((res) => setEquipment(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Equipment Dashboard 🚜</h1>

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
