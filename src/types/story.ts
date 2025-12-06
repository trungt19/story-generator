export type StoryGenre =
  | 'fantasy'
  | 'sci-fi'
  | 'mystery'
  | 'romance'
  | 'horror'
  | 'adventure'
  | 'thriller'
  | 'comedy'
  | 'drama'
  | 'historical';

export type StoryTone =
  | 'lighthearted'
  | 'dark'
  | 'humorous'
  | 'serious'
  | 'suspenseful'
  | 'whimsical'
  | 'inspirational';

export type StoryLength = 'short' | 'medium' | 'long';

export type GenerationStatus = 'idle' | 'generating' | 'completed' | 'error';

export interface Character {
  id: string;
  name: string;
  role: 'protagonist' | 'antagonist' | 'supporting';
  traits?: string[];
  description?: string;
}

export interface StoryParameters {
  genre: StoryGenre;
  tone: StoryTone;
  length: StoryLength;
  prompt: string;
  characters?: Character[];
  setting?: string;
  themes?: string[];
}

export interface StoryMetadata {
  id: string;
  title: string;
  createdAt: Date;
  parameters: StoryParameters;
  wordCount: number;
}

export interface Story extends StoryMetadata {
  content: string;
  summary?: string;
}

export interface GenerationState {
  status: GenerationStatus;
  story: Story | null;
  error: string | null;
  progress?: number;
}

export interface SavedStory {
  id: string;
  title: string;
  content: string;
  genre: StoryGenre;
  createdAt: string;
  wordCount: number;
}
