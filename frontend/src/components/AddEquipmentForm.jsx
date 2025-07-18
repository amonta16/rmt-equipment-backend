import React, { useState } from 'react';
import { addEquipment } from '../api/equipment';

function AddEquipmentForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    notes: '',
    id: ''
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
        notes: '',
        id: ''
      });
    } catch (error) {
      console.error('Error adding equipment:', error);
    }
  };

  
  return (
    
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 bg-gray-100 p-6 rounded-2xl shadow-lg mb-5"
    > 
      
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-200 text-black"
        required
      />
      <input
        type="text"
        name="type"
        placeholder="Type"
        value={formData.type}
        onChange={handleChange}
        className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-200 text-black"
        required
      />
      <input
        type="number"
        name="id"
        placeholder="ID"
        value={formData.id}
        onChange={handleChange}
        className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-200 text-black"
        required
      />
      <textarea
        name="notes"
        placeholder="Notes"
        value={formData.notes}
        onChange={handleChange}
        className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 md:col-span-2 lg:col-span-3 text-black"
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
