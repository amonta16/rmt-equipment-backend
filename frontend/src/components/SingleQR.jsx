import React, { forwardRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const SingleQR = forwardRef(({ equipment }, ref) => {
  return (
    <div ref={ref} className="p-6 border rounded text-center">
      <h3 className="text-lg font-semibold">{equipment.name}</h3>
      <QRCodeCanvas value={equipment.id} size={128} />
      <p className="text-sm mt-2">ID: {equipment.id}</p>
    </div>
  );
});

export default SingleQR;