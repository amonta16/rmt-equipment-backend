import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

function ScanTab({ renters = [] }) {
  const scannerRef = useRef(null);
  const scannerStartedRef = useRef(false);
  const [scannedItem, setScannedItem] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

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
          let id;
          try {
            // Try converting scanned text to BigInt
            id = BigInt(decodedText);
          } catch (e) {
            console.error('Scanned QR code is not a valid bigint:', decodedText);
            setErrorMsg('Invalid QR code scanned, not a valid equipment ID.');
            // Restart scanner for retry
            scannerStartedRef.current = true;
            return;
          }

          setErrorMsg(''); // clear error if any

          const { data, error } = await supabase
            .from('equipment')
            .select('*')
            .eq('id', id.toString()) // send string representation of bigint
            .single();

          if (error || !data) {
            console.error('Error fetching equipment:', error);
            setErrorMsg(`Equipment not found. Decoded QR: ${decodedText}`);
            // Restart scanner for retry
            scannerStartedRef.current = true;
            return;
          }

          setScannedItem(data);
          // Stop scanner now that we have a result
          scanner.stop().then(() => scanner.clear());
        },
        (scanError) => {
          // Optionally log scan errors (like decode failures)
          // console.warn('Scan error:', scanError);
        }
      )
      .then(() => {
        scannerStartedRef.current = true;
      })
      .catch((startErr) => {
        console.error('QR scanner failed to start:', startErr);
        setErrorMsg('Failed to start camera for scanning.');
      });

    return () => {
      if (scannerStartedRef.current && scannerRef.current) {
        scannerRef.current
          .stop()
          .then(() => scannerRef.current.clear())
          .catch((stopErr) => {
            console.warn('Scanner already stopped:', stopErr.message);
          });
      }
    };
  }, []);

  return (
    <div className="relative h-screen flex flex-col items-center justify-center bg-black p-4">
      <div id="reader" className="w-full max-w-md mx-auto rounded-md overflow-hidden" />

      {/* Scan Box Overlay */}
      <div className="absolute border-4 border-white rounded-xl w-60 h-60 pointer-events-none" />

      {/* Error message */}
      {errorMsg && (
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-red-600 text-white p-2 rounded z-50">
          {errorMsg}
        </div>
      )}

      {/* Scanned Item Modal */}
      {scannedItem && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40"></div>
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          bg-white border border-black p-6 rounded-xl shadow-xl z-50 w-11/12 max-w-md"
          >
            <button
              className="absolute top-2 right-2 w-6 h-6 p-0 text-lg bg-black text-white rounded-full flex items-center justify-center leading-none"
              onClick={() => {
                setScannedItem(null);
                setErrorMsg('');
                // Restart scanner when modal closes
                scannerRef.current
                  .start({ facingMode: 'environment' }, { fps: 10, qrbox: 250 }, async (decodedText) => {
                    let id;
                    try {
                      id = BigInt(decodedText);
                    } catch {
                      setErrorMsg('Invalid QR code scanned, not a valid equipment ID.');
                      return;
                    }
                    const { data, error } = await supabase
                      .from('equipment')
                      .select('*')
                      .eq('id', id.toString())
                      .single();
                    if (data) {
                      setScannedItem(data);
                      scannerRef.current.stop().then(() => scannerRef.current.clear());
                    } else {
                      setErrorMsg('Equipment not found.');
                    }
                  })
                  .then(() => {
                    scannerStartedRef.current = true;
                  })
                  .catch((err) => {
                    console.error('Failed to restart scanner:', err);
                    setErrorMsg('Failed to restart scanner.');
                  });
              }}
              aria-label="Close scanned item details"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-2 text-black">{scannedItem.name}</h3>
            <p className="text-black mb-1">
              <strong>Type:</strong> {scannedItem.type}
            </p>
            <p className="text-black mb-1">
              <strong>Status:</strong> {scannedItem.status}
            </p>
            <p className="text-black mb-1">
              <strong>Rented:</strong> {scannedItem.rented_date}
            </p>
            <p className="text-red-500 mb-1">
              <strong>Return:</strong> {scannedItem.return_date}
            </p>
            <p className="text-black mb-1">
              <strong>Renter:</strong> {(() => 
                {
                    const eqRenter = renters.find((renter) => renter.id === scannedItem.renter);
                    return eqRenter ? (
                    <span>
                        {eqRenter.name} - {eqRenter.id}
                    </span>
                    ) : (
                    <span>None</span>
                    );
                })()}
            </p>
            <p className ="text-black mb-1">
              <strong>Equipment ID:</strong> {scannedItem.id}
            </p>
            {scannedItem.notes && (
              <p className="text-black mt-2">
                <strong>Notes:</strong> {scannedItem.notes}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ScanTab;