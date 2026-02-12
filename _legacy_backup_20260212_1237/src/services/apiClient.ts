import type { 
  ApiResponse, 
  GeminiRequest, 
  GeminiResponse,
  Contact,
  Campaign,
  CalendarEvent,
  Prospect,
  Proposal,
  Partner,
  SocialPost,
  Story,
  RoadmapItem
} from '../types';

const API_BASE_URL = '/api';

class ApiClient {
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ 
          error: `HTTP ${response.status}: ${response.statusText}` 
        }));
        return {
          success: false,
          error: error.error || error.message || 'Request failed',
        };
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // Gemini AI
  async callGemini(request: GeminiRequest): Promise<ApiResponse<GeminiResponse>> {
    return this.request<GeminiResponse>('/gemini', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  // Contacts
  async getContacts(): Promise<ApiResponse<Contact[]>> {
    return this.request<Contact[]>('/contacts');
  }

  async createContact(contact: Omit<Contact, 'id'>): Promise<ApiResponse<Contact>> {
    return this.request<Contact>('/contacts', {
      method: 'POST',
      body: JSON.stringify(contact),
    });
  }

  async updateContact(id: string, contact: Partial<Contact>): Promise<ApiResponse<Contact>> {
    return this.request<Contact>(`/contacts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(contact),
    });
  }

  async deleteContact(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/contacts/${id}`, {
      method: 'DELETE',
    });
  }

  // Campaigns
  async getCampaigns(): Promise<ApiResponse<Campaign[]>> {
    return this.request<Campaign[]>('/campaigns');
  }

  async createCampaign(campaign: Omit<Campaign, 'id'>): Promise<ApiResponse<Campaign>> {
    return this.request<Campaign>('/campaigns', {
      method: 'POST',
      body: JSON.stringify(campaign),
    });
  }

  async updateCampaign(id: string, campaign: Partial<Campaign>): Promise<ApiResponse<Campaign>> {
    return this.request<Campaign>(`/campaigns/${id}`, {
      method: 'PUT',
      body: JSON.stringify(campaign),
    });
  }

  // Calendar Events
  async getEvents(): Promise<ApiResponse<CalendarEvent[]>> {
    return this.request<CalendarEvent[]>('/events');
  }

  async createEvent(event: Omit<CalendarEvent, 'id'>): Promise<ApiResponse<CalendarEvent>> {
    return this.request<CalendarEvent>('/events', {
      method: 'POST',
      body: JSON.stringify(event),
    });
  }

  async updateEvent(id: string, event: Partial<CalendarEvent>): Promise<ApiResponse<CalendarEvent>> {
    return this.request<CalendarEvent>(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(event),
    });
  }

  async deleteEvent(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/events/${id}`, {
      method: 'DELETE',
    });
  }

  // Prospects
  async getProspects(): Promise<ApiResponse<Prospect[]>> {
    return this.request<Prospect[]>('/prospects');
  }

  async createProspect(prospect: Omit<Prospect, 'id'>): Promise<ApiResponse<Prospect>> {
    return this.request<Prospect>('/prospects', {
      method: 'POST',
      body: JSON.stringify(prospect),
    });
  }

  async updateProspect(id: string, prospect: Partial<Prospect>): Promise<ApiResponse<Prospect>> {
    return this.request<Prospect>(`/prospects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(prospect),
    });
  }

  // Proposals
  async getProposals(): Promise<ApiResponse<Proposal[]>> {
    return this.request<Proposal[]>('/proposals');
  }

  async createProposal(proposal: Omit<Proposal, 'id'>): Promise<ApiResponse<Proposal>> {
    return this.request<Proposal>('/proposals', {
      method: 'POST',
      body: JSON.stringify(proposal),
    });
  }

  async generateProposal(prospectId: string, requirements: string): Promise<ApiResponse<Proposal>> {
    return this.request<Proposal>('/proposals/generate', {
      method: 'POST',
      body: JSON.stringify({ prospectId, requirements }),
    });
  }

  // Partners
  async getPartners(): Promise<ApiResponse<Partner[]>> {
    return this.request<Partner[]>('/partners');
  }

  async createPartner(partner: Omit<Partner, 'id'>): Promise<ApiResponse<Partner>> {
    return this.request<Partner>('/partners', {
      method: 'POST',
      body: JSON.stringify(partner),
    });
  }

  async updatePartner(id: string, partner: Partial<Partner>): Promise<ApiResponse<Partner>> {
    return this.request<Partner>(`/partners/${id}`, {
      method: 'PUT',
      body: JSON.stringify(partner),
    });
  }

  // Social Media
  async getSocialPosts(): Promise<ApiResponse<SocialPost[]>> {
    return this.request<SocialPost[]>('/social/posts');
  }

  async createSocialPost(post: Omit<SocialPost, 'id'>): Promise<ApiResponse<SocialPost>> {
    return this.request<SocialPost>('/social/posts', {
      method: 'POST',
      body: JSON.stringify(post),
    });
  }

  async generateSocialPost(prompt: string, platform: string): Promise<ApiResponse<SocialPost>> {
    return this.request<SocialPost>('/social/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt, platform }),
    });
  }

  async getStories(): Promise<ApiResponse<Story[]>> {
    return this.request<Story[]>('/social/stories');
  }

  async createStory(story: Omit<Story, 'id'>): Promise<ApiResponse<Story>> {
    return this.request<Story>('/social/stories', {
      method: 'POST',
      body: JSON.stringify(story),
    });
  }

  // Roadmap
  async getRoadmapItems(): Promise<ApiResponse<RoadmapItem[]>> {
    return this.request<RoadmapItem[]>('/roadmap');
  }

  async createRoadmapItem(item: Omit<RoadmapItem, 'id'>): Promise<ApiResponse<RoadmapItem>> {
    return this.request<RoadmapItem>('/roadmap', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  }

  async updateRoadmapItem(id: string, item: Partial<RoadmapItem>): Promise<ApiResponse<RoadmapItem>> {
    return this.request<RoadmapItem>(`/roadmap/${id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
    });
  }

  async voteRoadmapItem(id: string): Promise<ApiResponse<RoadmapItem>> {
    return this.request<RoadmapItem>(`/roadmap/${id}/vote`, {
      method: 'POST',
    });
  }

  // Document Generation
  async generateDocument(type: string, data: any): Promise<ApiResponse<Blob>> {
    const response = await fetch(`${API_BASE_URL}/documents/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, data }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: 'Failed to generate document',
      };
    }

    const blob = await response.blob();
    return {
      success: true,
      data: blob,
    };
  }

  // File Upload
  async uploadFile(file: File, type: string): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        return {
          success: false,
          error: 'Upload failed',
        };
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload error',
      };
    }
  }
}

export const apiClient = new ApiClient();
export default apiClient;
