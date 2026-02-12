import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Calendar, Building2, Target, Share2, FileText, Users, Handshake, BarChart3, Map, TrendingUp, Sparkles } from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
  { icon: Building2, label: 'Company', path: '/company' },
  { icon: Target, label: 'Strategy', path: '/strategy' },
  { icon: Share2, label: 'Social', path: '/social' },
  { icon: FileText, label: 'Content', path: '/content' },
  { icon: Users, label: 'Prospecting', path: '/prospecting' },
  { icon: Handshake, label: 'Partners', path: '/partners' },
  { icon: BarChart3, label: 'Reports', path: '/reports' },
  { icon: Map, label: 'Roadmap', path: '/roadmap' },
  { icon: TrendingUp, label: 'Analytics', path: '/analytics' },
]

export default function Sidebar() {
  return (
    <div className="w-72 bg-[var(--bg-sidebar)] border-r border-[var(--border-primary)] p-6 shadow-lg flex flex-col">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <h1 className="font-black text-lg text-[var(--text-primary)] tracking-tight uppercase">GrowthHub</h1>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink key={item.path} to={item.path} className={({ isActive }: { isActive: boolean }) => `w-full flex items-center gap-3 px-3 py-3 text-sm font-bold rounded-xl transition-all ${isActive ? 'text-white bg-indigo-600 shadow-lg' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'}`}>
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
