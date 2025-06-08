import React from 'react';

function EquipmentList({ equipment }) {
  const totalEquipment = equipment.length;
  const availableEquipment = equipment.filter(item => item.status.toLowerCase() === 'available').length;
  const rentedEquipment = equipment.filter(item => item.status.toLowerCase() === 'rented').length;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-8 flex items-center space-x-2 text-black">
        <span>Equipment Dashboard</span>
        <span className="text-green-600 animate-bounce text-4xl">🚜</span>
      </h2>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-center">
        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-lg font-semibold text-gray-700">Total Equipment</p>
          <p className="text-4xl font-bold text-green-600">{totalEquipment}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-lg font-semibold text-gray-700">Available</p>
          <p className="text-4xl font-bold text-blue-600">{availableEquipment}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-lg font-semibold text-gray-700">Rented</p>
          <p className="text-4xl font-bold text-red-500">{rentedEquipment}</p>
        </div>
      </div>

      {/* Equipment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {equipment.length === 0 ? (
          <p className="text-gray-500">No equipment data available.</p>
        ) : (
          equipment.map((item, index) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
              style={{ animation: `fadeIn 0.5s ease ${index * 0.05}s forwards`, opacity: 0 }}
            >
              <h3 className="text-xl font-bold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-1">Type: {item.type}</p>
              <p className="text-gray-600 mb-1">Status: {item.status}</p>
              {item.notes && <p className="text-gray-500 mt-2 text-sm">{item.notes}</p>}
            </div>
          ))
        )}
      </div>

      {/* Fade-in animation keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default EquipmentList;
