export interface Video {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  videoUrl: string;
  duration?: number; // 秒単位
  createdAt: string;
  updatedAt: string;
  published: boolean;
  views: number;
  likes: number;
  categoryId?: string;
}

export interface VideoInput {
  title: string;
  description?: string;
  thumbnailUrl?: string;
  videoUrl: string;
  duration?: number;
  published?: boolean;
  categoryId?: string;
} 