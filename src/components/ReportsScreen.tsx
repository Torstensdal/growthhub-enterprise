import { useState } from 'react';

type TimeRange = 'week' | 'month' | 'quarter' | 'year';
type ReportType = 'overview' | 'prospects' | 'social' | 'partners';

interface MetricCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
}

const ReportsScreen = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('month');
  const [reportType, setReportType] = useState<ReportType>('overview');

  const metrics: MetricCard[] = [
    {
      title: 'Total Revenue',
      value: '847.500 kr',
      change: '+12.5%',
      trend: 'up',
      icon: '💰'
    },
    {
      title: 'Nye Prospects',
      value: '156',
      change: '+23.1%',
      trend: 'up',
      icon: '🎯'
    },
    {
      title: 'Konverteringsrate',
      value: '34.2%',
      change: '+5.3%',
      trend: 'up',
      icon: '📈'
    },
    {
      title: 'Aktive Partnere',
      value: '42',
      change: '-2.4%',
      trend: 'down',
      icon: '🤝'
    }
  ];

  const prospectData = [
    { stage: 'Nye Leads', count: 45, value: '225.000 kr' },
    { stage: 'Kvalificeret', count: 28, value: '420.000 kr' },
    { stage: 'Forhandling', count: 12, value: '360.000 kr' },
    { stage: 'Lukket', count: 8, value: '320.000 kr' }
  ];

  const socialMediaStats = [
    { platform: 'LinkedIn', posts: 24, reach: '12.5K', engagement: '8.2%' },
    { platform: 'Twitter', posts: 18, reach: '8.3K', engagement: '5.7%' },
    { platform: 'Facebook', posts: 15, reach: '6.2K', engagement: '4.1%' },
    { platform: 'Instagram', posts: 32, reach: '15.8K', engagement: '12.3%' }
  ];

  const topPartners = [
    { name: 'TechVentures ApS', revenue: '125.000 kr', referrals: 8, commission: '12.500 kr' },
    { name: 'Digital Solutions', revenue: '98.000 kr', referrals: 6, commission: '9.800 kr' },
    { name: 'Growth Consulting', revenue: '87.500 kr', referrals: 5, commission: '8.750 kr' },
    { name: 'Innovation Hub', revenue: '76.000 kr', referrals: 4, commission: '7.600 kr' }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Rapporter & Analytics</h1>
        <p className="text-gray-600">Oversigt over performance og nøgletal</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-8">
        <div className="flex gap-2">
          {(['week', 'month', 'quarter', 'year'] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeRange === range
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {range === 'week' && 'Uge'}
              {range === 'month' && 'Måned'}
              {range === 'quarter' && 'Kvartal'}
              {range === 'year' && 'År'}
            </button>
          ))}
        </div>

        <div className="flex gap-2 ml-auto">
          {(['overview', 'prospects', 'social', 'partners'] as ReportType[]).map((type) => (
            <button
              key={type}
              onClick={() => setReportType(type)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                reportType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {type === 'overview' && '📊 Oversigt'}
              {type === 'prospects' && '🎯 Prospects'}
              {type === 'social' && '📱 Social Media'}
              {type === 'partners' && '🤝 Partnere'}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards */}
      {reportType === 'overview' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{metric.icon}</span>
                  <span className={`text-sm font-semibold ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">{metric.title}</h3>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              </div>
            ))}
          </div>

          {/* Charts Placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Over Time</h3>
              <div className="h-64 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">📈 Chart kommer her</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Funnel</h3>
              <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">🔄 Chart kommer her</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Prospect Report */}
      {reportType === 'prospects' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Prospect Pipeline</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {prospectData.map((stage, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{stage.stage}</h4>
                    <p className="text-sm text-gray-600">{stage.count} prospects</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-purple-600">{stage.value}</p>
                    <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${(stage.count / 45) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Social Media Report */}
      {reportType === 'social' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Social Media Performance</h3>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Platform</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Posts</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Reach</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Engagement</th>
                  </tr>
                </thead>
                <tbody>
                  {socialMediaStats.map((stat, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium text-gray-900">{stat.platform}</td>
                      <td className="py-4 px-4 text-gray-700">{stat.posts}</td>
                      <td className="py-4 px-4 text-gray-700">{stat.reach}</td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          {stat.engagement}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Partners Report */}
      {reportType === 'partners' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Top Partners</h3>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Partner</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Revenue</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Referrals</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Commission</th>
                  </tr>
                </thead>
                <tbody>
                  {topPartners.map((partner, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium text-gray-900">{partner.name}</td>
                      <td className="py-4 px-4 text-gray-700">{partner.revenue}</td>
                      <td className="py-4 px-4 text-gray-700">{partner.referrals}</td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                          {partner.commission}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Export Button */}
      <div className="mt-8 flex justify-end">
        <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow">
          📥 Export til Excel
        </button>
      </div>
    </div>
  );
};

export default ReportsScreen;
