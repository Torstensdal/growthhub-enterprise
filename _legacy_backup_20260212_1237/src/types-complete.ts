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
  analytics?: {
    reach: number;
    engagement: number;
    clicks: number;
    shares: number;
  };
}

// Story Type
export interface Story {
  id: string;
  platform: SocialPlatform;
  content: string;
  mediaUrl: string;
  publishedAt: string;
  expiresAt: string;
  views?: number;
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
  type?: 'referral' | 'reseller' | 'integration' | 'affiliate';
  commission?: number;
  notes?: string;
  referrals?: number;
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
  industry?: string;
  contact?: string;
  painPoints?: string[];
  budget?: string;
  timeline?: string;
  activities?: Activity[];
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

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Gemini AI Types
export interface GeminiRequest {
  prompt: string;
  context?: string;
  language?: Language;
  maxTokens?: number;
}

export interface GeminiResponse {
  text: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// Contact Type
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  lastContact?: string;
  notes?: string;
}

// Campaign Type
export interface Campaign {
  id: string;
  name: string;
  description?: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  startDate: string;
  endDate?: string;
  budget?: number;
  platforms: SocialPlatform[];
  posts?: SocialPost[];
}

// Proposal Type
export interface Proposal {
  id: string;
  prospectId: string;
  title: string;
  description: string;
  value: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  createdAt: string;
  sentAt?: string;
  respondedAt?: string;
  content?: string;
}

// Roadmap Item Type
export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'planned' | 'in-progress' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high' | 'critical';
  quarter: string; // e.g., "Q1 2026"
  assignee?: string;
  progress: number; // 0-100
  startDate?: string;
  targetDate?: string;
  completedDate?: string;
}
