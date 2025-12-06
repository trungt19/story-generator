'use client';

import { useState, useEffect } from 'react';
import { useStoryGenerator } from '@/hooks/useStoryGenerator';
import { useStoryHistory, type StoredStory } from '@/hooks/useStoryHistory';
import { StoryForm } from '@/components/StoryForm';
import { StoryDisplay } from '@/components/StoryDisplay';
import { StoryHistory } from '@/components/StoryHistory';
import type { Story } from '@/types/story';

type ViewMode = 'create' | 'view' | 'history';

export default function Home() {
  const { story, isGenerating, error, generate, reset } = useStoryGenerator();
  const { stories, addStory, removeStory, clearHistory, isLoaded } = useStoryHistory();

  const [viewMode, setViewMode] = useState<ViewMode>('create');
  const [selectedStory, setSelectedStory] = useState<StoredStory | null>(null);
  const [continuationPrompt, setContinuationPrompt] = useState<string>('');
  const [isContinuationMode, setIsContinuationMode] = useState(false);

  // Save story to history when generated
  useEffect(() => {
    if (story) {
      addStory(story);
    }
  }, [story, addStory]);

  // Update view mode when story is generated
  useEffect(() => {
    if (story) {
      setViewMode('view');
      setIsContinuationMode(false);
    }
  }, [story]);

  const handleReset = () => {
    reset();
    setSelectedStory(null);
    setContinuationPrompt('');
    setIsContinuationMode(false);
    setViewMode('create');
  };

  const handleSelectStory = (historyStory: StoredStory) => {
    setSelectedStory(historyStory);
    setViewMode('view');
  };

  const handleContinueStory = (historyStory: StoredStory) => {
    // Prepare continuation prompt
    const lastParagraph = historyStory.content.split('\n\n').slice(-2).join('\n\n');
    setContinuationPrompt(`Continue this story:\n\n"${lastParagraph}"\n\nWhat happens next?`);
    setIsContinuationMode(true);
    setViewMode('create');
  };

  const displayStory: Story | null = selectedStory
    ? { ...selectedStory, createdAt: new Date(selectedStory.createdAt) }
    : story;

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Decorative floating orbs */}
      <div
        className="floating-orb w-96 h-96 bg-purple-400 top-[-10%] left-[-5%]"
        style={{ animationDelay: '0s' }}
      />
      <div
        className="floating-orb w-80 h-80 bg-indigo-400 top-[60%] right-[-10%]"
        style={{ animationDelay: '-5s' }}
      />
      <div
        className="floating-orb w-64 h-64 bg-pink-400 bottom-[-5%] left-[30%]"
        style={{ animationDelay: '-10s' }}
      />

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="text-center mb-8 slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Powered by Claude Sonnet 4
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                StoryForge
              </span>
              <span className="text-neutral-800 dark:text-neutral-100"> AI</span>
            </h1>

            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-6">
              Transform your ideas into captivating stories. Choose your genre,
              set the mood, and watch as AI crafts unique narratives just for you.
            </p>

            {/* Navigation Tabs */}
            <div className="inline-flex items-center gap-2 p-1 bg-white/50 dark:bg-neutral-800/50 rounded-xl backdrop-blur-sm">
              <button
                onClick={() => {
                  setViewMode('create');
                  setSelectedStory(null);
                  if (!isContinuationMode) {
                    setContinuationPrompt('');
                  }
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'create'
                    ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create
                </span>
              </button>

              {displayStory && (
                <button
                  onClick={() => setViewMode('view')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'view'
                      ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Current Story
                  </span>
                </button>
              )}

              <button
                onClick={() => setViewMode('history')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'history'
                    ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  History
                  {stories.length > 0 && (
                    <span className="bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 text-xs px-1.5 py-0.5 rounded-full">
                      {stories.length}
                    </span>
                  )}
                </span>
              </button>
            </div>
          </header>

          {/* Error display */}
          {error && (
            <div className="max-w-2xl mx-auto mb-8 fade-in">
              <div className="glass-card rounded-xl p-4 border-l-4 border-red-500">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-800 dark:text-red-300">Error generating story</h3>
                    <p className="text-sm text-red-700 dark:text-red-400 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main content */}
          <div className="fade-in" style={{ animationDelay: '0.2s' }}>
            {viewMode === 'create' && (
              <StoryForm
                onSubmit={generate}
                isGenerating={isGenerating}
                initialPrompt={continuationPrompt}
                continuationMode={isContinuationMode}
              />
            )}

            {viewMode === 'view' && displayStory && (
              <StoryDisplay story={displayStory} onReset={handleReset} />
            )}

            {viewMode === 'history' && isLoaded && (
              <div className="max-w-3xl mx-auto">
                <StoryHistory
                  stories={stories}
                  onSelect={handleSelectStory}
                  onDelete={removeStory}
                  onClear={clearHistory}
                  onContinue={handleContinueStory}
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="mt-16 text-center text-sm text-neutral-500 dark:text-neutral-500">
            <p>
              Built with Next.js and Claude AI
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
