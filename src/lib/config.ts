export const config = {
  anthropic: {
    apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || '',
    model: 'claude-opus-4-5-20251101',
    maxTokens: 4096,
  },

  storyDefaults: {
    temperature: 0.7,
    streamingEnabled: false,
  },

  wordCountTargets: {
    short: { min: 500, max: 1000, tokens: 1500 },
    medium: { min: 1000, max: 2500, tokens: 3000 },
    long: { min: 2500, max: 5000, tokens: 4096 },
  },
} as const;
