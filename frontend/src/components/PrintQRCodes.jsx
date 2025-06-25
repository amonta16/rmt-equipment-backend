import React from 'react';
import PrintableQR from './PrintableQR';

export default function PrintQRCodes( {equipmentList} ) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {equipmentList.map((item) => (
        <div key={item.id} className="p-4 bg-white rounded shadow text-center">
          <h2 className="text-xl font-semibold">{item.name}</h2>
          <p className="text-sm text-gray-600">ID: {item.id}</p>

          {/* Print QR button */}
          <PrintableQR id={item.id} name={item.name} />
        </div>
      ))}
    </div>
  );
}
