'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Story } from '@/types/story';

const STORAGE_KEY = 'storyforge_history';
const MAX_STORIES = 50;

export interface StoredStory extends Omit<Story, 'createdAt'> {
  createdAt: string; // ISO string for serialization
}

export function useStoryHistory() {
  const [stories, setStories] = useState<StoredStory[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load stories from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as StoredStory[];
        setStories(parsed);
      }
    } catch (error) {
      console.error('Failed to load story history:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever stories change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
      } catch (error) {
        console.error('Failed to save story history:', error);
      }
    }
  }, [stories, isLoaded]);

  const addStory = useCallback((story: Story) => {
    const storedStory: StoredStory = {
      ...story,
      createdAt: story.createdAt instanceof Date
        ? story.createdAt.toISOString()
        : story.createdAt,
    };

    setStories((prev) => {
      // Check if story already exists
      const exists = prev.some((s) => s.id === story.id);
      if (exists) return prev;

      // Add new story at the beginning, limit to MAX_STORIES
      const updated = [storedStory, ...prev].slice(0, MAX_STORIES);
      return updated;
    });
  }, []);

  const removeStory = useCallback((storyId: string) => {
    setStories((prev) => prev.filter((s) => s.id !== storyId));
  }, []);

  const clearHistory = useCallback(() => {
    setStories([]);
  }, []);

  const getStory = useCallback((storyId: string): StoredStory | undefined => {
    return stories.find((s) => s.id === storyId);
  }, [stories]);

  return {
    stories,
    isLoaded,
    addStory,
    removeStory,
    clearHistory,
    getStory,
  };
}
