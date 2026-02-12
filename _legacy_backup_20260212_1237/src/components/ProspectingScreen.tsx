import { useState } from 'react';
import type { Prospect } from '../types';

export default function ProspectingScreen() {
  const [prospects] = useState<Prospect[]>([]);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);

  const getStatusColor = (status: Prospect['status']) => {
    const colors: Record<Prospect['status'], string> = {
      new: 'bg-gray-100 text-gray-800',
      contacted: 'bg-blue-100 text-blue-800',
      qualified: 'bg-purple-100 text-purple-800',
      converted: 'bg-green-100 text-green-800',
      lost: 'bg-red-100 text-red-800',
    };
    return colors[status];
  };

  return (
    <div className="h-full flex">
      {/* Prospect List */}
      <div className="w-1/3 border-r border-gray-200 bg-white overflow-y-auto">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold mb-4">Prospects</h2>
          <input
            type="text"
            placeholder="Søg prospects..."
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {prospects.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p className="text-lg mb-2">Ingen prospects endnu</p>
          </div>
        ) : (
          <div className="divide-y">
            {prospects.map(prospect => (
              <div
                key={prospect.id}
                onClick={() => setSelectedProspect(prospect)}
                className={`p-4 cursor-pointer hover:bg-gray-50 ${
                  selectedProspect?.id === prospect.id ? 'bg-purple-50' : ''
                }`}
              >
                <h3 className="font-semibold">{prospect.name}</h3>
                <p className="text-sm text-gray-600">{prospect.company}</p>
                <span className={`inline-block mt-2 px-2 py-1 rounded text-xs ${getStatusColor(prospect.status)}`}>
                  {prospect.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Prospect Details */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {selectedProspect ? (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">{selectedProspect.name}</h2>
            <p className="text-lg text-gray-600 mb-4">{selectedProspect.company}</p>
            {selectedProspect.notes && (
              <p className="text-gray-700">{selectedProspect.notes}</p>
            )}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <p className="text-6xl mb-4">🎯</p>
              <p className="text-xl">Vælg en prospect</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
