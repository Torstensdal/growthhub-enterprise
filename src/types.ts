// Core types for GrowthHub Enterprise

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  linkedIn?: string;
  notes?: string;
  tags?: string[];
  lastContact?: string;
  nextFollowUp?: string;
  status?: 'lead' | 'prospect' | 'customer' | 'inactive';
}

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  startDate?: string;
  endDate?: string;
  contacts: string[]; // Contact IDs
  messages?: Message[];
  analytics?: CampaignAnalytics;
}

export interface Message {
  id: string;
  campaignId: string;
  contactId: string;
  type: 'email' | 'sms' | 'linkedin';
  subject?: string;
  content: string;
  sentAt?: string;
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  scheduledFor?: string;
}

export interface CampaignAnalytics {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  replied: number;
  bounced: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: string; // ISO date string
  end: string; // ISO date string
  type: 'meeting' | 'call' | 'task' | 'deadline' | 'follow-up';
  contactId?: string;
  location?: string;
  attendees?: string[];
  status: 'scheduled' | 'completed' | 'cancelled';
  reminder?: number; // minutes before
  color?: string;
}

export interface SocialPost {
  id: string;
  platform: 'linkedin' | 'twitter' | 'facebook' | 'instagram';
  content: string;
  media?: string[]; // URLs or base64
  scheduledFor?: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  publishedAt?: string;
  analytics?: PostAnalytics;
  hashtags?: string[];
}

export interface PostAnalytics {
  impressions: number;
  likes: number;
  comments: number;
  shares: number;
  clicks: number;
}

export interface Story {
  id: string;
  platform: 'instagram' | 'facebook';
  media: string; // URL or base64
  type: 'image' | 'video';
  duration?: number; // seconds for video
  text?: string;
  link?: string;
  scheduledFor?: string;
  status: 'draft' | 'scheduled' | 'published' | 'expired';
  expiresAt?: string;
}

export interface Prospect {
  id: string;
  name: string;
  company: string;
  industry?: string;
  size?: string;
  revenue?: string;
  contact: {
    email?: string;
    phone?: string;
    linkedIn?: string;
  };
  status: 'researching' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  score?: number; // 0-100
  painPoints?: string[];
  budget?: string;
  timeline?: string;
  decisionMakers?: string[];
  notes?: string;
  proposalId?: string;
  activities?: ProspectActivity[];
}

export interface ProspectActivity {
  id: string;
  prospectId: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'proposal';
  date: string;
  description: string;
  outcome?: string;
}

export interface Proposal {
  id: string;
  prospectId: string;
  title: string;
  description: string;
  services: ProposalService[];
  totalValue: number;
  currency: string;
  validUntil: string;
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'rejected';
  createdAt: string;
  sentAt?: string;
  terms?: string;
  notes?: string;
}

export interface ProposalService {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Partner {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  type: 'referral' | 'reseller' | 'integration' | 'affiliate';
  status: 'active' | 'inactive' | 'pending';
  commission?: number; // percentage
  revenue?: number;
  referrals?: number;
  joinedAt: string;
  notes?: string;
}

export interface Report {
  id: string;
  type: 'sales' | 'marketing' | 'partners' | 'revenue' | 'custom';
  name: string;
  period: {
    start: string;
    end: string;
  };
  data: ReportData;
  generatedAt: string;
  format?: 'pdf' | 'excel' | 'json';
}

export interface ReportData {
  summary: Record<string, any>;
  metrics: Metric[];
  charts?: ChartData[];
}

export interface Metric {
  name: string;
  value: number | string;
  change?: number; // percentage
  trend?: 'up' | 'down' | 'stable';
  format?: 'number' | 'currency' | 'percentage';
}

export interface ChartData {
  type: 'line' | 'bar' | 'pie' | 'area';
  title: string;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    color?: string;
  }[];
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'planned' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'feature' | 'improvement' | 'bug' | 'infrastructure';
  startDate?: string;
  targetDate?: string;
  completedDate?: string;
  assignedTo?: string[];
  dependencies?: string[]; // Other roadmap item IDs
  votes?: number;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'user';
  company?: string;
  avatar?: string;
  settings?: UserSettings;
  createdAt: string;
  lastLogin?: string;
}

export interface UserSettings {
  theme?: 'light' | 'dark' | 'auto';
  notifications?: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  timezone?: string;
  language?: string;
}

export interface GeminiRequest {
  prompt: string;
  context?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface GeminiResponse {
  text: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  error?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export type ViewType = 'calendar' | 'prospecting' | 'social' | 'partners' | 'reports' | 'roadmap';

export interface AppState {
  currentView: ViewType;
  user?: User;
  contacts: Contact[];
  campaigns: Campaign[];
  events: CalendarEvent[];
  prospects: Prospect[];
  proposals: Proposal[];
  partners: Partner[];
  socialPosts: SocialPost[];
  stories: Story[];
  roadmapItems: RoadmapItem[];
}
