import React, { useState } from 'react';
import { addEquipment } from '../api/equipment';

function AddEquipmentForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    status: 'Available',
    available_date: '',
    return_date: '',
    notes: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEquipment(formData);
      onAdd();
      setFormData({
        name: '',
        type: '',
        status: 'Available',
        available_date: '',
        return_date: '',
        notes: '',
      });
    } catch (error) {
      console.error('Error adding equipment:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10"
    >
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="p-3 border-2 border-blue-500 bg-yellow-200 rounded-xl"
        required
      />
      <input
        type="text"
        name="type"
        placeholder="Type"
        value={formData.type}
        onChange={handleChange}
        className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
        required
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        <option value="Available">Available</option>
        <option value="Rented">Rented</option>
      </select>
      <input
        type="date"
        name="available_date"
        value={formData.available_date}
        onChange={handleChange}
        className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <input
        type="date"
        name="return_date"
        value={formData.return_date}
        onChange={handleChange}
        className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <textarea
        name="notes"
        placeholder="Notes"
        value={formData.notes}
        onChange={handleChange}
        className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 md:col-span-2 lg:col-span-3"
      />
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all md:col-span-2 lg:col-span-3"
      >
        Add Equipment
      </button>
    </form>
  );
}

export default AddEquipmentForm;
