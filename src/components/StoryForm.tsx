'use client';

import { useState } from 'react';
import type { StoryParameters, StoryGenre, StoryTone, StoryLength } from '@/types/story';

interface StoryFormProps {
  onSubmit: (params: StoryParameters) => void;
  isGenerating: boolean;
}

const genres: StoryGenre[] = ['fantasy', 'sci-fi', 'mystery', 'romance', 'horror', 'adventure', 'thriller', 'comedy', 'drama', 'historical'];
const tones: StoryTone[] = ['lighthearted', 'dark', 'humorous', 'serious', 'suspenseful', 'whimsical', 'inspirational'];
const lengths: StoryLength[] = ['short', 'medium', 'long'];

export function StoryForm({ onSubmit, isGenerating }: StoryFormProps) {
  const [genre, setGenre] = useState<StoryGenre>('fantasy');
  const [tone, setTone] = useState<StoryTone>('lighthearted');
  const [length, setLength] = useState<StoryLength>('short');
  const [prompt, setPrompt] = useState('');
  const [setting, setSetting] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) {
      alert('Please enter a story prompt');
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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">Generate Your Story</h2>

      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
          Story Prompt *
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your story idea..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
          disabled={isGenerating}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-2">
            Genre
          </label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value as StoryGenre)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isGenerating}
          >
            {genres.map((g) => (
              <option key={g} value={g}>
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-2">
            Tone
          </label>
          <select
            id="tone"
            value={tone}
            onChange={(e) => setTone(e.target.value as StoryTone)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isGenerating}
          >
            {tones.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-2">
            Length
          </label>
          <select
            id="length"
            value={length}
            onChange={(e) => setLength(e.target.value as StoryLength)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isGenerating}
          >
            {lengths.map((l) => (
              <option key={l} value={l}>
                {l.charAt(0).toUpperCase() + l.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="setting" className="block text-sm font-medium text-gray-700 mb-2">
          Setting (Optional)
        </label>
        <input
          id="setting"
          type="text"
          value={setting}
          onChange={(e) => setSetting(e.target.value)}
          placeholder="e.g., Medieval castle, Space station..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isGenerating}
        />
      </div>

      <button
        type="submit"
        disabled={isGenerating}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isGenerating ? 'Generating Story...' : 'Generate Story'}
      </button>
    </form>
  );
}
