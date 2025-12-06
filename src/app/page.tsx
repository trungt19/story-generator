'use client';

import { useStoryGenerator } from '@/hooks/useStoryGenerator';
import { StoryForm } from '@/components/StoryForm';
import { StoryDisplay } from '@/components/StoryDisplay';

export default function Home() {
  const { story, isGenerating, error, generate, reset } = useStoryGenerator();

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
          <header className="text-center mb-12 slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Powered by Claude AI
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                StoryForge
              </span>
              <span className="text-neutral-800 dark:text-neutral-100"> AI</span>
            </h1>

            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              Transform your ideas into captivating stories. Choose your genre,
              set the mood, and watch as AI crafts unique narratives just for you.
            </p>
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
            {!story ? (
              <StoryForm onSubmit={generate} isGenerating={isGenerating} />
            ) : (
              <StoryDisplay story={story} onReset={reset} />
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
