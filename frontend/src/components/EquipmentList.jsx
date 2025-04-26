import React from 'react';
import { deleteEquipment } from '../api/equipment';

function EquipmentList({ equipment, onDelete }) {
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      deleteEquipment(id)
        .then(() => {
          alert('Equipment deleted successfully!');
          onDelete(); // Reload equipment list
        })
        .catch((err) => {
          console.error(err);
          alert('Error deleting equipment.');
        });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Equipment List</h1>
      <ul>
        {equipment.map((item) => (
          <li key={item.id} className="mb-2 flex justify-between items-center">
            <div>
              {item.name} — {item.status}
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EquipmentList;
