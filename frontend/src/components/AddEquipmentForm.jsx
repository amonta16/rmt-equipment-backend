import React, { useState } from 'react';
import { addEquipment } from '../api/equipment';

function AddEquipmentForm({ onAdd }) {  // ✅ Accepts onAdd as a prop
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    status: '',
    rental_date: '',
    return_date: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEquipment(formData)
      .then((res) => {
        alert('Equipment added successfully!');
        setFormData({
          name: '',
          type: '',
          status: '',
          rental_date: '',
          return_date: '',
          notes: '',
        });
        onAdd();  // ✅ Refresh the equipment list after adding
      })
      .catch((err) => {
        console.error(err);
        alert('Error adding equipment.');
      });
  };

  return (
    <div className="p-4 mb-8">
      <h2 className="text-xl font-bold mb-4">Add New Equipment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="block w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Type"
          className="block w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
          placeholder="Status"
          className="block w-full border p-2 rounded"
          required
        />
        <input
          type="date"
          name="rental_date"
          value={formData.rental_date}
          onChange={handleChange}
          className="block w-full border p-2 rounded"
        />
        <input
          type="date"
          name="return_date"
          value={formData.return_date}
          onChange={handleChange}
          className="block w-full border p-2 rounded"
        />
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Notes"
          className="block w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Equipment
        </button>
      </form>
    </div>
  );
}

export default AddEquipmentForm;
