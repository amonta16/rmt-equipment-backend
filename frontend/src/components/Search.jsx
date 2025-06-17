import React, { useState, useEffect } from 'react';

export default function SearchEquipment({ equipment }) {
  const [searchName, setSearchName] = useState('');
  const [searchType, setSearchType] = useState('');
  const [filters, setFilters] = useState({
    Available: false,
    Rented: false,
    // Add other statuses or types you want to filter by
  });

  const [selectedItem, setSelectedItem] = useState(null);

  // Handle checkbox toggle
  function toggleFilter(key) {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  // Filter equipment based on search and filters
  const filteredEquipment = equipment.filter((item) => {
    // Filter by name (case insensitive)
    const nameMatch = item.name.toLowerCase().includes(searchName.toLowerCase());

    // Filter by type (case insensitive)
    const typeMatch = item.type.toLowerCase().includes(searchType.toLowerCase());

    // Filter by status filters (if any filter is true, include only matching statuses)
    const activeFilters = Object.entries(filters).filter(([_, v]) => v).map(([k]) => k);
    const statusMatch = activeFilters.length === 0 || activeFilters.includes(item.status);

    return nameMatch && typeMatch && statusMatch;
  });

  return (
    <section className="relative bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl text-black font-semibold mb-4">Search Equipment</h2>

      <input
        type="text"
        placeholder="Search by name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        className="border border-black text-black p-2 rounded w-full mb-4"
      />

      <input
        type="text"
        placeholder="Search by type"
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        className="border border-black text-black p-2 rounded w-full mb-4"
      />

      <div className="mb-4">
        <span className="font-semibold mr-4 text-black">Filter by status:</span>
        {Object.keys(filters).map((key) => (
          <label key={key} className="mr-4 text-black">
            <input
              type="checkbox"
              checked={filters[key]}
              onChange={() => toggleFilter(key)}
              className="mr-1 border border-black rounded focus:ring-black"
            />
            {key}
          </label>
        ))}
      </div>

      <ul>
        {filteredEquipment.map((item) => (
            <li 
                key={item.id} 
                className="border-b text-black py-2 px-2 transition-transform transform hover:-translate-y-1 hover:shadow cursor-default"
                onClick={() => setSelectedItem(item)}
            >
                {item.name} - <span className="font-semibold">{item.type}</span> - <span className="italic">{item.status}</span>
            </li>
        ))}
        {filteredEquipment.length === 0 && <li>No matching equipment found.</li>}
      </ul>

        {selectedItem && (
            <>
                <div className="fixed inset-0 bg-black/35 z-40"></div>
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    bg-white border border-black p-6 rounded-xl shadow-xl z-50 w-11/12 max-w-md">
                    <button
                        className="absolute top-2 right-2 w-4 h-4 p-0 text-[10px] overflow-hidden bg-black text-white rounded-full flex items-center justify-center leading-none"
                        onClick={() => setSelectedItem(null)}
                    >
                        &times;
                    </button>
                    <h3 className="text-lg text-black font-semibold mb-2">Equipment Details</h3>
                    <p className ="text-black"><strong>Name:</strong> {selectedItem.name}</p>
                    <p className ="text-black"><strong>Type:</strong> {selectedItem.type}</p>
                    <p className ="text-black"><strong>Status:</strong> {selectedItem.status}</p>
                    <p className ="text-black"><strong>Available Date:</strong> {selectedItem.available_date}</p>
                    <p className ="text-black"><strong>Return Date:</strong> {selectedItem.return_date}</p>
                    <p className ="text-black"><strong>Notes:</strong> {selectedItem.notes}</p>
                </div>
            </>
        )}
    </section>
  );
}