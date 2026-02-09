import { useState } from 'react';
import type { CalendarEvent } from '../types';
import apiClient from '../services/apiClient';

export default function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: '',
    type: 'meeting',
    status: 'scheduled',
  });

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'December'
  ];

  const dayNames = ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const today = () => {
    setCurrentDate(new Date());
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const handleAddEvent = async () => {
    if (!newEvent.title || !selectedDate) {
      alert('Titel og dato er påkrævet');
      return;
    }

    const startDate = new Date(selectedDate);
    const endDate = new Date(selectedDate);
    endDate.setHours(endDate.getHours() + 1);

    const response = await apiClient.createEvent({
      title: newEvent.title,
      description: newEvent.description,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      type: newEvent.type || 'meeting',
      status: 'scheduled',
      location: newEvent.location,
    } as Omit<CalendarEvent, 'id'>);

    if (response.success && response.data) {
      setEvents([...events, response.data]);
      setNewEvent({ title: '', type: 'meeting', status: 'scheduled' });
      setIsAddingEvent(false);
    } else {
      alert('Kunne ikke tilføje event: ' + response.error);
    }
  };

  const getEventTypeColor = (type: CalendarEvent['type']) => {
    const colors = {
      meeting: 'bg-blue-500',
      call: 'bg-green-500',
      task: 'bg-purple-500',
      deadline: 'bg-red-500',
      'follow-up': 'bg-orange-500',
    };
    return colors[type] || colors.meeting;
  };

  const getEventTypeIcon = (type: CalendarEvent['type']) => {
    const icons = {
      meeting: '🤝',
      call: '📞',
      task: '✅',
      deadline: '⏰',
      'follow-up': '🔄',
    };
    return icons[type] || '📅';
  };

  const renderCalendarDays = () => {
    const days = [];
    const totalCells = 42; // 6 weeks × 7 days

    // Empty cells before first day
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 bg-gray-50 border border-gray-200"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate?.toDateString() === date.toDateString();

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`h-24 border border-gray-200 p-2 cursor-pointer transition-all hover:bg-gray-50 ${
            isToday ? 'bg-blue-50 border-blue-300' : 'bg-white'
          } ${isSelected ? 'ring-2 ring-purple-500' : ''}`}
        >
          <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
            {day}
          </div>
          <div className="space-y-1 overflow-hidden">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className={`text-xs px-2 py-1 rounded text-white truncate ${getEventTypeColor(event.type)}`}
                title={event.title}
              >
                {getEventTypeIcon(event.type)} {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500 px-2">+{dayEvents.length - 2} mere</div>
            )}
          </div>
        </div>
      );
    }

    // Empty cells after last day
    const remainingCells = totalCells - (firstDayOfMonth + daysInMonth);
    for (let i = 0; i < remainingCells; i++) {
      days.push(
        <div key={`empty-end-${i}`} className="h-24 bg-gray-50 border border-gray-200"></div>
      );
    }

    return days;
  };

  return (
    <div className="h-full flex">
      {/* Main Calendar */}
      <div className="flex-1 overflow-y-auto bg-white p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={today}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              I dag
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ←
            </button>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              →
            </button>
            <button
              onClick={() => setIsAddingEvent(true)}
              className="ml-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
            >
              + Ny Event
            </button>
          </div>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
          {renderCalendarDays()}
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-gray-700">Møder</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-700">Opkald</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-gray-700">Opgaver</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-700">Deadlines</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-gray-700">Opfølgning</span>
          </div>
        </div>
      </div>

      {/* Sidebar - Event Details / Add Event */}
      <div className="w-96 border-l border-gray-200 bg-gray-50 overflow-y-auto">
        {isAddingEvent ? (
          <div className="p-6">
            <h3 className="text-xl font-bold mb-6">Ny Event</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titel *</label>
                <input
                  type="text"
                  value={newEvent.title || ''}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Møde med kunde"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={newEvent.type || 'meeting'}
                  onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as CalendarEvent['type'] })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="meeting">🤝 Møde</option>
                  <option value="call">📞 Opkald</option>
                  <option value="task">✅ Opgave</option>
                  <option value="deadline">⏰ Deadline</option>
                  <option value="follow-up">🔄 Opfølgning</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Beskrivelse</label>
                <textarea
                  value={newEvent.description || ''}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Eventdetaljer..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lokation</label>
                <input
                  type="text"
                  value={newEvent.location || ''}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Kontor, Online, etc."
                />
              </div>

              {selectedDate && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900 font-medium">
                    📅 {selectedDate.toLocaleDateString('da-DK', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-3 pt-4">
                <button
                  onClick={handleAddEvent}
                  className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Gem Event
                </button>
                <button
                  onClick={() => {
                    setIsAddingEvent(false);
                    setNewEvent({ title: '', type: 'meeting', status: 'scheduled' });
                  }}
                  className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Annuller
                </button>
              </div>
            </div>
          </div>
        ) : selectedDate ? (
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">
              {selectedDate.toLocaleDateString('da-DK', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long' 
              })}
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              {selectedDate.getFullYear()}
            </p>

            {getEventsForDate(selectedDate).length > 0 ? (
              <div className="space-y-4">
                {getEventsForDate(selectedDate).map((event) => (
                  <div key={event.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{getEventTypeIcon(event.type)}</span>
                          <h4 className="font-semibold text-gray-900">{event.title}</h4>
                        </div>
                        {event.description && (
                          <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                        )}
                      </div>
                      <span className={`px-2 py-1 rounded text-xs text-white ${getEventTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                    </div>
                    
                    {event.location && (
                      <p className="text-sm text-gray-600 mb-2">📍 {event.location}</p>
                    )}
                    
                    <div className="text-sm text-gray-500">
                      {new Date(event.start).toLocaleTimeString('da-DK', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })} - {new Date(event.end).toLocaleTimeString('da-DK', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p className="text-4xl mb-2">📅</p>
                <p>Ingen events denne dag</p>
                <button
                  onClick={() => setIsAddingEvent(true)}
                  className="mt-4 text-purple-600 hover:text-purple-700 text-sm font-medium"
                >
                  + Tilføj event
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            <p className="text-4xl mb-4">📅</p>
            <p className="text-lg mb-2">Vælg en dato</p>
            <p className="text-sm">for at se events eller tilføje ny</p>
          </div>
        )}
      </div>
    </div>
  );
}
