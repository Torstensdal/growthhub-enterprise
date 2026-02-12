export type Language = 'en' | 'da' | 'de';

export type ThemeMode = 'light' | 'dark';

export interface CompanyInfo {
  id: string;
  name: string;
  industry: string;
  size: string;
  targetAudience: string[];
  values: string[];
  mission: string;
  vision: string;
  brandVoice: string[];
  competitors: string[];
  uniqueSellingPoints: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaAsset {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document' | 'logo';
  url: string;
  thumbnailUrl?: string;
  size: number;
  mimeType: string;
  tags: string[];
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  endDate?: Date;
  type: 'meeting' | 'deadline' | 'call' | 'task' | 'event';
  status: 'pending' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string[];
  relatedTo?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Partner {
  id: string;
  name: string;
  type: 'agency' | 'freelancer' | 'vendor' | 'affiliate';
  email: string;
  phone?: string;
  website?: string;
  status: 'active' | 'pending' | 'inactive';
  joinedDate: Date;
  totalRevenue: number;
  commissionRate: number;
  referralCount: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Prospect {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  score: number;
  source: string;
  tags: string[];
  notes?: string;
  lastContact?: Date;
  nextFollowUp?: Date;
  activities: ProspectActivity[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProspectActivity {
  id: string;
  type: 'email' | 'call' | 'meeting' | 'note';
  description: string;
  date: Date;
  userId?: string;
}

export interface SocialPost {
  id: string;
  content: string;
  platform: 'linkedin' | 'twitter' | 'facebook' | 'instagram';
  status: 'draft' | 'scheduled' | 'published';
  scheduledDate?: Date;
  publishedDate?: Date;
  hashtags: string[];
  mediaUrls: string[];
  metrics?: PostMetrics;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostMetrics {
  likes: number;
  shares: number;
  comments: number;
  reach: number;
  engagement: number;
}

export interface Story {
  id: string;
  title: string;
  slides: StorySlide[];
  platform: 'instagram' | 'facebook';
  status: 'draft' | 'scheduled' | 'published';
  scheduledDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface StorySlide {
  id: string;
  type: 'image' | 'video' | 'text';
  content: string;
  duration: number;
  backgroundColor?: string;
  textColor?: string;
}

export interface Analytics {
  id: string;
  metric: string;
  value: number;
  change: number;
  period: 'day' | 'week' | 'month' | 'year';
  date: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'member';
  avatar?: string;
  status: 'active' | 'inactive';
  lastLogin?: Date;
  createdAt: Date;
}

export interface DripCampaign {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'completed';
  emails: DripEmail[];
  subscribers: number;
  openRate: number;
  clickRate: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DripEmail {
  id: string;
  subject: string;
  content: string;
  delayDays: number;
  sent: number;
  opened: number;
  clicked: number;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'lost';
  score: number;
  assignedTo?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Integration {
  id: string;
  name: string;
  type: 'crm' | 'email' | 'analytics' | 'social' | 'storage';
  status: 'connected' | 'disconnected' | 'error';
  provider: string;
  lastSync?: Date;
  settings: Record<string, any>;
}

export interface AppState {
  companyInfo: CompanyInfo | null;
  currentUser: User | null;
  theme: ThemeMode;
  language: Language;
  sidebarCollapsed: boolean;
}

export interface Proposal {
  id: string;
  prospectId: string;
  content: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  value: number;
  validUntil: Date;
  createdAt: Date;
  updatedAt: Date;
}
