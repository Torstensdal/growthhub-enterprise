import React from 'react';
import { DashboardMetrics, Activity, Partner, Prospect } from '../types';

interface DashboardScreenProps {
  onNavigate: (screen: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate }) => {
  // Mock data
  const metrics: DashboardMetrics = {
    totalRevenue: 2847650,
    activeProspects: 47,
    activePartners: 23,
    socialEngagement: 4.2,
    revenueChange: 12.5,
    prospectsChange: 8.3,
    partnersChange: 5.7,
    engagementChange: 15.2
  };

  const recentActivity: Activity[] = [
    { id: '1', type: 'prospect', title: 'New Prospect', description: 'Acme Corp showed interest', timestamp: '2 hours ago' },
    { id: '2', type: 'post', title: 'LinkedIn Post Published', description: 'Q1 Results announcement', timestamp: '5 hours ago' },
    { id: '3', type: 'partner', title: 'Partner Meeting', description: 'Met with TechVentures', timestamp: '1 day ago' },
  ];

  const topProspects: Prospect[] = [
    { id: '1', name: 'Acme Corp', email: 'contact@acme.com', source: 'LinkedIn', status: 'qualified', score: 85, createdAt: '2026-02-01' },
    { id: '2', name: 'TechStart Inc', email: 'hello@techstart.io', source: 'Referral', status: 'contacted', score: 72, createdAt: '2026-02-03' },
    { id: '3', name: 'Global Solutions', email: 'info@global.com', source: 'Website', status: 'new', score: 68, createdAt: '2026-02-05' },
  ];

  const topPartners: Partner[] = [
    { id: '1', name: 'Nordic Ventures', email: 'contact@nordic.vc', status: 'active', revenue: 450000, lastContact: '2026-02-08' },
    { id: '2', name: 'TechPartners AS', email: 'hello@techpartners.no', status: 'active', revenue: 320000, lastContact: '2026-02-07' },
    { id: '3', name: 'Innovation Hub', email: 'info@innovhub.com', status: 'active', revenue: 280000, lastContact: '2026-02-06' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto theme-transition">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tighter mb-2">
          Dashboard
        </h1>
        <p className="text-[var(--text-secondary)] font-medium">
          Velkommen tilbage! Her er dit overblik.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-2xl p-6 hover:shadow-2xl transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">
              Samlet Omsætning
            </div>
            <div className={`text-xs font-black ${metrics.revenueChange >= 0 ? 'text-brand-accent-green' : 'text-brand-accent-red'}`}>
              {metrics.revenueChange >= 0 ? '+' : ''}{metrics.revenueChange}%
            </div>
          </div>
          <div className="text-3xl font-black text-brand-primary">
            {formatCurrency(metrics.totalRevenue)}
          </div>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-2xl p-6 hover:shadow-2xl transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">
              Aktive Prospects
            </div>
            <div className={`text-xs font-black ${metrics.prospectsChange >= 0 ? 'text-brand-accent-green' : 'text-brand-accent-red'}`}>
              {metrics.prospectsChange >= 0 ? '+' : ''}{metrics.prospectsChange}%
            </div>
          </div>
          <div className="text-3xl font-black text-brand-accent-teal">
            {metrics.activeProspects}
          </div>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-2xl p-6 hover:shadow-2xl transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">
              Aktive Partnere
            </div>
            <div className={`text-xs font-black ${metrics.partnersChange >= 0 ? 'text-brand-accent-green' : 'text-brand-accent-red'}`}>
              {metrics.partnersChange >= 0 ? '+' : ''}{metrics.partnersChange}%
            </div>
          </div>
          <div className="text-3xl font-black text-[var(--text-primary)]">
            {metrics.activePartners}
          </div>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-2xl p-6 hover:shadow-2xl transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">
              Social Engagement
            </div>
            <div className={`text-xs font-black ${metrics.engagementChange >= 0 ? 'text-brand-accent-green' : 'text-brand-accent-red'}`}>
              {metrics.engagementChange >= 0 ? '+' : ''}{metrics.engagementChange}%
            </div>
          </div>
          <div className="text-3xl font-black text-brand-accent-pink">
            {metrics.socialEngagement}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-3xl p-8">
          <h2 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tight mb-6">
            Seneste Aktivitet
          </h2>
          <div className="space-y-4">
            {recentActivity.map(activity => (
              <div key={activity.id} className="flex items-start gap-4 p-4 bg-[var(--bg-card-hover)] rounded-xl border border-[var(--border-dark)]">
                <div className="h-10 w-10 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                  <div className="h-2 w-2 rounded-full bg-brand-primary"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-[var(--text-primary)] mb-1">
                    {activity.title}
                  </div>
                  <div className="text-sm text-[var(--text-secondary)]">
                    {activity.description}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] mt-1">
                    {activity.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Prospects */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-3xl p-8">
          <h2 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tight mb-6">
            Top Prospects
          </h2>
          <div className="space-y-4">
            {topProspects.map(prospect => (
              <div key={prospect.id} className="p-4 bg-[var(--bg-card-hover)] rounded-xl border border-[var(--border-dark)] cursor-pointer hover:border-brand-primary/30 transition-all">
                <div className="font-bold text-[var(--text-primary)] mb-2">
                  {prospect.name}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase ${
                    prospect.status === 'qualified' ? 'bg-brand-accent-green/10 text-brand-accent-green' :
                    prospect.status === 'contacted' ? 'bg-brand-primary/10 text-brand-primary' :
                    'bg-[var(--bg-card)] text-[var(--text-muted)]'
                  }`}>
                    {prospect.status}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">
                    Score: {prospect.score}
                  </span>
                </div>
                <div className="w-full bg-[var(--bg-card)] h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-primary transition-all" style={{ width: `${prospect.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Partners */}
      <div className="mt-8 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-3xl p-8">
        <h2 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tight mb-6">
          Top Partnere
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-dark)]">
                <th className="text-left py-3 px-4 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">
                  Partner
                </th>
                <th className="text-left py-3 px-4 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">
                  Email
                </th>
                <th className="text-right py-3 px-4 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">
                  Omsætning
                </th>
                <th className="text-left py-3 px-4 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">
                  Sidste Kontakt
                </th>
              </tr>
            </thead>
            <tbody>
              {topPartners.map(partner => (
                <tr key={partner.id} className="border-b border-[var(--border-dark)] hover:bg-[var(--bg-card-hover)] transition-colors cursor-pointer">
                  <td className="py-4 px-4">
                    <div className="font-bold text-[var(--text-primary)]">
                      {partner.name}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[var(--text-secondary)]">
                    {partner.email}
                  </td>
                  <td className="py-4 px-4 text-right font-black text-brand-primary">
                    {formatCurrency(partner.revenue || 0)}
                  </td>
                  <td className="py-4 px-4 text-[var(--text-muted)] text-sm">
                    {partner.lastContact}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <button onClick={() => onNavigate('calendar')} className="p-6 bg-gradient-to-br from-brand-primary to-brand-primary/80 text-white rounded-2xl text-left hover:scale-105 transition-transform shadow-2xl">
          <div className="text-2xl font-black mb-2">📅</div>
          <div className="font-black uppercase tracking-tight">Planlæg Indhold</div>
          <div className="text-sm opacity-80 mt-1">Opret nye opslag</div>
        </button>

        <button onClick={() => onNavigate('prospecting')} className="p-6 bg-gradient-to-br from-brand-accent-teal to-brand-accent-teal/80 text-white rounded-2xl text-left hover:scale-105 transition-transform shadow-2xl">
          <div className="text-2xl font-black mb-2">🎯</div>
          <div className="font-black uppercase tracking-tight">Ny Prospect</div>
          <div className="text-sm opacity-80 mt-1">Tilføj lead</div>
        </button>

        <button onClick={() => onNavigate('partners')} className="p-6 bg-gradient-to-br from-brand-accent-pink to-brand-accent-pink/80 text-white rounded-2xl text-left hover:scale-105 transition-transform shadow-2xl">
          <div className="text-2xl font-black mb-2">🤝</div>
          <div className="font-black uppercase tracking-tight">Se Partnere</div>
          <div className="text-sm opacity-80 mt-1">Administrer relationer</div>
        </button>
      </div>
    </div>
  );
};
