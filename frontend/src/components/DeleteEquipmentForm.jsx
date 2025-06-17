import React, { useState } from 'react';
import { deleteEquipment } from '../api/equipment';

function DeleteEquipmentForm({ onDelete }) {
  const [equipmentId, setEquipmentId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await deleteEquipment(equipmentId);
      onDelete(); // Refresh equipment list
      setEquipmentId('');
    } catch (error) {
      console.error('Error deleting equipment:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 bg-red-50 p-6 rounded-2xl shadow-lg"
    >
      <h2 className="text-xl font-bold text-red-700">Delete Equipment</h2>
      <input
        type="text"
        placeholder="Enter Equipment ID"
        value={equipmentId}
        onChange={(e) => setEquipmentId(e.target.value)}
        className="p-3 border border-red-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300 text-black"
        required
      />
      <button
        type="submit"
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all"
      >
        Delete Equipment
      </button>
    </form>
  );
}

export default DeleteEquipmentForm;