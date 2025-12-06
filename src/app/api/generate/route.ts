import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import type { StoryParameters } from '@/types/story';
import { rateLimit, getClientIdentifier } from '@/lib/rateLimit';
import { estimateCost, logUsage } from '@/lib/usageTracker';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const wordCountTargets = {
  short: { min: 500, max: 1000, tokens: 1500 },
  medium: { min: 1000, max: 2500, tokens: 3000 },
  long: { min: 2500, max: 5000, tokens: 4096 },
} as const;

// Rate limit: 10 requests per hour per IP
const RATE_LIMIT_CONFIG = {
  maxRequests: 10,
  windowMs: 60 * 60 * 1000, // 1 hour
};

function buildStoryPrompt(params: StoryParameters): string {
  const { genre, tone, length, prompt, characters, setting, themes } = params;
  const wordTarget = wordCountTargets[length];

  let systemPrompt = `You are a creative fiction writer. Generate a ${length} ${genre} story with a ${tone} tone.`;
  let userPrompt = `Write a story based on this prompt: ${prompt}\n\n`;

  userPrompt += `Requirements:\n`;
  userPrompt += `- Genre: ${genre}\n`;
  userPrompt += `- Tone: ${tone}\n`;
  userPrompt += `- Target length: ${wordTarget.min}-${wordTarget.max} words\n`;

  if (setting) {
    userPrompt += `- Setting: ${setting}\n`;
  }

  if (themes && themes.length > 0) {
    userPrompt += `- Themes: ${themes.join(', ')}\n`;
  }

  if (characters && characters.length > 0) {
    userPrompt += `\nCharacters:\n`;
    characters.forEach(char => {
      userPrompt += `- ${char.name} (${char.role})${char.description ? ': ' + char.description : ''}\n`;
    });
  }

  userPrompt += `\nProvide ONLY the story text. Do not include title, explanations, or meta-commentary.`;

  return systemPrompt + '\n\n' + userPrompt;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = getClientIdentifier(request);
    const rateLimitResult = rateLimit(clientIp, RATE_LIMIT_CONFIG);

    if (!rateLimitResult.success) {
      const resetDate = new Date(rateLimitResult.resetTime);
      return NextResponse.json(
        {
          error: 'Rate limit exceeded. Please try again later.',
          resetAt: resetDate.toISOString(),
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': String(RATE_LIMIT_CONFIG.maxRequests),
            'X-RateLimit-Remaining': String(rateLimitResult.remaining),
            'X-RateLimit-Reset': String(rateLimitResult.resetTime),
          },
        }
      );
    }

    const params: StoryParameters = await request.json();

    if (!params.prompt || !params.genre || !params.tone || !params.length) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const prompt = buildStoryPrompt(params);
    const wordTarget = wordCountTargets[params.length];

    const response = await anthropic.messages.create({
      model: 'claude-opus-4-5-20251101',
      max_tokens: wordTarget.tokens,
      temperature: 0.7,
      messages: [{
        role: 'user',
        content: prompt,
      }],
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from API');
    }

    const storyText = content.text;
    const wordCount = storyText.split(/\s+/).length;

    // Calculate and log cost
    const cost = estimateCost({
      promptLength: prompt.split(' ').length,
      outputWordCount: wordCount,
    });

    logUsage({
      timestamp: new Date().toISOString(),
      ip: clientIp,
      storyLength: params.length,
      wordCount,
      estimatedCost: cost,
    });

    const story = {
      id: crypto.randomUUID(),
      title: params.prompt.split(' ').slice(0, 5).join(' ').replace(/[^\w\s]/gi, ''),
      content: storyText,
      createdAt: new Date(),
      parameters: params,
      wordCount,
    };

    return NextResponse.json(story, {
      headers: {
        'X-RateLimit-Limit': String(RATE_LIMIT_CONFIG.maxRequests),
        'X-RateLimit-Remaining': String(rateLimitResult.remaining),
        'X-RateLimit-Reset': String(rateLimitResult.resetTime),
      },
    });
  } catch (error) {
    console.error('Story generation failed:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate story' },
      { status: 500 }
    );
  }
}
