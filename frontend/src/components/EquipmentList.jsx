import React, { useState } from 'react';

function EquipmentList({ equipment }) {
  const totalEquipment = equipment.length;
  const availableEquipment = equipment.filter(item => item.status.toLowerCase() === 'available').length;
  const rentedEquipment = equipment.filter(item => item.status.toLowerCase() === 'rented').length;

  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="relative p-6">
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
              onClick={() => setSelectedItem(item)}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
              style={{ animation: `fadeIn 0.5s ease ${index * 0.05}s forwards`, opacity: 0 }}
            >
              <h3 className="text-gray-600 font-bold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-1">Type: {item.type}</p>
              <p className="text-gray-600 mb-1">Status: {item.status}</p>
              {item.notes && <p className="text-gray-500 mt-2 text-sm">{item.notes}</p>}
            </div>
          ))
        )}
      </div>

      {selectedItem && (
        <>
          <div className="fixed inset-0 bg-black/35 z-40"></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        bg-white border border-black p-6 rounded-xl shadow-xl z-50 w-11/12 max-w-md">
            <div className="bg-white border border-black p-6 rounded-xl max-w-md w-full relative shadow-lg">
              <button
                className="absolute top-2 right-2 w-4 h-4 p-0 text-[10px] overflow-hidden bg-black text-white rounded-full flex items-center justify-center leading-none"
                onClick={() => setSelectedItem(null)}
              >
                &times;
              </button>
              <h3 className="text-2xl font-bold mb-2 text-black">{selectedItem.name}</h3>
              <p className="text-black mb-1"><strong>Type:</strong> {selectedItem.type}</p>
              <p className="text-black mb-1"><strong>Status:</strong> {selectedItem.status}</p>
              <p className="text-black mb-1"><strong>Available:</strong> {selectedItem.available_date}</p>
              <p className="text-red-500 mb-1"><strong>Return:</strong> {selectedItem.return_date}</p>
              {selectedItem.notes && (
                <p className="text-black mt-2"><strong>Notes:</strong> {selectedItem.notes}</p>
              )}
            </div>
          </div>
        </>
      )}

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
