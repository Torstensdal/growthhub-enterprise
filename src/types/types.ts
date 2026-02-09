// Core Types for GrowthHub Enterprise

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  companyId: string;
  createdAt: Date;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  website?: string;
  logo?: string;
  description?: string;
  foundedYear?: number;
  size?: string;
  targetAudience?: string;
  uniqueSellingPoints?: string[];
  competitors?: string[];
  goals?: string[];
  challenges?: string[];
  contentStrategy?: ContentStrategy;
  brandGuidelines?: BrandGuidelines;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContentStrategy {
  platforms: string[];
  toneOfVoice: string;
  keyMessages: string[];
  contentPillars: string[];
  postingFrequency: {
    [platform: string]: number; // posts per week
  };
  hashtags?: string[];
}

export interface BrandGuidelines {
  primaryColors: string[];
  secondaryColors?: string[];
  fonts: string[];
  logoUsage?: string;
  imageStyle?: string;
  voiceCharacteristics?: string[];
}

export interface Partner {
  id: string;
  companyId: string;
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  partnerType: 'reseller' | 'affiliate' | 'integration' | 'referral';
  status: 'active' | 'inactive' | 'pending';
  commissionRate: number;
  totalRevenue: number;
  referrals: number;
  joinedDate: Date;
  notes?: string;
  contactPerson?: string;
  website?: string;
  logo?: string;
}

export interface PartnerIdea {
  id: string;
  companyId: string;
  name: string;
  type: string;
  description: string;
  potentialValue: string;
  effort: 'low' | 'medium' | 'high';
  priority: number;
  status: 'idea' | 'researching' | 'in-progress' | 'implemented';
  createdAt: Date;
  notes?: string;
}

export interface Prospect {
  id: string;
  companyId: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  source: string;
  value?: number;
  probability?: number;
  nextAction?: string;
  nextActionDate?: Date;
  notes?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  lastContactedAt?: Date;
}

export interface Lead {
  id: string;
  companyId: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'unqualified';
  score?: number;
  createdAt: Date;
  notes?: string;
}

export interface DripCampaign {
  id: string;
  companyId: string;
  name: string;
  description?: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  emails: DripEmail[];
  subscribers: number;
  openRate?: number;
  clickRate?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DripEmail {
  id: string;
  subject: string;
  content: string;
  delayDays: number;
  order: number;
}

export interface SocialPost {
  id: string;
  companyId: string;
  platform: 'linkedin' | 'twitter' | 'facebook' | 'instagram';
  content: string;
  mediaUrls?: string[];
  scheduledFor?: Date;
  publishedAt?: Date;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
  hashtags?: string[];
  createdAt: Date;
}

export interface MediaAsset {
  id: string;
  companyId: string;
  name: string;
  type: 'image' | 'video' | 'document' | 'audio';
  url: string;
  thumbnailUrl?: string;
  size: number;
  format: string;
  tags?: string[];
  aiTags?: string[];
  description?: string;
  uploadedAt: Date;
  usageCount?: number;
}

export interface CalendarEvent {
  id: string;
  companyId: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  type: 'social-post' | 'campaign' | 'meeting' | 'deadline' | 'other';
  relatedId?: string; // ID of related entity (post, campaign, etc.)
  completed?: boolean;
  reminders?: Date[];
  attendees?: string[];
}

export interface Workspace {
  id: string;
  name: string;
  type: 'company' | 'personal' | 'project';
  companyId?: string;
  userId: string;
  settings?: WorkspaceSettings;
  createdAt: Date;
}

export interface WorkspaceSettings {
  theme: 'light' | 'dark' | 'auto';
  language: 'en' | 'da' | 'de';
  notifications: boolean;
  defaultView?: string;
}

export interface OnboardingProgress {
  companyId: string;
  step: number;
  completed: boolean;
  steps: {
    [key: number]: {
      completed: boolean;
      data?: any;
    };
  };
  lastUpdated: Date;
}

export interface RoadmapFeature {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'planned' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  quarter?: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  year?: number;
  votes?: number;
  estimatedCompletion?: Date;
}

export interface Report {
  id: string;
  companyId: string;
  type: 'overview' | 'prospects' | 'social' | 'partners';
  period: 'week' | 'month' | 'quarter' | 'year';
  data: any;
  generatedAt: Date;
}

// Utility Types
export type Language = 'en' | 'da' | 'de';
export type Theme = 'light' | 'dark' | 'auto';
export type UserRole = 'admin' | 'user' | 'viewer';

// API Response Types
export interface ApiResponse<T> {
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

// Form Data Types
export interface CompanyFormData {
  name: string;
  industry: string;
  website?: string;
  description?: string;
  foundedYear?: number;
  size?: string;
  targetAudience?: string;
  uniqueSellingPoints?: string[];
  competitors?: string[];
  goals?: string[];
  challenges?: string[];
}

export interface PartnerFormData {
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  partnerType: 'reseller' | 'affiliate' | 'integration' | 'referral';
  commissionRate: number;
  contactPerson?: string;
  website?: string;
  notes?: string;
}

export interface ProspectFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  source: string;
  value?: number;
  probability?: number;
  notes?: string;
  tags?: string[];
}

export interface PostFormData {
  platform: 'linkedin' | 'twitter' | 'facebook' | 'instagram';
  content: string;
  mediaUrls?: string[];
  scheduledFor?: Date;
  hashtags?: string[];
}
