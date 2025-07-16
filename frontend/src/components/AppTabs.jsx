import React, { useState } from 'react';
import EquipmentList from './EquipmentList';
import AddEquipmentForm from './AddEquipmentForm';
import DeleteEquipmentForm from './DeleteEquipmentForm';
import AddRenterForm from './AddRenterForm';
import DeleteRenterForm from './DeleteRenterForm';
import Search from './Search';
import Rentals from './Rentals';
import Renters from './Renters';
import ScanQR from './ScanQR';
import PrintQRCodes from './PrintQRCodes';

export default function AppTabs({ equipment, renters, onReload }) {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const tabs = [
    { label: 'Dashboard', key: 'Dashboard' },
    { label: 'Rent', key: 'Rent' },
    { label: 'Search', key: 'Search' },
    { label: 'Rentals', key: 'Rentals' },
    { label: 'Renters', key: 'Renters' },
    { label: 'Scan QR', key: 'Scan' },
    { label: 'Print QR Codes', key: 'Print' },
    { label: 'Manage', key: 'Manage' },
  ];
  
  const rentals = equipment.filter((item) => item.status !== 'Available');


  return (
    <div>
      {/* Tab Navigation */}
      <div className="overflow-x-auto no-scrollbar p-1 mb-6 border-b border-gray-300">
        <div className="flex gap-4">
            {tabs.map((tab) => (
            <button
                key={tab.key}
                className={`py-2 px-4 font-semibold rounded-t-md transition whitespace-nowrap ${
                activeTab === tab.key
                    ? 'bg-green-600 text-white'
                    : 'bg-green-300 text-black hover:bg-green-600 hover:text-white'
                }`}
                style={{ backgroundColor: activeTab === tab.key ? '#30d56c' : '#16a34a', color: activeTab === tab.key ? 'white' : 'black' }}
                onClick={() => setActiveTab(tab.key)}
            >
                {tab.label}
            </button>
            ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'Dashboard' && (
        <section className="bg-white p-6 rounded-2xl shadow-lg">
          <EquipmentList equipment={equipment} onDelete={onReload} />
        </section>
      )}

      {activeTab === 'Manage' && (
        <section className="bg-white p-6 rounded-2xl shadow-lg">
          <section>
            <AddEquipmentForm onAdd={onReload} />
            <DeleteEquipmentForm onDelete={onReload} />
          </section>
          <section className="py-16">
            <AddRenterForm onAdd={onReload} />
            <DeleteRenterForm onDelete={onReload} />
          </section>
        </section>
      )}

      {activeTab === 'Search' && <Search equipment={equipment} />}

      {activeTab === 'Rentals' && <Rentals rentals={rentals} />}

      {activeTab === 'Renters' && <Renters renters={renters} />}

      {activeTab === 'Scan' && (
        <ScanQR
          onResult={async (scannedId) => {
            const { data, error } = await supabase
              .from('equipment')
              .select('*')
              .eq('id', scannedId)
              .single();

            if (error || !data) {
              console.error('Equipment not found:', error);
              // Show message to user
              return;
            }

            // You now have the equipment data, show it
            console.log('Scanned equipment:', data);
            // Optionally navigate or update state
          }}
        />
      )}

      {activeTab === 'Print' && (
        <section className="bg-white p-6 rounded-2x1 shadow-lg">
          <PrintQRCodes equipmentList={equipment} />
        </section>
      )}

    </div>
  );
}