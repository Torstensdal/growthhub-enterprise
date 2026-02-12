import { useState } from 'react'
import { Search, Bell, Settings, UserCircle, Sun, Moon } from 'lucide-react'

export default function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }
  return (
    <header className="h-auto p-4 bg-[var(--bg-sidebar)] border-b border-[var(--border-primary)]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-2xl">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--bg-card)] border border-[var(--border-primary)]">
            <Search className="h-5 w-5 text-[var(--text-muted)]" />
            <input type="text" placeholder="Søg..." className="flex-1 bg-transparent border-none outline-none text-sm text-[var(--text-primary)]" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full text-[var(--text-muted)] hover:bg-[var(--bg-card-hover)] transition-colors"><Bell className="h-5 w-5" /></button>
          <button className="p-2 rounded-full text-[var(--text-muted)] hover:bg-[var(--bg-card-hover)] transition-colors"><Settings className="h-5 w-5" /></button>
          <button onClick={toggleTheme} className="p-2 rounded-full text-[var(--text-muted)] hover:bg-[var(--bg-card-hover)] transition-colors">{theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}</button>
          <button className="p-2 rounded-full"><UserCircle className="h-7 w-7 text-[var(--text-muted)]" /></button>
        </div>
      </div>
    </header>
  )
}
