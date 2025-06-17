import React, { useState, useEffect } from 'react';

export default function Rentals({ rentals }) {
  if (!rentals || rentals.length === 0) {
    return <p>No active rentals.</p>;
  }

  const sortedRentals = [...rentals].sort((a, b) => {
    const dateA = new Date(a.return_date);
    const dateB = new Date(b.return_date);
    return dateA - dateB; // earliest date first
  });

  const [selectedRental, setSelectedRental] = useState(null);

  return (
    <section className="relative bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl text-black font-semibold mb-4">Current Rentals</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-green-700">
            <th className="border border-gray-300 p-2 text-left">Equipment</th>
            <th className="border border-gray-300 p-2 text-left">Type</th>
            <th className="border border-gray-300 p-2 text-left">Renter</th>
            <th className="border border-gray-300 p-2 text-left">Due Date</th>
          </tr>
        </thead>
        <tbody>
            {sortedRentals.map((item) => (
                <tr 
                    key={item.id} 
                    className="hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md cursor-default transition-transform"
                    onClick={() => setSelectedRental(item)}
                >
                    <td className="text-black py-2 px-4 border border-gray-300">{item.name || 'Unknown'}</td>
                    <td className="text-black py-2 px-4 border border-gray-300 font-bold">{item.type || 'Unknown'}</td>
                    <td className="text-black py-2 px-4 border border-gray-300">{'Unknown'}</td>
                    <td className="py-2 px-4 border border-gray-300 text-red-600 font-semibold">
                        {item.return_date
                            ? new Date(item.return_date).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })
                        : 'Unknown'}
                    </td>
                </tr>
            ))}
            {rentals.length === 0 && (
                <tr>
                    <td colSpan="3" className="py-4 px-4 text-center text-gray-500">
                        No rentals found.
                    </td>
                </tr>
            )}
        </tbody>
      </table>
        {selectedRental && (
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white border border-black p-4 rounded-xl shadow-xl z-30 w-[90%] max-w-md">
            <h3 className="text-lg text-black font-bold mb-2">Rental Details</h3>
            <p className ="text-black"><strong>Name:</strong> {selectedRental.name}</p>
            <p className ="text-black"><strong>Renter:</strong> {selectedRental.renter}</p>
            <p className ="text-black"><strong>Status:</strong> {selectedRental.status}</p>
            <p className ="text-black"><strong>Available Date:</strong> {selectedRental.available_date}</p>
            <p className ="text-red-500"><strong>Return Date:</strong> {selectedRental.return_date}</p>
            <p className ="text-black"><strong>Notes:</strong> {selectedRental.notes}</p>
            <button
                className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => setSelectedRental(null)}
            >
                Close
            </button>
            </div>
        )}
    </section>
  );
}