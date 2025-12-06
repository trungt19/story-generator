'use client';

import { useState } from 'react';
import type { Story } from '@/types/story';
import { exportStory, getExportFormats, type ExportFormat } from '@/lib/exportStory';

interface StoryDisplayProps {
  story: Story;
  onReset: () => void;
}

const genreColors: Record<string, { bg: string; text: string; icon: string }> = {
  fantasy: { bg: 'bg-purple-100 dark:bg-purple-900/40', text: 'text-purple-700 dark:text-purple-300', icon: '🏰' },
  'sci-fi': { bg: 'bg-cyan-100 dark:bg-cyan-900/40', text: 'text-cyan-700 dark:text-cyan-300', icon: '🚀' },
  mystery: { bg: 'bg-amber-100 dark:bg-amber-900/40', text: 'text-amber-700 dark:text-amber-300', icon: '🔍' },
  romance: { bg: 'bg-pink-100 dark:bg-pink-900/40', text: 'text-pink-700 dark:text-pink-300', icon: '💕' },
  horror: { bg: 'bg-red-100 dark:bg-red-900/40', text: 'text-red-700 dark:text-red-300', icon: '👻' },
  adventure: { bg: 'bg-emerald-100 dark:bg-emerald-900/40', text: 'text-emerald-700 dark:text-emerald-300', icon: '🗺️' },
  thriller: { bg: 'bg-orange-100 dark:bg-orange-900/40', text: 'text-orange-700 dark:text-orange-300', icon: '⚡' },
  comedy: { bg: 'bg-yellow-100 dark:bg-yellow-900/40', text: 'text-yellow-700 dark:text-yellow-300', icon: '😄' },
  drama: { bg: 'bg-indigo-100 dark:bg-indigo-900/40', text: 'text-indigo-700 dark:text-indigo-300', icon: '🎭' },
  historical: { bg: 'bg-stone-100 dark:bg-stone-900/40', text: 'text-stone-700 dark:text-stone-300', icon: '📜' },
};

const toneColors: Record<string, { bg: string; text: string }> = {
  lighthearted: { bg: 'bg-sky-100 dark:bg-sky-900/40', text: 'text-sky-700 dark:text-sky-300' },
  dark: { bg: 'bg-slate-200 dark:bg-slate-800/60', text: 'text-slate-700 dark:text-slate-300' },
  humorous: { bg: 'bg-lime-100 dark:bg-lime-900/40', text: 'text-lime-700 dark:text-lime-300' },
  serious: { bg: 'bg-zinc-100 dark:bg-zinc-900/40', text: 'text-zinc-700 dark:text-zinc-300' },
  suspenseful: { bg: 'bg-rose-100 dark:bg-rose-900/40', text: 'text-rose-700 dark:text-rose-300' },
  whimsical: { bg: 'bg-fuchsia-100 dark:bg-fuchsia-900/40', text: 'text-fuchsia-700 dark:text-fuchsia-300' },
  inspirational: { bg: 'bg-teal-100 dark:bg-teal-900/40', text: 'text-teal-700 dark:text-teal-300' },
};

export function StoryDisplay({ story, onReset }: StoryDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const exportFormats = getExportFormats();

  const handleExport = (format: ExportFormat) => {
    exportStory(story, format);
    setShowExportMenu(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${story.title}\n\n${story.content}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = `${story.title}\n\n${story.content}`;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const genreStyle = genreColors[story.parameters.genre] || genreColors.fantasy;
  const toneStyle = toneColors[story.parameters.tone] || toneColors.lighthearted;

  return (
    <div className="max-w-4xl mx-auto space-y-6 slide-up">
      {/* Story Card */}
      <div className="glass-card rounded-2xl overflow-hidden">
        {/* Story Header */}
        <div className="bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 p-6 sm:p-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`badge ${genreStyle.bg} ${genreStyle.text}`}>
              <span>{genreStyle.icon}</span>
              {story.parameters.genre}
            </span>
            <span className={`badge ${toneStyle.bg} ${toneStyle.text}`}>
              {story.parameters.tone}
            </span>
            <span className="badge bg-white/20 text-white">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {story.wordCount.toLocaleString()} words
            </span>
            <span className="badge bg-white/20 text-white capitalize">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              {story.parameters.length}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
            {story.title}
          </h1>
        </div>

        {/* Story Content */}
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="story-content whitespace-pre-wrap">
            {story.content}
          </div>
        </div>

        {/* Story Footer */}
        <div className="px-6 sm:px-8 pb-6 sm:pb-8">
          <div className="flex items-center justify-between pt-6 border-t border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generated by Claude AI
            </div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              ~{Math.ceil(story.wordCount / 200)} min read
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onReset}
          className="flex-1 btn-primary text-white py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create New Story
        </button>

        <button
          onClick={handleCopy}
          className="flex-1 btn-secondary py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-3"
        >
          {copied ? (
            <>
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-600 dark:text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy Story
            </>
          )}
        </button>

        {/* Export Dropdown */}
        <div className="relative flex-1">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="w-full btn-secondary py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
            <svg className={`w-4 h-4 transition-transform ${showExportMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showExportMenu && (
            <div className="absolute bottom-full left-0 right-0 mb-2 glass-card rounded-xl overflow-hidden shadow-xl z-10 fade-in">
              {exportFormats.map((format) => (
                <button
                  key={format.value}
                  onClick={() => handleExport(format.value)}
                  className="w-full px-4 py-3 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium text-neutral-800 dark:text-neutral-200">{format.label}</div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">{format.description}</div>
                  </div>
                  <span className="text-xs bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded text-neutral-600 dark:text-neutral-400">
                    .{format.value === 'markdown' ? 'md' : format.value}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
