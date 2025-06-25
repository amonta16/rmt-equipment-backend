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
  const [debugLog, setDebugLog] = useState('');

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
          setDebugLog((log) => `Scanned: ${decodedText}\n\n` + log);

          const { data, error } = await supabase
            .from('equipment')
            .select('*')
            .eq('id', decodedText)
            .single();

          if (error || !data) {
            setDebugLog((log) =>
              `Error fetching equipment:\n${JSON.stringify(error, null, 2)}\n\n` + log
            );
            return;
          }

          setDebugLog((log) =>
            `Success:\n${JSON.stringify(data, null, 2)}\n\n` + log
          );

          setScannedItem(data);
          scanner.stop().then(() => scanner.clear());
        },
        (error) => {
          setDebugLog((log) => `Scan error: ${error}\n\n` + log);
        }
      )
      .then(() => {
        scannerStartedRef.current = true;
        setDebugLog((log) => 'Scanner started.\n\n' + log);
      })
      .catch((err) => {
        setDebugLog((log) => `Failed to start scanner:\n${err.message}\n\n` + log);
      });

    return () => {
      if (scannerStartedRef.current && scannerRef.current) {
        scannerRef.current
          .stop()
          .then(() => scannerRef.current.clear())
          .catch((err) => {
            setDebugLog((log) => `Cleanup warning:\n${err.message}\n\n` + log);
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
                scannerRef.current
                  .start(
                    { facingMode: 'environment' },
                    { fps: 10, qrbox: 250 },
                    async (decodedText) => {
                      const { data, error } = await supabase
                        .from('equipment')
                        .select('*')
                        .eq('id', decodedText)
                        .single();
                      if (data) {
                        setScannedItem(data);
                        setDebugLog((log) =>
                          `Success:\n${JSON.stringify(data, null, 2)}\n\n` + log
                        );
                        scannerRef.current.stop().then(() => scannerRef.current.clear());
                      } else {
                        setDebugLog((log) =>
                          `Rescan error:\n${JSON.stringify(error, null, 2)}\n\n` + log
                        );
                      }
                    }
                  )
                  .then(() => {
                    scannerStartedRef.current = true;
                    setDebugLog((log) => 'Scanner restarted.\n\n' + log);
                  })
                  .catch((err) => {
                    setDebugLog((log) => `Restart failed:\n${err.message}\n\n` + log);
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

      {/* On-screen Debug Log Viewer */}
      <pre className="fixed bottom-0 left-0 w-full max-h-40 overflow-y-auto bg-black text-green-400 text-xs p-2 z-[9999]">
        {debugLog}
      </pre>
    </div>
  );
}

export default ScanTab;