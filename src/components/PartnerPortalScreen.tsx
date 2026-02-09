import { useState } from 'react';
import type { Partner } from '../types';
import apiClient from '../services/apiClient';

export default function PartnerPortalScreen() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isAddingPartner, setIsAddingPartner] = useState(false);
  const [filterType, setFilterType] = useState<'all' | Partner['type']>('all');
  const [newPartner, setNewPartner] = useState<Partial<Partner>>({
    name: '',
    company: '',
    email: '',
    type: 'referral',
    status: 'pending',
  });

  const handleAddPartner = async () => {
    if (!newPartner.name || !newPartner.email || !newPartner.company) {
      alert('Navn, email og virksomhed er påkrævet');
      return;
    }

    const response = await apiClient.createPartner({
      name: newPartner.name,
      company: newPartner.company,
      email: newPartner.email,
      phone: newPartner.phone,
      type: newPartner.type || 'referral',
      status: 'pending',
      commission: newPartner.commission || 10,
      joinedAt: new Date().toISOString(),
    } as Omit<Partner, 'id'>);

    if (response.success && response.data) {
      setPartners([...partners, response.data]);
      setNewPartner({ name: '', company: '', email: '', type: 'referral', status: 'pending' });
      setIsAddingPartner(false);
    } else {
      alert('Kunne ikke tilføje partner: ' + response.error);
    }
  };

  const handleApprovePartner = async (partnerId: string) => {
    const response = await apiClient.updatePartner(partnerId, { status: 'active' });
    
    if (response.success && response.data) {
      setPartners(partners.map(p => p.id === partnerId ? response.data! : p));
      if (selectedPartner?.id === partnerId) {
        setSelectedPartner(response.data);
      }
    }
  };

  const getTypeIcon = (type: Partner['type']) => {
    const icons = {
      referral: '🤝',
      reseller: '🏢',
      integration: '🔌',
      affiliate: '💰',
    };
    return icons[type];
  };

  const getTypeColor = (type: Partner['type']) => {
    const colors = {
      referral: 'bg-blue-100 text-blue-800',
      reseller: 'bg-purple-100 text-purple-800',
      integration: 'bg-green-100 text-green-800',
      affiliate: 'bg-orange-100 text-orange-800',
    };
    return colors[type];
  };

  const getStatusColor = (status: Partner['status']) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
    };
    return colors[status];
  };

  const getStatusLabel = (status: Partner['status']) => {
    const labels = {
      active: 'Aktiv',
      inactive: 'Inaktiv',
      pending: 'Afventer',
    };
    return labels[status];
  };

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

      {/* Filter and Add Button */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                filterType === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Alle
            </button>
            <button
              onClick={() => setFilterType('referral')}
              className={`px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                filterType === 'referral'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🤝 Referral
            </button>
            <button
              onClick={() => setFilterType('reseller')}
              className={`px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                filterType === 'reseller'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🏢 Reseller
            </button>
            <button
              onClick={() => setFilterType('integration')}
              className={`px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                filterType === 'integration'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🔌 Integration
            </button>
            <button
              onClick={() => setFilterType('affiliate')}
              className={`px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                filterType === 'affiliate'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              💰 Affiliate
            </button>
          </div>
          <button
            onClick={() => setIsAddingPartner(true)}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            + Tilføj Partner
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {isAddingPartner ? (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6">Tilføj Ny Partner</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Navn *</label>
                  <input
                    type="text"
                    value={newPartner.name || ''}
                    onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Virksomhed *</label>
                  <input
                    type="text"
                    value={newPartner.company || ''}
                    onChange={(e) => setNewPartner({ ...newPartner, company: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Acme Corp"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={newPartner.email || ''}
                    onChange={(e) => setNewPartner({ ...newPartner, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="john@acme.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                  <input
                    type="tel"
                    value={newPartner.phone || ''}
                    onChange={(e) => setNewPartner({ ...newPartner, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="+45 12 34 56 78"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Partner Type</label>
                <div className="grid grid-cols-4 gap-3">
                  {(['referral', 'reseller', 'integration', 'affiliate'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setNewPartner({ ...newPartner, type })}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        newPartner.type === type
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{getTypeIcon(type)}</div>
                      <div className="text-xs font-medium capitalize">{type}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kommission (%)
                </label>
                <input
                  type="number"
                  value={newPartner.commission || 10}
                  onChange={(e) => setNewPartner({ ...newPartner, commission: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Noter</label>
                <textarea
                  value={newPartner.notes || ''}
                  onChange={(e) => setNewPartner({ ...newPartner, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Ekstra information om partneren..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleAddPartner}
                  className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Gem Partner
                </button>
                <button
                  onClick={() => {
                    setIsAddingPartner(false);
                    setNewPartner({ name: '', company: '', email: '', type: 'referral', status: 'pending' });
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Annuller
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPartners.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <p className="text-6xl mb-4">🤝</p>
                <p className="text-xl text-gray-600 mb-2">
                  {filterType === 'all' ? 'Ingen partnere endnu' : `Ingen ${filterType} partnere`}
                </p>
                <p className="text-gray-500 mb-4">Tilføj din første partner for at komme i gang</p>
                <button
                  onClick={() => setIsAddingPartner(true)}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  + Tilføj Partner
                </button>
              </div>
            ) : (
              filteredPartners.map((partner) => (
                <div
                  key={partner.id}
                  onClick={() => setSelectedPartner(partner)}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:border-purple-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{partner.name}</h3>
                      <p className="text-sm text-gray-600">{partner.company}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(partner.status)}`}>
                      {getStatusLabel(partner.status)}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(partner.type)}`}>
                        {getTypeIcon(partner.type)} {partner.type}
                      </span>
                      <span className="text-sm text-gray-600">
                        {partner.commission}% kommission
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">📧 {partner.email}</p>
                    {partner.phone && (
                      <p className="text-sm text-gray-600">📞 {partner.phone}</p>
                    )}
                  </div>

                  {(partner.revenue || partner.referrals) && (
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Revenue</p>
                        <p className="text-lg font-bold text-gray-900">
                          ${(partner.revenue || 0).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Referrals</p>
                        <p className="text-lg font-bold text-gray-900">{partner.referrals || 0}</p>
                      </div>
                    </div>
                  )}

                  {partner.status === 'pending' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApprovePartner(partner.id);
                      }}
                      className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      ✓ Godkend Partner
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
