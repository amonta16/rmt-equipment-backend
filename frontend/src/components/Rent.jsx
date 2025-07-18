import React, { useState, useEffect } from 'react';
import { updateRenter } from '../api/renters';
import { updateEquipment } from '../api/equipment';

export default function Rent({ renters, equipment, onUpdate }) {
  const [searchRenterName, setSearchRenterName] = useState('');
  const [searchItemName, setSearchItemName] = useState('');

  const [selectedRenter, setSelectedRenter] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const [returnDate, setReturnDate] = useState('');
  const today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd
  
  // Filter equipment based on search and filters
  const filteredRenters = renters.filter((renter) => {
    // Filter by name (case insensitive)
    const nameMatch = renter.name.toLowerCase().includes(searchRenterName.toLowerCase());

    return nameMatch;
  });

  // Filter equipment based on search and filters
  const filteredEquipment = equipment.filter((item) => {
    // Filter by name (case insensitive)
    const nameMatch = item.name.toLowerCase().includes(searchItemName.toLowerCase());

    return nameMatch;
  });

  return (
    <section className="relative bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl text-black font-semibold mb-4">Renter</h2>

      <input
        type="text"
        placeholder="Search by name"
        value={searchRenterName}
        onChange={(e) => setSearchRenterName(e.target.value)}
        className="border border-black text-black p-2 rounded w-full mb-4"
      />

      <ul>
        {filteredRenters.map((renter) => (
            <li 
                key={renter.id} 
                className="border-b text-black py-2 px-2 transition-transform transform hover:-translate-y-1 hover:shadow cursor-default"
                onClick={() => setSelectedRenter(renter)}
            >
                {renter.name}
            </li>
        ))}
        {filteredRenters.length === 0 && <li>No matching renter found.</li>}
      </ul>

        {selectedRenter && (
            <>
                <div className="fixed inset-0 bg-black/35 z-40"></div>
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    bg-white border border-black p-6 rounded-xl shadow-xl z-50 w-11/12 max-w-md">
                    <button
                        className="absolute top-1 right-1 w-4 h-4 p-0 text-[10px] overflow-hidden bg-black text-white rounded-full flex items-center justify-center leading-none"
                        onClick={() => setSelectedRenter(null)}
                    >
                        &times;
                    </button>

                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchItemName}
                        onChange={(e) => setSearchItemName(e.target.value)}
                        className="border border-black text-black p-2 rounded w-full mt-2 mb-4"
                    />

                    <ul>
                        {filteredEquipment.map((item) => (
                            <li 
                                key={item.id} 
                                className="border-b text-black py-2 px-2 transition-transform transform hover:-translate-y-1 hover:shadow cursor-default"
                                onClick={() => setSelectedItem(item)}
                            >
                                {item.name}
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
                                <p className ="text-black"><strong>Equipment ID:</strong> {selectedItem.id}</p>
                                <p className ="text-black"><strong>Notes:</strong> {selectedItem.notes}</p>


                                <div className="mt-4 mb-4">
                                    <label className="block text-black font-medium mb-1">
                                        Choose Return Date:
                                    </label>
                                    <input
                                        type="date"
                                        className="border border-gray-400 rounded-xl p-2 text-black w-full"
                                        value={returnDate}
                                        min={today}
                                        onChange={(e) => setReturnDate(e.target.value)}
                                    />
                                </div>
                                <button
                                    className={`mt-4 py-3 px-6 rounded-xl font-bold transition-all w-full
                                    ${!returnDate
                                        ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                        : 'bg-green-600 hover:bg-green-700 text-white'}
                                    `}
                                    disabled={!returnDate}
                                    onClick={async () => {
                                    // update renter
                                    const updatedEquipmentIds = [
                                        ...selectedRenter.equipment,
                                        selectedItem.id,
                                    ];
                                    const updatedRenter = {
                                        ...selectedRenter,
                                        equipment: updatedEquipmentIds,
                                    };

                                    try {
                                        await updateRenter(updatedRenter);
                                    } catch (error) {
                                        console.error('Error updating renter:', error);
                                    }

                                    // update equipment with chosen date and current date
                                    const updatedItem = {
                                        ...selectedItem,
                                        status: 'Rented',
                                        renter: updatedRenter.id,
                                        rented_date: today,
                                        return_date: returnDate,
                                    };

                                    try {
                                        await updateEquipment(updatedItem);
                                        onUpdate();
                                        setSelectedItem(null);
                                        setSelectedRenter(null);
                                        setReturnDate('');
                                    } catch (error) {
                                        console.error('Error updating equipment:', error);
                                    }
                                    }}
                                >
                                    Rent
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </>
        )}
    </section>
  );
}