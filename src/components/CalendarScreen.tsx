import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  formatDate, 
  formatTime, 
  formatCalendarDate,
  getDaysInMonth,
  startOfMonth,
  addDays,
  isToday,
  isSameDay
} from '../utils/dateUtils';
import { SocialPost, CalendarEvent } from '../types';

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  events: CalendarEvent[];
  posts: SocialPost[];
}

const CalendarScreen: React.FC = () => {
  const { t } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showPostModal, setShowPostModal] = useState(false);

  // Mock data - will be replaced with real API calls
  const [scheduledPosts, setScheduledPosts] = useState<SocialPost[]>([
    {
      id: '1',
      companyId: 'comp1',
      platform: 'linkedin',
      content: 'Excited to announce our Q1 results! 🚀',
      scheduledFor: new Date(2026, 1, 10, 10, 0),
      status: 'scheduled',
      hashtags: ['growth', 'business', 'success'],
      createdAt: new Date(),
    },
    {
      id: '2',
      companyId: 'comp1',
      platform: 'twitter',
      content: 'New blog post is live! Check it out 👇',
      scheduledFor: new Date(2026, 1, 12, 14, 30),
      status: 'scheduled',
      hashtags: ['tech', 'innovation'],
      createdAt: new Date(),
    },
    {
      id: '3',
      companyId: 'comp1',
      platform: 'facebook',
      content: 'Join us for our webinar next week!',
      scheduledFor: new Date(2026, 1, 15, 16, 0),
      status: 'scheduled',
      createdAt: new Date(),
    },
  ]);

  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: 'e1',
      companyId: 'comp1',
      title: 'Team Meeting',
      type: 'meeting',
      startDate: new Date(2026, 1, 11, 14, 0),
      endDate: new Date(2026, 1, 11, 15, 0),
    },
    {
      id: 'e2',
      companyId: 'comp1',
      title: 'Campaign Launch',
      type: 'campaign',
      startDate: new Date(2026, 1, 14, 9, 0),
      endDate: new Date(2026, 1, 14, 17, 0),
    },
  ]);

  const generateCalendarDays = (): CalendarDay[] => {
    const days: CalendarDay[] = [];
    const monthStart = startOfMonth(currentDate);
    const startDay = monthStart.getDay();
    const daysInMonth = getDaysInMonth(currentDate);
    
    // Previous month days
    const prevMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const daysInPrevMonth = getDaysInMonth(prevMonthStart);
    const startOffset = startDay === 0 ? 6 : startDay - 1; // Monday as first day
    
    for (let i = startOffset; i > 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, daysInPrevMonth - i + 1);
      days.push({
        date,
        isCurrentMonth: false,
        events: getEventsForDate(date),
        posts: getPostsForDate(date),
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      days.push({
        date,
        isCurrentMonth: true,
        events: getEventsForDate(date),
        posts: getPostsForDate(date),
      });
    }
    
    // Next month days to fill the grid
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i);
      days.push({
        date,
        isCurrentMonth: false,
        events: getEventsForDate(date),
        posts: getPostsForDate(date),
      });
    }
    
    return days;
  };

  const getEventsForDate = (date: Date): CalendarEvent[] => {
    return events.filter(event => 
      isSameDay(new Date(event.startDate), date)
    );
  };

  const getPostsForDate = (date: Date): SocialPost[] => {
    return scheduledPosts.filter(post => 
      post.scheduledFor && isSameDay(new Date(post.scheduledFor), date)
    );
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin': return '💼';
      case 'twitter': return '🐦';
      case 'facebook': return '👥';
      case 'instagram': return '📷';
      default: return '📱';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'linkedin': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'twitter': return 'bg-sky-100 text-sky-700 border-sky-200';
      case 'facebook': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'instagram': return 'bg-pink-100 text-pink-700 border-pink-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const changeMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Publiceringplan</h1>
            <p className="text-gray-600 mt-1">Planlæg og administrer dit content</p>
          </div>
          
          <button 
            onClick={() => setShowPostModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg font-medium flex items-center gap-2"
          >
            <span className="text-xl">➕</span>
            Nyt Opslag
          </button>
        </div>

        {/* View Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Month Navigation */}
            <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1">
              <button
                onClick={() => changeMonth('prev')}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
              >
                ←
              </button>
              <span className="px-4 font-semibold text-gray-900 min-w-[160px] text-center">
                {currentDate.toLocaleDateString('da-DK', { month: 'long', year: 'numeric' })}
              </span>
              <button
                onClick={() => changeMonth('next')}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
              >
                →
              </button>
            </div>

            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              I dag
            </button>
          </div>

          {/* View Selector */}
          <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setView('month')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                view === 'month'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Måned
            </button>
            <button
              onClick={() => setView('week')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                view === 'week'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Uge
            </button>
            <button
              onClick={() => setView('day')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                view === 'day'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Dag
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">📅</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Planlagte Opslag</p>
              <p className="text-2xl font-bold text-gray-900">{scheduledPosts.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">✅</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Publiceret i dag</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">📊</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Platforme</p>
              <p className="text-2xl font-bold text-gray-900">4</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">🎯</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Engagement Rate</p>
              <p className="text-2xl font-bold text-gray-900">6.2%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
          {['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'].map((day) => (
            <div key={day} className="p-3 text-center text-sm font-semibold text-gray-600">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 divide-x divide-y divide-gray-200">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`min-h-[120px] p-2 ${
                !day.isCurrentMonth ? 'bg-gray-50' : 'bg-white'
              } ${isToday(day.date) ? 'bg-blue-50' : ''} hover:bg-gray-50 transition-colors cursor-pointer`}
              onClick={() => setSelectedDate(day.date)}
            >
              <div className={`text-sm font-medium mb-2 ${
                !day.isCurrentMonth ? 'text-gray-400' : 'text-gray-900'
              } ${isToday(day.date) ? 'text-blue-600 font-bold' : ''}`}>
                {day.date.getDate()}
              </div>

              {/* Posts for this day */}
              <div className="space-y-1">
                {day.posts.slice(0, 2).map((post) => (
                  <div
                    key={post.id}
                    className={`text-xs p-1.5 rounded border ${getPlatformColor(post.platform)} truncate`}
                  >
                    <div className="flex items-center gap-1">
                      <span>{getPlatformIcon(post.platform)}</span>
                      <span className="truncate">{formatTime(post.scheduledFor!)}</span>
                    </div>
                  </div>
                ))}
                
                {/* Events for this day */}
                {day.events.slice(0, 1).map((event) => (
                  <div
                    key={event.id}
                    className="text-xs p-1.5 rounded bg-purple-100 text-purple-700 border border-purple-200 truncate"
                  >
                    <div className="flex items-center gap-1">
                      <span>📅</span>
                      <span className="truncate">{event.title}</span>
                    </div>
                  </div>
                ))}

                {day.posts.length + day.events.length > 3 && (
                  <div className="text-xs text-gray-500 font-medium">
                    +{day.posts.length + day.events.length - 3} mere
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Posts List */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Kommende Opslag</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {scheduledPosts
            .sort((a, b) => new Date(a.scheduledFor!).getTime() - new Date(b.scheduledFor!).getTime())
            .slice(0, 5)
            .map((post) => (
              <div key={post.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${getPlatformColor(post.platform)}`}>
                    {getPlatformIcon(post.platform)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 capitalize">{post.platform}</h3>
                      <span className="text-sm text-gray-600">
                        {formatCalendarDate(new Date(post.scheduledFor!))} kl. {formatTime(post.scheduledFor!)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2 line-clamp-2">{post.content}</p>
                    {post.hashtags && post.hashtags.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        {post.hashtags.map((tag) => (
                          <span key={tag} className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                      ✏️
                    </button>
                    <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Post Creation Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Opret Nyt Opslag</h2>
              <button
                onClick={() => setShowPostModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {/* Platform Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['linkedin', 'twitter', 'facebook', 'instagram'].map((platform) => (
                      <button
                        key={platform}
                        className={`p-4 border-2 rounded-lg transition-all hover:border-blue-500 ${getPlatformColor(platform)}`}
                      >
                        <span className="text-2xl mb-1 block">{getPlatformIcon(platform)}</span>
                        <span className="text-xs font-medium capitalize">{platform}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Indhold</label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={6}
                    placeholder="Skriv dit opslag her..."
                  />
                </div>

                {/* AI Suggestions */}
                <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg font-medium flex items-center justify-center gap-2">
                  <span className="text-xl">✨</span>
                  Generer med AI
                </button>

                {/* Schedule */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dato</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tid</label>
                    <input
                      type="time"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Hashtags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hashtags</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="#marketing #growth #business"
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4">
                  <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg font-medium">
                    Planlæg Opslag
                  </button>
                  <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    Gem som Kladde
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarScreen;
