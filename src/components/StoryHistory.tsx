'use client';

import { useState } from 'react';
import type { StoredStory } from '@/hooks/useStoryHistory';

interface StoryHistoryProps {
  stories: StoredStory[];
  onSelect: (story: StoredStory) => void;
  onDelete: (storyId: string) => void;
  onClear: () => void;
  onContinue: (story: StoredStory) => void;
}

const genreIcons: Record<string, string> = {
  fantasy: '🏰',
  'sci-fi': '🚀',
  mystery: '🔍',
  romance: '💕',
  horror: '👻',
  adventure: '🗺️',
  thriller: '⚡',
  comedy: '😄',
  drama: '🎭',
  historical: '📜',
};

export function StoryHistory({ stories, onSelect, onDelete, onClear, onContinue }: StoryHistoryProps) {
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  if (stories.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-6 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
          <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-2">No stories yet</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Your generated stories will appear here</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="font-semibold text-neutral-800 dark:text-neutral-200">Story History</h3>
          <span className="text-xs bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 px-2 py-0.5 rounded-full">
            {stories.length}
          </span>
        </div>

        {showConfirmClear ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500">Clear all?</span>
            <button
              onClick={() => {
                onClear();
                setShowConfirmClear(false);
              }}
              className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Yes
            </button>
            <button
              onClick={() => setShowConfirmClear(false)}
              className="text-xs px-2 py-1 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
            >
              No
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowConfirmClear(true)}
            className="text-xs text-neutral-500 hover:text-red-500 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Story List */}
      <div className="max-h-[400px] overflow-y-auto">
        {stories.map((story) => {
          const date = new Date(story.createdAt);
          const timeAgo = getTimeAgo(date);

          return (
            <div
              key={story.id}
              className="p-4 border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <button
                  onClick={() => onSelect(story)}
                  className="flex-1 text-left"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{genreIcons[story.parameters.genre] || '📖'}</span>
                    <h4 className="font-medium text-neutral-800 dark:text-neutral-200 line-clamp-1">
                      {story.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                    <span className="capitalize">{story.parameters.genre}</span>
                    <span>•</span>
                    <span>{story.wordCount.toLocaleString()} words</span>
                    <span>•</span>
                    <span>{timeAgo}</span>
                  </div>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onContinue(story)}
                    className="p-2 text-neutral-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded-lg transition-colors"
                    title="Continue this story"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(story.id)}
                    className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    title="Delete story"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}
