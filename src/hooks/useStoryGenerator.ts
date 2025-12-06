'use client';

import { useState } from 'react';
import { generateStory } from '@/services/storyGenerator';
import type { StoryParameters, Story, GenerationStatus } from '@/types/story';

interface UseStoryGeneratorReturn {
  story: Story | null;
  status: GenerationStatus;
  error: string | null;
  isGenerating: boolean;
  generate: (params: StoryParameters) => Promise<void>;
  reset: () => void;
}

export function useStoryGenerator(): UseStoryGeneratorReturn {
  const [story, setStory] = useState<Story | null>(null);
  const [status, setStatus] = useState<GenerationStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const isGenerating = status === 'generating';

  const generate = async (params: StoryParameters) => {
    try {
      setStatus('generating');
      setError(null);
      setStory(null);

      const generatedStory = await generateStory(params);

      setStory(generatedStory);
      setStatus('completed');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate story';
      setError(errorMessage);
      setStatus('error');
    }
  };

  const reset = () => {
    setStory(null);
    setStatus('idle');
    setError(null);
  };

  return {
    story,
    status,
    error,
    isGenerating,
    generate,
    reset,
  };
}
