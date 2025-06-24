import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

function ScanTab({ onResult }) {
  const scannerRef = useRef(null);
  const scannerStartedRef = useRef(false);

  useEffect(() => {
    const scanner = new Html5Qrcode('reader');
    scannerRef.current = scanner;

    const config = { fps: 10, qrbox: 250 };

    scanner
      .start(
        { facingMode: 'environment' },
        config,
        (decodedText) => {
          if (!scannerStartedRef.current) return;
          onResult(decodedText);
          scanner.stop().then(() => scanner.clear());
          scannerStartedRef.current = false;
        },
        (error) => {
          // Optional scan errors (like decode failures)
        }
      )
      .then(() => {
        scannerStartedRef.current = true;
      })
      .catch((err) => {
        console.error('QR scanner failed to start:', err);
      });

    return () => {
      if (scannerStartedRef.current && scannerRef.current) {
        scannerRef.current
          .stop()
          .then(() => scannerRef.current.clear())
          .catch((err) => {
            console.warn('Scanner already stopped:', err.message);
          });
      }
    };
  }, [onResult]);

  return (
    <div className="relative h-screen flex items-center justify-center bg-black">
      {/* Camera feed container */}
      <div id="reader" className="w-full max-w-md mx-auto" />

      {/* Overlay scan box */}
      <div className="absolute border-4 border-white rounded-xl w-60 h-60 pointer-events-none" />
    </div>
  );
}

export default ScanTab;