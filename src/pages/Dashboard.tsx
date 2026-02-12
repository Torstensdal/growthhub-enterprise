import { TrendingUp, Users, DollarSign, Target } from 'lucide-react'

const kpiData = [
  { label: 'Total Omsætning', value: '1.245.000 kr', change: '+12.5%', icon: DollarSign },
  { label: 'Aktive Kunder', value: '342', change: '+8.2%', icon: Users },
  { label: 'Konverteringsrate', value: '24.8%', change: '-2.1%', icon: Target },
  { label: 'Vækstrate', value: '18.4%', change: '+5.3%', icon: TrendingUp },
]

export default function Dashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-4xl font-black text-[var(--text-primary)]">Dashboard</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">Velkommen tilbage! Her er dagens overblik.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, i) => (
          <div key={i} className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-indigo-100"><kpi.icon className="h-6 w-6 text-indigo-600" /></div>
              <span className="text-xs font-bold text-green-600">{kpi.change}</span>
            </div>
            <p className="text-xs font-bold uppercase text-[var(--text-muted)]">{kpi.label}</p>
            <p className="text-2xl font-black mt-1 text-[var(--text-primary)]">{kpi.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
