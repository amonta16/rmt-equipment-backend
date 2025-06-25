import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

function ScanTab() {
  const scannerRef = useRef(null);
  const scannerStartedRef = useRef(false);
  const [scannedItem, setScannedItem] = useState(null);

  useEffect(() => {
    const scanner = new Html5Qrcode('reader');
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 250 },
        async (decodedText) => {
          if (!scannerStartedRef.current) return;

          scannerStartedRef.current = false;

          // Fetch from Supabase
          const { data, error } = await supabase
            .from('equipment')
            .select('*')
            .eq('id', decodedText)
            .single();

          if (error || !data) {
            console.error('Equipment not found:', error);
            return;
          }

          setScannedItem(data);
          scanner.stop().then(() => scanner.clear());
        },
        (error) => {
          // console.log('Scan error', error);
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
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center bg-black">
      {/* QR Scanner Camera Feed */}
      <div id="reader" className="w-full max-w-md mx-auto" />

      {/* Scan Box Overlay */}
      <div className="absolute border-4 border-white rounded-xl w-60 h-60 pointer-events-none" />

      {/* Scanned Item Overlay */}
      {scannedItem && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40"></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          bg-white border border-black p-6 rounded-xl shadow-xl z-50 w-11/12 max-w-md">
            <button
              className="absolute top-2 right-2 w-4 h-4 p-0 text-[10px] overflow-hidden bg-black text-white rounded-full flex items-center justify-center leading-none"
              onClick={() => {
                setScannedItem(null);
                // Restart scanner after closing modal
                scannerRef.current
                  .start({ facingMode: 'environment' }, { fps: 10, qrbox: 250 }, async (decodedText) => {
                    const { data, error } = await supabase
                      .from('equipment')
                      .select('*')
                      .eq('id', decodedText)
                      .single();
                    if (data) {
                      setScannedItem(data);
                      scannerRef.current.stop().then(() => scannerRef.current.clear());
                    }
                  })
                  .then(() => {
                    scannerStartedRef.current = true;
                  })
                  .catch((err) => {
                    console.error('Failed to restart scanner:', err);
                  });
              }}
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-2 text-black">{scannedItem.name}</h3>
            <p className="text-black mb-1"><strong>Type:</strong> {scannedItem.type}</p>
            <p className="text-black mb-1"><strong>Status:</strong> {scannedItem.status}</p>
            <p className="text-black mb-1"><strong>Available:</strong> {scannedItem.available_date}</p>
            <p className="text-red-500 mb-1"><strong>Return:</strong> {scannedItem.return_date}</p>
            {scannedItem.notes && (
              <p className="text-black mt-2"><strong>Notes:</strong> {scannedItem.notes}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ScanTab;