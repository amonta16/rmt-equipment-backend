import React, { useState, useEffect } from 'react';

export default function Renters({ renters }) {
  if (!renters || renters.length === 0) {
    return <p>No active renters.</p>;
  }

  /*const sortedRentals = [...renters].sort((a, b) => {
    const dateA = new Date(a.return_date);
    const dateB = new Date(b.return_date);
    return dateA - dateB; // earliest date first
  });*/

  const [selectedRenter, setSelectedRenter] = useState(null);

  return (
    <section className="relative bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl text-black font-semibold mb-4">Current Renters</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
            <tr className="bg-green-700">
                <th className="border border-gray-300 p-2 text-left">Name</th>
                <th className="border border-gray-300 p-2 text-left">Rented Equipment</th>
                <th className="border border-gray-300 p-2 text-left">Email Address</th>
                <th className="border border-gray-300 p-2 text-left">Phone Number</th>
            </tr>
            </thead>
            <tbody>
                {renters.map((renter) => (
                    <tr 
                        key={renter.id} 
                        className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md cursor-default transition-transform"
                        onClick={() => setSelectedRenter(renter)}
                    >
                        <td className="text-black py-2 px-4 border border-gray-300">{renter.name || 'Unknown'}</td>
                        <td className="text-black py-2 px-4 border border-gray-300 font-bold">{renter.equipment || 'Unknown'}</td>
                        <td className="text-black py-2 px-4 border border-gray-300">{renter.email || 'Unknown'}</td>
                        <td className="text-black py-2 px-4 border border-gray-300">{renter.phone || 'Unknown'}</td>

                    </tr>
                ))}
                {renters.length === 0 && (
                    <tr>
                        <td colSpan="3" className="py-4 px-4 text-center text-gray-500">
                            No renters found.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
      </div>
        {selectedRenter && (
            <>
                <div className="fixed inset-0 bg-black/35 z-40"></div>
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        bg-white border border-black p-6 rounded-xl shadow-xl z-50 w-11/12 max-w-md">
                    <button
                        className="absolute top-2 right-2 w-4 h-4 p-0 text-[10px] overflow-hidden bg-black text-white rounded-full flex items-center justify-center leading-none"
                        onClick={() => setSelectedRenter(null)}
                    >
                        &times;
                    </button>
                    <h3 className="text-lg text-black font-bold mb-2">Renter Details</h3>
                    <p className ="text-black"><strong>Name:</strong> {selectedRenter.name}</p>
                    <p className ="text-black"><strong>Rented Equipment:</strong> {selectedRenter.equipment}</p>
                    <p className ="text-black"><strong>Email:</strong> {selectedRenter.email}</p>
                    <p className ="text-black"><strong>Phone Number:</strong> {selectedRenter.phone}</p>
                    <p className ="text-black"><strong>Renter ID:</strong> {selectedRenter.id}</p>
                    <p className ="text-black"><strong>Notes:</strong> {selectedRenter.notes}</p>
                    
                </div>
            </>
        )}
    </section>
  );

}