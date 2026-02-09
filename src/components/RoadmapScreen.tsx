import { useState } from 'react';

type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4';
type Priority = 'high' | 'medium' | 'low';
type Status = 'planned' | 'in-progress' | 'completed' | 'on-hold';

interface Feature {
  id: string;
  title: string;
  description: string;
  quarter: Quarter;
  priority: Priority;
  status: Status;
  category: string;
  votes: number;
}

const RoadmapScreen = () => {
  const [selectedQuarter, setSelectedQuarter] = useState<Quarter | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<Status | 'all'>('all');

  const features: Feature[] = [
    {
      id: '1',
      title: 'AI-Powered Lead Scoring',
      description: 'Automatisk scoring af prospects baseret på adfærd og engagement',
      quarter: 'Q1',
      priority: 'high',
      status: 'in-progress',
      category: 'AI & Automation',
      votes: 127
    },
    {
      id: '2',
      title: 'Advanced Analytics Dashboard',
      description: 'Dybdegående analytics med custom rapporter og dashboards',
      quarter: 'Q1',
      priority: 'high',
      status: 'in-progress',
      category: 'Analytics',
      votes: 95
    },
    {
      id: '3',
      title: 'LinkedIn Integration',
      description: 'Direkte integration med LinkedIn Sales Navigator',
      quarter: 'Q2',
      priority: 'high',
      status: 'planned',
      category: 'Integrations',
      votes: 213
    },
    {
      id: '4',
      title: 'Email Automation',
      description: 'Automatiserede email campaigns og sequences',
      quarter: 'Q2',
      priority: 'medium',
      status: 'planned',
      category: 'Automation',
      votes: 156
    },
    {
      id: '5',
      title: 'Mobile App (iOS & Android)',
      description: 'Native mobile apps til on-the-go adgang',
      quarter: 'Q3',
      priority: 'high',
      status: 'planned',
      category: 'Platform',
      votes: 342
    },
    {
      id: '6',
      title: 'Video Meeting Integration',
      description: 'Integration med Zoom, Teams og Google Meet',
      quarter: 'Q2',
      priority: 'medium',
      status: 'planned',
      category: 'Integrations',
      votes: 78
    },
    {
      id: '7',
      title: 'Custom Workflows',
      description: 'Byg dine egne automatiserede workflows',
      quarter: 'Q3',
      priority: 'medium',
      status: 'planned',
      category: 'Automation',
      votes: 189
    },
    {
      id: '8',
      title: 'White-Label Solution',
      description: 'Mulighed for at white-label platformen til dine kunder',
      quarter: 'Q4',
      priority: 'low',
      status: 'planned',
      category: 'Enterprise',
      votes: 64
    },
    {
      id: '9',
      title: 'Multi-Language Support',
      description: 'Support for flere sprog i platformen',
      quarter: 'Q3',
      priority: 'medium',
      status: 'planned',
      category: 'Platform',
      votes: 112
    },
    {
      id: '10',
      title: 'Advanced Team Collaboration',
      description: 'Team workspaces, shared notes og collaboration tools',
      quarter: 'Q4',
      priority: 'medium',
      status: 'planned',
      category: 'Collaboration',
      votes: 145
    }
  ];

  const filteredFeatures = features.filter(feature => {
    if (selectedQuarter !== 'all' && feature.quarter !== selectedQuarter) return false;
    if (selectedStatus !== 'all' && feature.status !== selectedStatus) return false;
    return true;
  });

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'planned': return 'bg-gray-100 text-gray-700';
      case 'on-hold': return 'bg-orange-100 text-orange-700';
    }
  };

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '🔄';
      case 'planned': return '📋';
      case 'on-hold': return '⏸️';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Produkt Roadmap 2025</h1>
        <p className="text-gray-600">Se hvad vi arbejder på og stem på features du vil have</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedQuarter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedQuarter === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Alle Kvartaler
          </button>
          {(['Q1', 'Q2', 'Q3', 'Q4'] as Quarter[]).map((quarter) => (
            <button
              key={quarter}
              onClick={() => setSelectedQuarter(quarter)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedQuarter === quarter
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {quarter} 2025
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedStatus === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Alle Status
          </button>
          <button
            onClick={() => setSelectedStatus('completed')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedStatus === 'completed'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            ✅ Completed
          </button>
          <button
            onClick={() => setSelectedStatus('in-progress')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedStatus === 'in-progress'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            🔄 In Progress
          </button>
          <button
            onClick={() => setSelectedStatus('planned')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedStatus === 'planned'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            📋 Planned
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="text-sm text-gray-600 mb-1">Total Features</div>
          <div className="text-3xl font-bold text-gray-900">{features.length}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="text-sm text-gray-600 mb-1">In Progress</div>
          <div className="text-3xl font-bold text-blue-600">
            {features.filter(f => f.status === 'in-progress').length}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="text-sm text-gray-600 mb-1">Completed</div>
          <div className="text-3xl font-bold text-green-600">
            {features.filter(f => f.status === 'completed').length}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="text-sm text-gray-600 mb-1">Total Votes</div>
          <div className="text-3xl font-bold text-purple-600">
            {features.reduce((sum, f) => sum + f.votes, 0)}
          </div>
        </div>
      </div>

      {/* Feature List */}
      <div className="space-y-4">
        {filteredFeatures.map((feature) => (
          <div 
            key={feature.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{getStatusIcon(feature.status)}</span>
                  <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(feature.priority)}`}>
                    {feature.priority.toUpperCase()}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{feature.description}</p>
                
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(feature.status)}`}>
                    {feature.status === 'in-progress' && 'In Progress'}
                    {feature.status === 'planned' && 'Planned'}
                    {feature.status === 'completed' && 'Completed'}
                    {feature.status === 'on-hold' && 'On Hold'}
                  </span>
                  <span className="text-sm text-gray-600">
                    📅 {feature.quarter} 2025
                  </span>
                  <span className="text-sm text-gray-600">
                    🏷️ {feature.category}
                  </span>
                </div>
              </div>

              <div className="ml-6 flex flex-col items-center">
                <button className="flex flex-col items-center px-4 py-2 rounded-lg border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-colors group">
                  <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">👍</span>
                  <span className="text-sm font-semibold text-gray-700">{feature.votes}</span>
                </button>
                <span className="text-xs text-gray-500 mt-2">votes</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFeatures.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-500 text-lg">Ingen features matcher dine filtre</p>
        </div>
      )}

      {/* Submit Idea */}
      <div className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-8 text-white">
        <h3 className="text-2xl font-bold mb-2">Har du en idé til en ny feature?</h3>
        <p className="mb-4">Vi vil gerne høre fra dig! Del dine forslag og stem på features du vil have.</p>
        <button className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:shadow-lg transition-shadow">
          💡 Submit Feature Request
        </button>
      </div>
    </div>
  );
};

export default RoadmapScreen;
