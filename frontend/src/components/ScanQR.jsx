import React, { useState } from 'react';
import { QrReader } from '@blackbox-vision/react-qr-reader';

function ScanQR({ onScanResult }) {
  const [scanned, setScanned] = useState(false);

  const handleResult = (result) => {
    if (result && !scanned) {
      setScanned(true);
      onScanResult(result?.text);
    }
  };

  return (
    <div className="relative h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md">
        <QrReader
          constraints={{ facingMode: 'environment' }}
          onResult={(result) => handleResult(result)}
          videoStyle={{ width: '100%' }}
        />
      </div>

      {/* Overlay box */}
      <div className="absolute border-4 border-white rounded-xl w-60 h-60 pointer-events-none" />

      {/* Reset scan (optional) */}
      {scanned && (
        <button
          onClick={() => setScanned(false)}
          className="absolute bottom-10 bg-white text-black px-4 py-2 rounded"
        >
          Scan Again
        </button>
      )}
    </div>
  );
}

export default ScanQR;