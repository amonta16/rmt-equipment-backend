import React from 'react';

function EquipmentList({ equipment }) {
  // Calculate dashboard stats
  const totalEquipment = equipment.length;
  const availableEquipment = equipment.filter(item => item.status.toLowerCase() === 'available').length;
  const rentedEquipment = equipment.filter(item => item.status.toLowerCase() === 'rented').length;

  return (
    <div>
      {/* Dashboard Overview */}
      <h2 className="text-3xl font-bold mb-6 flex items-center">
        Equipment Dashboard <span className="ml-2 animate-bounce">🚜</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-green-100 text-green-800 rounded-xl p-6 shadow hover:shadow-lg transition">
          <h3 className="text-lg font-semibold">Total Equipment</h3>
          <p className="text-3xl font-bold mt-2">{totalEquipment}</p>
        </div>
        <div className="bg-blue-100 text-blue-800 rounded-xl p-6 shadow hover:shadow-lg transition">
          <h3 className="text-lg font-semibold">Available</h3>
          <p className="text-3xl font-bold mt-2">{availableEquipment}</p>
        </div>
        <div className="bg-red-100 text-red-800 rounded-xl p-6 shadow hover:shadow-lg transition">
          <h3 className="text-lg font-semibold">Rented</h3>
          <p className="text-3xl font-bold mt-2">{rentedEquipment}</p>
        </div>
      </div>

      {/* Equipment Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {equipment.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">No equipment available.</p>
        ) : (
          equipment.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-2xl transition-transform transform hover:-translate-y-1"
              style={{
                animation: `fadeUp 0.5s ease ${index * 0.05}s both`,
              }}
            >
              <h3 className="text-xl font-bold mb-2">{item.name}</h3>
              <p className="text-gray-700">Type: {item.type}</p>
              <p className="text-gray-700">Status: {item.status}</p>
              {item.notes && (
                <p className="text-gray-500 text-sm mt-2">Notes: {item.notes}</p>
              )}
            </div>
          ))
        )}
      </div>

      {/* Fade Animation */}
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default EquipmentList;
