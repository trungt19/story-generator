'use client';

import type { Story } from '@/types/story';

interface StoryDisplayProps {
  story: Story;
  onReset: () => void;
}

export function StoryDisplay({ story, onReset }: StoryDisplayProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{story.title}</h2>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {story.parameters.genre}
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
              {story.parameters.tone}
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
              {story.wordCount} words
            </span>
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
              {story.parameters.length}
            </span>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {story.content}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onReset}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Generate Another Story
        </button>

        <button
          onClick={() => {
            navigator.clipboard.writeText(story.content);
            alert('Story copied to clipboard!');
          }}
          className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-md font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
}
