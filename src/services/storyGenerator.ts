import type { StoryParameters, Story } from '@/types/story';

export async function generateStory(params: StoryParameters): Promise<Story> {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate story');
    }

    const story: Story = await response.json();
    return story;
  } catch (error) {
    console.error('Story generation failed:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to generate story'
    );
  }
}
