'use client';

import { useState } from 'react';
import type { StoryParameters, StoryGenre, StoryTone, StoryLength } from '@/types/story';

interface StoryFormProps {
  onSubmit: (params: StoryParameters) => void;
  isGenerating: boolean;
}

const genreConfig: { value: StoryGenre; label: string; icon: string }[] = [
  { value: 'fantasy', label: 'Fantasy', icon: '🏰' },
  { value: 'sci-fi', label: 'Sci-Fi', icon: '🚀' },
  { value: 'mystery', label: 'Mystery', icon: '🔍' },
  { value: 'romance', label: 'Romance', icon: '💕' },
  { value: 'horror', label: 'Horror', icon: '👻' },
  { value: 'adventure', label: 'Adventure', icon: '🗺️' },
  { value: 'thriller', label: 'Thriller', icon: '⚡' },
  { value: 'comedy', label: 'Comedy', icon: '😄' },
  { value: 'drama', label: 'Drama', icon: '🎭' },
  { value: 'historical', label: 'Historical', icon: '📜' },
];

const toneConfig: { value: StoryTone; label: string }[] = [
  { value: 'lighthearted', label: 'Lighthearted' },
  { value: 'dark', label: 'Dark' },
  { value: 'humorous', label: 'Humorous' },
  { value: 'serious', label: 'Serious' },
  { value: 'suspenseful', label: 'Suspenseful' },
  { value: 'whimsical', label: 'Whimsical' },
  { value: 'inspirational', label: 'Inspirational' },
];

const lengthConfig: { value: StoryLength; label: string; description: string }[] = [
  { value: 'short', label: 'Short', description: '500-1000 words' },
  { value: 'medium', label: 'Medium', description: '1000-2500 words' },
  { value: 'long', label: 'Long', description: '2500-5000 words' },
];

export function StoryForm({ onSubmit, isGenerating }: StoryFormProps) {
  const [genre, setGenre] = useState<StoryGenre>('fantasy');
  const [tone, setTone] = useState<StoryTone>('lighthearted');
  const [length, setLength] = useState<StoryLength>('short');
  const [prompt, setPrompt] = useState('');
  const [setting, setSetting] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) {
      return;
    }

    const params: StoryParameters = {
      genre,
      tone,
      length,
      prompt: prompt.trim(),
      setting: setting.trim() || undefined,
    };

    onSubmit(params);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-neutral-200 dark:border-neutral-700">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">Create Your Story</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Fill in the details below to generate a unique story</p>
          </div>
        </div>

        {/* Story Prompt */}
        <div className="space-y-2">
          <label htmlFor="prompt" className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Story Idea
            <span className="text-red-500">*</span>
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your story idea... What's the plot? Who are the characters? What happens?"
            className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 input-focus min-h-[140px] resize-none"
            disabled={isGenerating}
            required
          />
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Tip: The more detail you provide, the better your story will be!
          </p>
        </div>

        {/* Genre Selection */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Genre
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {genreConfig.map((g) => (
              <button
                key={g.value}
                type="button"
                onClick={() => setGenre(g.value)}
                disabled={isGenerating}
                className={`
                  px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  flex items-center justify-center gap-1.5
                  ${genre === g.value
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                <span>{g.icon}</span>
                <span>{g.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tone and Length Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Tone Selection */}
          <div className="space-y-2">
            <label htmlFor="tone" className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Tone
            </label>
            <select
              id="tone"
              value={tone}
              onChange={(e) => setTone(e.target.value as StoryTone)}
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 input-focus cursor-pointer"
              disabled={isGenerating}
            >
              {toneConfig.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Length Selection */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              Length
            </label>
            <div className="flex gap-2">
              {lengthConfig.map((l) => (
                <button
                  key={l.value}
                  type="button"
                  onClick={() => setLength(l.value)}
                  disabled={isGenerating}
                  className={`
                    flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${length === l.value
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                      : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                  title={l.description}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {lengthConfig.find(l => l.value === length)?.description}
            </p>
          </div>
        </div>

        {/* Setting (Optional) */}
        <div className="space-y-2">
          <label htmlFor="setting" className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Setting
            <span className="text-xs font-normal text-neutral-400">(Optional)</span>
          </label>
          <input
            id="setting"
            type="text"
            value={setting}
            onChange={(e) => setSetting(e.target.value)}
            placeholder="e.g., Medieval castle, Space station, Victorian London..."
            className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 input-focus"
            disabled={isGenerating}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isGenerating || !prompt.trim()}
          className="w-full btn-primary text-white py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-3"
        >
          {isGenerating ? (
            <>
              <div className="spinner" />
              <span>Crafting Your Story...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Generate Story</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
