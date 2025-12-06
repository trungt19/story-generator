# AI Story Generator

A full-stack AI-powered story generator built with Next.js 16 and Claude Opus 4.5. Users can create unique stories by specifying genre, tone, length, and custom prompts.

**Live Demo:** [story-generator-lac-nine.vercel.app](https://story-generator-lac-nine.vercel.app)

![AI Story Generator](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![Claude API](https://img.shields.io/badge/Claude-Opus%204.5-orange)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat&logo=vercel)

## Features

- 🎭 **10 Genres** - Fantasy, Sci-Fi, Mystery, Romance, Horror, and more
- 🎨 **7 Tones** - Lighthearted, Dark, Humorous, Serious, and more
- 📏 **3 Lengths** - Short (500-1000 words), Medium, Long
- 🎯 **Custom Settings** - Add specific characters, settings, themes
- 🔒 **Secure** - API key protected server-side
- 🛡️ **Rate Limited** - 10 requests/hour to prevent abuse
- 📊 **Cost Tracking** - Automatic usage logging
- 📋 **Copy to Clipboard** - Easy story sharing
- ⚡ **Fast** - Edge deployment on Vercel

## Tech Stack

**Frontend:**
- [Next.js 16](https://nextjs.org) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org) - Type safety
- [Tailwind CSS](https://tailwindcss.com) - Styling
- React Hooks - State management

**Backend:**
- Next.js API Routes - Serverless functions
- [Claude Opus 4.5](https://www.anthropic.com/claude) - AI story generation
- Rate limiting - Cost protection
- Usage analytics

**DevOps:**
- [Vercel](https://vercel.com) - Deployment & hosting
- GitHub - Version control
- Environment variables - Secret management

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- Anthropic API key ([get one here](https://console.anthropic.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/trungt19/story-generator.git
   cd story-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```bash
   ANTHROPIC_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
story-generator/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── generate/
│   │   │       └── route.ts       # Story generation API endpoint
│   │   ├── layout.tsx
│   │   ├── page.tsx               # Main page
│   │   └── globals.css
│   ├── components/
│   │   ├── StoryForm.tsx          # Input form component
│   │   └── StoryDisplay.tsx       # Story display component
│   ├── hooks/
│   │   └── useStoryGenerator.ts   # Custom React hook
│   ├── lib/
│   │   ├── config.ts              # Configuration
│   │   ├── rateLimit.ts           # Rate limiting logic
│   │   └── usageTracker.ts        # Usage analytics
│   ├── services/
│   │   └── storyGenerator.ts      # API client
│   └── types/
│       └── story.ts               # TypeScript types
├── .env.local                     # Environment variables
└── package.json
```

## How It Works

### Architecture

```
User Input (Form)
      ↓
useStoryGenerator Hook
      ↓
/api/generate Endpoint (Server)
      ↓
Claude Opus 4.5 API
      ↓
Story Display
```

### Data Flow

1. **User fills form** - Genre, tone, length, prompt
2. **Hook calls API** - `POST /api/generate`
3. **Server validates** - Rate limit check, input validation
4. **Prompt engineering** - Build structured prompt for Claude
5. **AI generation** - Claude creates unique story
6. **Cost tracking** - Log usage and estimate cost
7. **Return story** - Display with metadata

### Security

- ✅ API key stored server-side only
- ✅ Never exposed to browser
- ✅ Rate limiting prevents abuse
- ✅ Input validation on all endpoints

## Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Rate Limiting

Default: **10 requests per hour per IP**

To adjust, edit `src/app/api/generate/route.ts`:

```typescript
const RATE_LIMIT_CONFIG = {
  maxRequests: 10,
  windowMs: 60 * 60 * 1000, // 1 hour
};
```

### Cost Estimation

Per story (approximate):
- Short: $0.03 - $0.05
- Medium: $0.06 - $0.10
- Long: $0.15 - $0.25

View logs in your server console for usage tracking.

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Add environment variable: `ANTHROPIC_API_KEY`
   - Deploy!

3. **Environment Variables**

   In Vercel dashboard, add:
   ```
   ANTHROPIC_API_KEY=your_api_key_here
   ```

### Other Platforms

Works with any Next.js-compatible platform:
- Railway
- Netlify
- AWS Amplify
- Google Cloud Run

## Future Enhancements

- [ ] User authentication (NextAuth.js)
- [ ] Save stories to database (Supabase/PostgreSQL)
- [ ] Share stories with unique URLs
- [ ] Export to PDF
- [ ] Story templates
- [ ] Character builder
- [ ] Multi-language support
- [ ] Premium tier with Stripe payments
- [ ] Story editing/refinement
- [ ] Image generation (DALL-E integration)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Acknowledgments

- Built with [Claude Code](https://claude.com/claude-code)
- Powered by [Claude Opus 4.5](https://www.anthropic.com/claude)
- Deployed on [Vercel](https://vercel.com)

---

**Built in ~60 minutes** | [Live Demo](https://story-generator-lac-nine.vercel.app) | [GitHub](https://github.com/trungt19/story-generator)
