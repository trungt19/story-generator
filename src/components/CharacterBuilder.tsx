'use client';

import { useState } from 'react';
import type { Character } from '@/types/story';

interface CharacterBuilderProps {
  characters: Character[];
  onChange: (characters: Character[]) => void;
  disabled?: boolean;
}

const roleConfig = [
  { value: 'protagonist', label: 'Hero', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' },
  { value: 'antagonist', label: 'Villain', color: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300' },
  { value: 'supporting', label: 'Support', color: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' },
] as const;

export function CharacterBuilder({ characters, onChange, disabled }: CharacterBuilderProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newCharacter, setNewCharacter] = useState({
    name: '',
    role: 'protagonist' as Character['role'],
    description: '',
  });

  const addCharacter = () => {
    if (!newCharacter.name.trim()) return;

    const character: Character = {
      id: crypto.randomUUID(),
      name: newCharacter.name.trim(),
      role: newCharacter.role,
      description: newCharacter.description.trim() || undefined,
    };

    onChange([...characters, character]);
    setNewCharacter({ name: '', role: 'protagonist', description: '' });
  };

  const removeCharacter = (id: string) => {
    onChange(characters.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        disabled={disabled}
        className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors disabled:opacity-50"
      >
        <svg
          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Characters
        <span className="text-xs font-normal text-neutral-400">(Optional)</span>
        {characters.length > 0 && (
          <span className="text-xs bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 px-2 py-0.5 rounded-full">
            {characters.length}
          </span>
        )}
      </button>

      {isExpanded && (
        <div className="pl-6 space-y-4 fade-in">
          {/* Existing Characters */}
          {characters.length > 0 && (
            <div className="space-y-2">
              {characters.map((char) => {
                const roleStyle = roleConfig.find((r) => r.value === char.role);
                return (
                  <div
                    key={char.id}
                    className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                        {char.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-neutral-800 dark:text-neutral-200">
                            {char.name}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${roleStyle?.color}`}>
                            {roleStyle?.label}
                          </span>
                        </div>
                        {char.description && (
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">
                            {char.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeCharacter(char.id)}
                      disabled={disabled}
                      className="p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Add New Character Form */}
          <div className="space-y-3 p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-600">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={newCharacter.name}
                onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
                placeholder="Character name"
                disabled={disabled}
                className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 text-sm input-focus disabled:opacity-50"
              />
              <select
                value={newCharacter.role}
                onChange={(e) => setNewCharacter({ ...newCharacter, role: e.target.value as Character['role'] })}
                disabled={disabled}
                className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 text-sm input-focus disabled:opacity-50"
              >
                {roleConfig.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              value={newCharacter.description}
              onChange={(e) => setNewCharacter({ ...newCharacter, description: e.target.value })}
              placeholder="Brief description (optional)"
              disabled={disabled}
              className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 text-sm input-focus disabled:opacity-50"
            />
            <button
              type="button"
              onClick={addCharacter}
              disabled={disabled || !newCharacter.name.trim()}
              className="w-full py-2 px-4 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-medium hover:bg-primary-200 dark:hover:bg-primary-900/60 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + Add Character
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
