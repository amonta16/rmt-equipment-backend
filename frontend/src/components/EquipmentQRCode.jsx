import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import SingleQR from './SingleQR';

function EquipmentQRCode({ equipment }) {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `QR-${equipment.id}`,
  });

  return (
    <div className="p-4 border rounded shadow text-center">
      {/* Hidden render target for printing */}
      <div style={{ display: 'none' }}>
        <SingleQR ref={componentRef} equipment={equipment} />
      </div>

      {/* Displayed QR for screen */}
      <h3 className="text-lg font-semibold">{equipment.name}</h3>
      <SingleQR equipment={equipment} />

      <button
        onClick={handlePrint}
        className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Print this QR
      </button>
    </div>
  );
}

export default EquipmentQRCode;