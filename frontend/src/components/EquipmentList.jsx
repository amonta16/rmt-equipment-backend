import React from 'react';

function EquipmentList({ equipment, onDelete }) {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Equipment Dashboard 🚜</h1>

      {/* Dashboard Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 text-center">
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Total Equipment</h2>
          <p className="text-3xl font-bold text-green-600">{equipment.length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Available</h2>
          <p className="text-3xl font-bold text-blue-600">
            {equipment.filter((item) => item.status.toLowerCase() === 'available').length}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Rented</h2>
          <p className="text-3xl font-bold text-red-600">
            {equipment.filter((item) => item.status.toLowerCase() === 'rented').length}
          </p>
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
              className="bg-white rounded-2xl shadow-lg p-5 transform transition duration-500 hover:scale-105 hover:shadow-2xl opacity-0 animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
              <p className="text-gray-600">Type: {item.type}</p>
              <p className="text-gray-600">Status: {item.status}</p>
              <p className="text-gray-500 text-sm mt-3">{item.notes}</p>

              {/* Optional Delete Button */}
              <button
                onClick={() => onDelete(item.id)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease forwards;
        }
      `}</style>
    </div>
  );
}

export default EquipmentList;
