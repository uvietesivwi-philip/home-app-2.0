export type ContentCategory = 'cook' | 'care' | 'diy' | 'family';
export type ContentType = 'activity' | 'story' | 'tutorial' | 'recipe';

export interface AppUser {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  role?: 'user' | 'admin';
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  category: ContentCategory;
  subcategory?: string;
  type?: ContentType;
  difficulty?: 'easy' | 'medium' | 'hard';
  mediaUrl?: string;
  duration?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface SavedContent {
  id: string;
  userId: string;
  contentId: string;
  savedAt?: string;
}

export interface ContentProgress {
  id: string;
  userId: string;
  contentId: string;
  progressSeconds: number;
  updatedAt?: string;
}

export interface ServiceRequest {
  id: string;
  userId: string;
  type: 'maid' | 'driver' | 'caregiver' | 'nanny';
  notes: string;
  status: 'pending' | 'approved' | 'in_progress' | 'completed' | 'cancelled';
  createdAt?: string;
}
