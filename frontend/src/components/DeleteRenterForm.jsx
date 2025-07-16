import React, { useState } from 'react';
import { deleteRenter } from '../api/renters';

function DeleteRenterForm({ onDelete }) {
  const [renterId, setRenterId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await deleteRenter(renterId);
      onDelete(); // Refresh renter list
      setRenterId('');
    } catch (error) {
      console.error('Error deleting renter:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 bg-red-50 p-6 rounded-2xl shadow-lg"
    >
      <h2 className="text-xl font-bold text-red-700">Delete Renter</h2>
      <input
        type="text"
        placeholder="Enter Renter ID"
        value={renterId}
        onChange={(e) => setRenterId(e.target.value)}
        className="p-3 border border-red-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300 text-black"
        required
      />
      <button
        type="submit"
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all"
      >
        Delete Renter
      </button>
    </form>
  );
}

export default DeleteRenterForm;