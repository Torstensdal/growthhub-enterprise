import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  formatCurrency, 
  formatNumber, 
  formatPercentage,
  formatGrowthRate 
} from '../utils/formatters';
import { formatRelativeTime } from '../utils/dateUtils';
import { Company, Prospect, Partner, SocialPost } from '../types';

interface DashboardMetrics {
  revenue: {
    current: number;
    previous: number;
    growth: number;
  };
  prospects: {
    total: number;
    qualified: number;
    conversion: number;
  };
  partners: {
    active: number;
    pending: number;
    totalRevenue: number;
  };
  social: {
    posts: number;
    engagement: number;
    reach: number;
  };
}

const DashboardScreen: React.FC = () => {
  const { t } = useLanguage();
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    revenue: { current: 450000, previous: 380000, growth: 18.4 },
    prospects: { total: 127, qualified: 45, conversion: 35.4 },
    partners: { active: 23, pending: 7, totalRevenue: 125000 },
    social: { posts: 48, engagement: 2847, reach: 45230 },
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: '1', type: 'prospect', action: 'Ny kvalificeret prospect: Acme Corp', time: new Date(Date.now() - 1800000) },
    { id: '2', type: 'partner', action: 'Partner godkendt: TechSolutions ApS', time: new Date(Date.now() - 3600000) },
    { id: '3', type: 'social', action: 'LinkedIn opslag publiceret: Q1 Results', time: new Date(Date.now() - 7200000) },
    { id: '4', type: 'revenue', action: 'Ny ordre modtaget: 45.000 kr', time: new Date(Date.now() - 10800000) },
  ]);

  const [topProspects, setTopProspects] = useState([
    { id: '1', name: 'Acme Corporation', value: 150000, probability: 75, status: 'negotiation' },
    { id: '2', name: 'Nordic Solutions', value: 95000, probability: 60, status: 'proposal' },
    { id: '3', name: 'Digital Dynamics', value: 78000, probability: 85, status: 'negotiation' },
    { id: '4', name: 'Future Tech AB', value: 62000, probability: 45, status: 'qualified' },
  ]);

  const [topPartners, setTopPartners] = useState([
    { id: '1', name: 'TechPartners A/S', revenue: 45000, referrals: 12 },
    { id: '2', name: 'Growth Solutions', revenue: 38000, referrals: 9 },
    { id: '3', name: 'Digital Hub', revenue: 25000, referrals: 7 },
  ]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'prospect':
        return '🎯';
      case 'partner':
        return '🤝';
      case 'social':
        return '📱';
      case 'revenue':
        return '💰';
      default:
        return '📊';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'negotiation':
        return 'bg-green-100 text-green-800';
      case 'proposal':
        return 'bg-blue-100 text-blue-800';
      case 'qualified':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'negotiation':
        return 'Forhandling';
      case 'proposal':
        return 'Tilbud';
      case 'qualified':
        return 'Kvalificeret';
      default:
        return status;
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Velkommen tilbage! Her er din oversigt.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Revenue Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <span className={`text-sm font-semibold px-2 py-1 rounded ${
              metrics.revenue.growth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {formatGrowthRate(metrics.revenue.current, metrics.revenue.previous)}
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Samlet Omsætning</h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(metrics.revenue.current)}</p>
          <p className="text-sm text-gray-500 mt-2">
            Fra {formatCurrency(metrics.revenue.previous)} sidste måned
          </p>
        </div>

        {/* Prospects Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <span className="text-sm font-semibold px-2 py-1 rounded bg-blue-100 text-blue-700">
              {formatPercentage(metrics.prospects.conversion)}
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Prospects</h3>
          <p className="text-2xl font-bold text-gray-900">{formatNumber(metrics.prospects.total)}</p>
          <p className="text-sm text-gray-500 mt-2">
            {metrics.prospects.qualified} kvalificerede
          </p>
        </div>

        {/* Partners Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🤝</span>
            </div>
            <span className="text-sm font-semibold px-2 py-1 rounded bg-purple-100 text-purple-700">
              {metrics.partners.pending} afventer
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Partnere</h3>
          <p className="text-2xl font-bold text-gray-900">{metrics.partners.active}</p>
          <p className="text-sm text-gray-500 mt-2">
            {formatCurrency(metrics.partners.totalRevenue)} i provision
          </p>
        </div>

        {/* Social Media Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📱</span>
            </div>
            <span className="text-sm font-semibold px-2 py-1 rounded bg-orange-100 text-orange-700">
              {formatPercentage(metrics.social.engagement / metrics.social.reach * 100)}
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Social Media</h3>
          <p className="text-2xl font-bold text-gray-900">{formatNumber(metrics.social.posts)}</p>
          <p className="text-sm text-gray-500 mt-2">
            {formatNumber(metrics.social.reach)} rækkevidde
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Seneste Aktivitet</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{getActivityIcon(activity.type)}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">{formatRelativeTime(activity.time)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-100">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Se alle aktiviteter →
            </button>
          </div>
        </div>

        {/* Top Prospects */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Top Prospects</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {topProspects.map((prospect) => (
              <div key={prospect.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{prospect.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded font-medium ${getStatusColor(prospect.status)}`}>
                    {getStatusLabel(prospect.status)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{formatCurrency(prospect.value)}</span>
                  <span className="text-gray-600">{prospect.probability}% sandsynlighed</span>
                </div>
                <div className="mt-2 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${prospect.probability}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-100">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Se alle prospects →
            </button>
          </div>
        </div>
      </div>

      {/* Top Partners */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Top Partnere</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Partner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Omsætning
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Henvisninger
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Handling
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {topPartners.map((partner) => (
                <tr key={partner.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
                        {partner.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{partner.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{formatCurrency(partner.revenue)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{partner.referrals} henvisninger</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      Se detaljer →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Se alle partnere →
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all text-left group">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-500 transition-colors">
            <span className="text-xl group-hover:scale-110 transition-transform">➕</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Ny Prospect</h3>
          <p className="text-sm text-gray-600">Tilføj en ny prospect til CRM</p>
        </button>

        <button className="p-4 bg-white rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all text-left group">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-500 transition-colors">
            <span className="text-xl group-hover:scale-110 transition-transform">🤝</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Ny Partner</h3>
          <p className="text-sm text-gray-600">Inviter en ny samarbejdspartner</p>
        </button>

        <button className="p-4 bg-white rounded-xl border border-gray-200 hover:border-purple-500 hover:shadow-md transition-all text-left group">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-500 transition-colors">
            <span className="text-xl group-hover:scale-110 transition-transform">📱</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Planlæg Opslag</h3>
          <p className="text-sm text-gray-600">Opret nyt social media opslag</p>
        </button>

        <button className="p-4 bg-white rounded-xl border border-gray-200 hover:border-orange-500 hover:shadow-md transition-all text-left group">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-orange-500 transition-colors">
            <span className="text-xl group-hover:scale-110 transition-transform">📊</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Se Rapport</h3>
          <p className="text-sm text-gray-600">Generer detaljeret analytics</p>
        </button>
      </div>
    </div>
  );
};

export default DashboardScreen;
