// Core type definitions
export type Language = 'en' | 'da' | 'de';
export type Theme = 'light' | 'dark';

// Calendar Event Types
export type EventType = 'post' | 'meeting' | 'call' | 'task' | 'deadline' | 'follow-up';
export type EventStatus = 'scheduled' | 'confirmed' | 'pending' | 'completed' | 'cancelled';
export type SocialPlatform = 'linkedin' | 'facebook' | 'instagram' | 'twitter' | 'tiktok';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // Format: YYYY-MM-DD
  time: string; // Format: HH:MM
  type: EventType;
  platform?: SocialPlatform;
  status: EventStatus;
  description?: string;
  partnerId?: string;
}

// Social Post Types
export interface SocialPost {
  id: string;
  platform: SocialPlatform;
  content: string;
  scheduledDate: string; // Format: YYYY-MM-DD
  scheduledTime: string; // Format: HH:MM
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  mediaUrls?: string[];
  hashtags?: string[];
}

// Company & Partner Types
export interface Company {
  id: string;
  name: string;
  website: string;
  description?: string;
  logo?: string;
  language: Language;
  partners?: Partner[];
  createdAt: string;
  updatedAt: string;
}

export interface Partner {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  role?: string;
  status: 'active' | 'inactive' | 'pending';
  revenue?: number;
  lastContact?: string;
}

// Prospect Types
export interface Prospect {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  score: number;
  notes?: string;
  createdAt: string;
  lastContact?: string;
}

// Dashboard Metrics
export interface DashboardMetrics {
  totalRevenue: number;
  activeProspects: number;
  activePartners: number;
  socialEngagement: number;
  revenueChange: number;
  prospectsChange: number;
  partnersChange: number;
  engagementChange: number;
}

// Activity Feed
export interface Activity {
  id: string;
  type: 'prospect' | 'partner' | 'post' | 'meeting' | 'revenue';
  title: string;
  description: string;
  timestamp: string;
  icon?: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  language: Language;
  theme: Theme;
  avatar?: string;
}
