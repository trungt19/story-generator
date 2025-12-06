interface UsageStats {
  timestamp: string;
  ip: string;
  storyLength: 'short' | 'medium' | 'long';
  wordCount: number;
  estimatedCost: number;
}

const COST_PER_1M_INPUT_TOKENS = 5;
const COST_PER_1M_OUTPUT_TOKENS = 25;
const WORDS_TO_TOKENS_RATIO = 0.75;

export function estimateCost(params: {
  promptLength: number;
  outputWordCount: number;
}): number {
  const inputTokens = params.promptLength * WORDS_TO_TOKENS_RATIO;
  const outputTokens = params.outputWordCount * WORDS_TO_TOKENS_RATIO;

  const inputCost = (inputTokens / 1_000_000) * COST_PER_1M_INPUT_TOKENS;
  const outputCost = (outputTokens / 1_000_000) * COST_PER_1M_OUTPUT_TOKENS;

  return inputCost + outputCost;
}

export function logUsage(stats: UsageStats): void {
  const logEntry = {
    ...stats,
    timestamp: new Date().toISOString(),
  };

  // Log to console (in production, send to analytics service)
  console.log('[USAGE]', JSON.stringify(logEntry));

  // In production, you'd send this to:
  // - Vercel Analytics
  // - PostHog
  // - Custom database
  // - CloudWatch/Datadog
}

export function getDailyCostEstimate(requestsPerDay: number, avgWordCount: number): {
  daily: number;
  monthly: number;
  yearly: number;
} {
  const costPerRequest = estimateCost({
    promptLength: 100,
    outputWordCount: avgWordCount,
  });

  const daily = requestsPerDay * costPerRequest;
  const monthly = daily * 30;
  const yearly = daily * 365;

  return { daily, monthly, yearly };
}
