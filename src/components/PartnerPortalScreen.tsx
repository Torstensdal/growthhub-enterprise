import { useState } from 'react';
import type { Partner } from '../types';
import apiClient from '../services/apiClient';

export default function PartnerPortalScreen() {
  const [partners] = useState<Partner[]>([]);
  const [filterType, setFilterType] = useState<'all' | Partner['type']>('all');

  const filteredPartners = filterType === 'all' 
    ? partners 
    : partners.filter(p => p.type === filterType);

  const stats = {
    total: partners.length,
    active: partners.filter(p => p.status === 'active').length,
    pending: partners.filter(p => p.status === 'pending').length,
    totalRevenue: partners.reduce((sum, p) => sum + (p.revenue || 0), 0),
    totalReferrals: partners.reduce((sum, p) => sum + (p.referrals || 0), 0),
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Stats Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="grid grid-cols-5 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
            <p className="text-sm text-blue-600 font-medium mb-1">Total Partnere</p>
            <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
            <p className="text-sm text-green-600 font-medium mb-1">Aktive</p>
            <p className="text-3xl font-bold text-green-900">{stats.active}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4">
            <p className="text-sm text-yellow-600 font-medium mb-1">Afventende</p>
            <p className="text-3xl font-bold text-yellow-900">{stats.pending}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
            <p className="text-sm text-purple-600 font-medium mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-purple-900">${stats.totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
            <p className="text-sm text-orange-600 font-medium mb-1">Referrals</p>
            <p className="text-3xl font-bold text-orange-900">{stats.totalReferrals}</p>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filterType === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Alle
          </button>
          {(['referral', 'reseller', 'integration', 'affiliate'] as const).map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
                filterType === type ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {filteredPartners.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-6xl mb-4">🤝</p>
            <p className="text-xl text-gray-600">Ingen partnere endnu</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPartners.map(partner => (
              <div key={partner.id} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-bold text-lg mb-2">{partner.name}</h3>
                <p className="text-gray-600">{partner.company}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
