export interface CustomVideo {
  createdAt: Date;
  id: number;
  mp4: string;
  thumbnail: string;
  title: string;
  updatedAt: Date;
  videoId: string;
  description: string;
  tags: string[];
  metadata: {
    key: string;
    value: string;
  }[];
}

export interface InputData {
  title: string;
  description?: string;
  tags?: string[];
  metadata?: {
    key: string;
    value: string;
  }[];
}
export interface InputDataMetadata {
  key: string;
  value: string;
}
