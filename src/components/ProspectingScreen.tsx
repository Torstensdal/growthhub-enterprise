import { useState } from 'react';
import type { Prospect, Proposal } from '../types';
import apiClient from '../services/apiClient';

export default function ProspectingScreen() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [isAddingProspect, setIsAddingProspect] = useState(false);
  const [isGeneratingProposal, setIsGeneratingProposal] = useState(false);
  const [newProspect, setNewProspect] = useState<Partial<Prospect>>({
    name: '',
    company: '',
    status: 'researching',
  });

  const handleAddProspect = async () => {
    if (!newProspect.name || !newProspect.company) {
      alert('Navn og virksomhed er påkrævet');
      return;
    }

    const response = await apiClient.createProspect({
      name: newProspect.name,
      company: newProspect.company,
      industry: newProspect.industry,
      contact: newProspect.contact || {},
      status: newProspect.status || 'researching',
      painPoints: newProspect.painPoints || [],
      notes: newProspect.notes,
    } as Omit<Prospect, 'id'>);

    if (response.success && response.data) {
      setProspects([...prospects, response.data]);
      setNewProspect({ name: '', company: '', status: 'researching' });
      setIsAddingProspect(false);
    } else {
      alert('Kunne ikke tilføje prospect: ' + response.error);
    }
  };

  const handleGenerateProposal = async () => {
    if (!selectedProspect) return;

    setIsGeneratingProposal(true);
    const requirements = `Generer et forslag til ${selectedProspect.company}. 
    Pain points: ${selectedProspect.painPoints?.join(', ') || 'Ikke angivet'}
    Budget: ${selectedProspect.budget || 'Ikke angivet'}
    Timeline: ${selectedProspect.timeline || 'Ikke angivet'}`;

    const response = await apiClient.generateProposal(selectedProspect.id, requirements);
    
    setIsGeneratingProposal(false);
    
    if (response.success && response.data) {
      alert('Forslag genereret succesfuldt!');
      // Update prospect with proposal
      setSelectedProspect({
        ...selectedProspect,
        proposalId: response.data.id,
        status: 'proposal',
      });
    } else {
      alert('Kunne ikke generere forslag: ' + response.error);
    }
  };

  const getStatusColor = (status: Prospect['status']) => {
    const colors = {
      researching: 'bg-gray-100 text-gray-800',
      contacted: 'bg-blue-100 text-blue-800',
      qualified: 'bg-purple-100 text-purple-800',
      proposal: 'bg-yellow-100 text-yellow-800',
      negotiation: 'bg-orange-100 text-orange-800',
      won: 'bg-green-100 text-green-800',
      lost: 'bg-red-100 text-red-800',
    };
    return colors[status] || colors.researching;
  };

  const getStatusLabel = (status: Prospect['status']) => {
    const labels = {
      researching: 'Research',
      contacted: 'Kontaktet',
      qualified: 'Kvalificeret',
      proposal: 'Forslag',
      negotiation: 'Forhandling',
      won: 'Vundet',
      lost: 'Tabt',
    };
    return labels[status] || status;
  };

  return (
    <div className="h-full flex">
      {/* Prospect List */}
      <div className="w-1/3 border-r border-gray-200 bg-white overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Prospects</h2>
            <button
              onClick={() => setIsAddingProspect(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
            >
              + Tilføj Prospect
            </button>
          </div>
          <input
            type="text"
            placeholder="Søg prospects..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="divide-y divide-gray-200">
          {prospects.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg mb-2">Ingen prospects endnu</p>
              <p className="text-sm">Klik "Tilføj Prospect" for at komme i gang</p>
            </div>
          ) : (
            prospects.map((prospect) => (
              <div
                key={prospect.id}
                onClick={() => setSelectedProspect(prospect)}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedProspect?.id === prospect.id ? 'bg-purple-50 border-l-4 border-purple-600' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{prospect.name}</h3>
                    <p className="text-sm text-gray-600">{prospect.company}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(prospect.status)}`}>
                    {getStatusLabel(prospect.status)}
                  </span>
                </div>
                {prospect.score && (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${prospect.score}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600">{prospect.score}%</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Prospect Details */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {isAddingProspect ? (
          <div className="p-8">
            <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Tilføj Ny Prospect</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Navn *</label>
                  <input
                    type="text"
                    value={newProspect.name || ''}
                    onChange={(e) => setNewProspect({ ...newProspect, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Virksomhed *</label>
                  <input
                    type="text"
                    value={newProspect.company || ''}
                    onChange={(e) => setNewProspect({ ...newProspect, company: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Acme Corp"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Industri</label>
                  <input
                    type="text"
                    value={newProspect.industry || ''}
                    onChange={(e) => setNewProspect({ ...newProspect, industry: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="SaaS, E-commerce, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newProspect.contact?.email || ''}
                    onChange={(e) => setNewProspect({ 
                      ...newProspect, 
                      contact: { ...newProspect.contact, email: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="john@acme.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Noter</label>
                  <textarea
                    value={newProspect.notes || ''}
                    onChange={(e) => setNewProspect({ ...newProspect, notes: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Vigtige detaljer om denne prospect..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleAddProspect}
                    className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    Gem Prospect
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingProspect(false);
                      setNewProspect({ name: '', company: '', status: 'researching' });
                    }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Annuller
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : selectedProspect ? (
          <div className="p-8">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedProspect.name}</h2>
                  <p className="text-lg text-gray-600">{selectedProspect.company}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedProspect.status)}`}>
                  {getStatusLabel(selectedProspect.status)}
                </span>
              </div>

              {selectedProspect.score && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Prospect Score</span>
                    <span className="text-sm font-bold text-purple-600">{selectedProspect.score}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all"
                      style={{ width: `${selectedProspect.score}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-6">
                {selectedProspect.industry && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Industri</p>
                    <p className="font-medium">{selectedProspect.industry}</p>
                  </div>
                )}
                {selectedProspect.budget && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Budget</p>
                    <p className="font-medium">{selectedProspect.budget}</p>
                  </div>
                )}
                {selectedProspect.timeline && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Timeline</p>
                    <p className="font-medium">{selectedProspect.timeline}</p>
                  </div>
                )}
                {selectedProspect.contact?.email && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="font-medium">{selectedProspect.contact.email}</p>
                  </div>
                )}
              </div>

              {selectedProspect.painPoints && selectedProspect.painPoints.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-2">Pain Points</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProspect.painPoints.map((point, index) => (
                      <span key={index} className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm">
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedProspect.notes && (
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-2">Noter</p>
                  <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{selectedProspect.notes}</p>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleGenerateProposal}
                  disabled={isGeneratingProposal}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGeneratingProposal ? '🤖 Genererer...' : '✨ Generer AI Forslag'}
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  📧 Send Email
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  📞 Log Opkald
                </button>
              </div>
            </div>

            {selectedProspect.activities && selectedProspect.activities.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4">Aktivitetshistorik</h3>
                <div className="space-y-4">
                  {selectedProspect.activities.map((activity) => (
                    <div key={activity.id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                      <div className="text-2xl">
                        {activity.type === 'call' && '📞'}
                        {activity.type === 'email' && '📧'}
                        {activity.type === 'meeting' && '🤝'}
                        {activity.type === 'note' && '📝'}
                        {activity.type === 'proposal' && '📄'}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.description}</p>
                        <p className="text-sm text-gray-600 mt-1">{new Date(activity.date).toLocaleDateString('da-DK')}</p>
                        {activity.outcome && (
                          <p className="text-sm text-gray-700 mt-2 bg-gray-50 p-2 rounded">{activity.outcome}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <p className="text-6xl mb-4">🎯</p>
              <p className="text-xl mb-2">Vælg en prospect</p>
              <p className="text-sm">eller tilføj en ny for at komme i gang</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
