import React, { useState } from 'react';
import { addRenter } from '../api/renters';

function AddRenterForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    equipment: [],
    email: '',
    phone: '',
    notes: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addRenter(formData);
      onAdd();
      setFormData({
        name: '',
        equipment: [],
        email: '',
        phone: '',
        notes: '',
      });
    } catch (error) {
      console.error('Error adding renter:', error);
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
        className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-200 text-black"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-200 text-black"
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-200 text-black"
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
        Add Renter
      </button>
    </form>
  );
}

export default AddRenterForm;
