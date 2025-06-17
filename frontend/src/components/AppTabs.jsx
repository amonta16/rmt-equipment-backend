import React, { useState } from 'react';
import EquipmentList from './EquipmentList';
import AddEquipmentForm from './AddEquipmentForm';
import DeleteEquipmentForm from './DeleteEquipmentForm';
import Search from './Search';
import Rentals from './Rentals';

export default function AppTabs({ equipment, onReload }) {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const tabs = [
    { label: 'Dashboard', key: 'Dashboard' },
    { label: 'Manage Equipment', key: 'Manage' },
    { label: 'Search', key: 'Search' },
    { label: 'Rentals', key: 'Rentals' },
    { label: 'Renters', key: 'Renters' },
    { label: 'Scan QR', key: 'Scan' },
  ];
  
  const rentals = equipment.filter((item) => item.status !== 'Available');

  return (
    <div>
      {/* Tab Navigation */}
      <div className="overflow-x-auto no-scrollbar p-1">
        <div className="flex gap-4 mb-6 border-b border-gray-300">
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
          <AddEquipmentForm onAdd={onReload} />
          <DeleteEquipmentForm onDelete={onReload} />
        </section>
      )}

      {activeTab === 'Search' && <Search equipment={equipment} />}

      {activeTab === 'Rentals' && <Rentals rentals={rentals} />}

    </div>
  );
}