import React, { useState } from 'react';
import { CalendarEvent } from '../types';

interface CalendarScreenProps {
  onNavigate: (screen: string) => void;
}

export const CalendarScreen: React.FC<CalendarScreenProps> = () => {
  const [currentDate] = useState(new Date());

  // Mock calendar events with correct string format
  const mockEvents: CalendarEvent[] = [
    {
      id: '1',
      title: 'LinkedIn Post - Q1 Results',
      date: '2026-02-15',
      time: '09:00',
      type: 'post',
      platform: 'linkedin',
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'Partner Meeting',
      date: '2026-02-18',
      time: '14:00',
      type: 'meeting',
      status: 'confirmed'
    },
    {
      id: '3',
      title: 'Instagram Campaign Launch',
      date: '2026-02-20',
      time: '10:00',
      type: 'post',
      platform: 'instagram',
      status: 'scheduled'
    },
    {
      id: '4',
      title: 'Follow-up Call',
      date: '2026-02-22',
      time: '15:30',
      type: 'call',
      status: 'pending'
    }
  ];

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="p-8 max-w-7xl mx-auto theme-transition">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tighter mb-2">
            Kalender
          </h1>
          <p className="text-[var(--text-secondary)] font-medium">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </p>
        </div>

        <button
          onClick={() => {/* TODO: Open create post modal */}}
          className="px-6 py-3 bg-brand-primary text-white text-sm font-bold uppercase tracking-widest rounded-xl shadow-xl hover:brightness-110 transition-all"
        >
          + Nyt Opslag
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-2xl p-6">
          <div className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-2">
            Planlagte Opslag
          </div>
          <div className="text-3xl font-black text-brand-primary">
            24
          </div>
        </div>
        <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-2xl p-6">
          <div className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-2">
            Udgivet Denne Måned
          </div>
          <div className="text-3xl font-black text-brand-accent-green">
            18
          </div>
        </div>
        <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-2xl p-6">
          <div className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-2">
            Platforme
          </div>
          <div className="text-3xl font-black text-[var(--text-primary)]">
            5
          </div>
        </div>
        <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-2xl p-6">
          <div className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-2">
            Gennemsnitlig Engagement
          </div>
          <div className="text-3xl font-black text-brand-accent-teal">
            4.2%
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-3xl p-8 mb-8">
        <div className="grid grid-cols-7 gap-4 mb-4">
          {['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'].map(day => (
            <div key={day} className="text-center text-xs font-black text-[var(--text-muted)] uppercase tracking-widest">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-4">
          {Array.from({ length: 35 }, (_, i) => {
            const dayNum = i - 2; // Start from -2 to show previous month days
            const isToday = dayNum === currentDate.getDate();
            const hasEvent = mockEvents.some(e => new Date(e.date).getDate() === dayNum);
            
            return (
              <div
                key={i}
                className={`aspect-square p-3 rounded-xl border transition-all cursor-pointer ${
                  isToday
                    ? 'bg-brand-primary/10 border-brand-primary text-brand-primary font-black'
                    : hasEvent
                    ? 'bg-brand-accent-teal/5 border-brand-accent-teal/30 hover:border-brand-accent-teal'
                    : 'border-[var(--border-dark)] hover:border-[var(--border-primary)] hover:bg-[var(--bg-card-hover)]'
                }`}
              >
                <div className="text-sm font-bold">
                  {dayNum > 0 && dayNum <= 28 ? dayNum : ''}
                </div>
                {hasEvent && (
                  <div className="mt-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-accent-teal"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Posts */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-3xl p-8">
        <h2 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tight mb-6">
          Kommende Opslag
        </h2>
        
        <div className="space-y-4">
          {mockEvents.map(event => (
            <div
              key={event.id}
              className="flex items-center justify-between p-4 bg-[var(--bg-card-hover)] rounded-xl border border-[var(--border-dark)] hover:border-brand-primary/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-black text-[var(--text-primary)]">
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="text-[10px] font-black text-[var(--text-muted)] uppercase">
                    {monthNames[new Date(event.date).getMonth()].substring(0, 3)}
                  </div>
                </div>
                <div>
                  <div className="font-bold text-[var(--text-primary)]">
                    {event.title}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] font-medium">
                    {event.time} • {event.platform || event.type}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  event.status === 'scheduled' ? 'bg-brand-primary/10 text-brand-primary' :
                  event.status === 'confirmed' ? 'bg-brand-accent-green/10 text-brand-accent-green' :
                  'bg-[var(--bg-card)] text-[var(--text-muted)]'
                }`}>
                  {event.status}
                </span>
                <button className="p-2 hover:bg-[var(--bg-card)] rounded-lg transition-colors">
                  <svg className="h-5 w-5 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
