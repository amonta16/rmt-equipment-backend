import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export default function PrintableQR({ id, name }) {
  const canvasRef = useRef();

  const handlePrint = () => {
    const canvas = canvasRef.current.querySelector('canvas');
    const dataUrl = canvas.toDataURL();

    const printWindow = window.open('', '', 'width=600,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>${name} QR</title>
          <style>
            body { font-family: sans-serif; text-align: center; padding: 20px; }
            img { margin-top: 20px; }
          </style>
        </head>
        <body>
          <h1>${name}</h1>
          <img src="${dataUrl}" />
          <p>ID: ${id}</p>
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() { window.close(); };
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="text-center">
      <div ref={canvasRef} className="hidden">
        <QRCodeCanvas value={item.id.toString()} size={128} />
      </div>
      <button
        onClick={handlePrint}
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Print QR for {name}
      </button>
    </div>
  );
}