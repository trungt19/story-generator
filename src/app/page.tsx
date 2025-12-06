'use client';

import { useStoryGenerator } from '@/hooks/useStoryGenerator';
import { StoryForm } from '@/components/StoryForm';
import { StoryDisplay } from '@/components/StoryDisplay';

export default function Home() {
  const { story, isGenerating, error, generate, reset } = useStoryGenerator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            AI Story Generator
          </h1>
          <p className="text-xl text-gray-600">
            Create unique stories powered by Claude AI
          </p>
        </header>

        {error && (
          <div className="max-w-2xl mx-auto mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            <p className="font-medium">Error generating story:</p>
            <p>{error}</p>
          </div>
        )}

        {!story ? (
          <StoryForm onSubmit={generate} isGenerating={isGenerating} />
        ) : (
          <StoryDisplay story={story} onReset={reset} />
        )}
      </div>
    </div>
  );
}
