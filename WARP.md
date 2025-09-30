# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **Firebase Studio Next.js application** called "TasaReal" - a real-time exchange rate application that converts USD and EUR to VES (Venezuelan Bolívar). The application integrates **Google Genkit AI** for intelligent exchange rate fallbacks and explanations.

## Key Architecture

### Technology Stack
- **Next.js 15.3.3** with App Router and Server Components
- **TypeScript** with strict configuration  
- **Tailwind CSS** with shadcn/ui components
- **Google Genkit AI** for intelligent fallback exchange rates
- **Firebase** integration (via Firebase Studio)
- **Turbopack** for fast development builds

### Directory Structure
- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - React components including shadcn/ui components
- `src/ai/` - Google Genkit AI flows and configuration
- `src/lib/` - Utilities, types, and server actions
- `src/hooks/` - Custom React hooks

### AI Integration Architecture
The application uses **Google Genkit AI** with a sophisticated fallback system:
1. **Primary data source**: ExchangeRate-API for live rates
2. **AI fallback**: When primary source fails, Genkit AI fetches rates from alternative sources
3. **AI flows**: `explainExchangeRateFluctuations` and `fallbackExchangeRate` for intelligent responses

## Common Development Commands

```bash
# Development server with Turbopack (runs on port 9002)
npm run dev

# Google Genkit AI development
npm run genkit:dev        # Start Genkit development server
npm run genkit:watch      # Start Genkit with watch mode

# Build and deployment
npm run build            # Production build
npm run start            # Production server
npm run lint             # ESLint
npm run typecheck        # TypeScript type checking
```

## Key Configuration Files

- `next.config.ts` - Next.js configuration with TypeScript/ESLint build error ignoring
- `tailwind.config.ts` - Tailwind with shadcn/ui theming and dark mode
- `components.json` - shadcn/ui configuration with RSC and TypeScript
- `src/ai/genkit.ts` - Genkit AI setup using Google AI with Gemini 2.5 Flash model

## Server Actions & Data Flow

The app uses Next.js Server Actions with intelligent caching:
- `getExchangeRates()` - Fetches current rates with 1-hour cache and AI fallback
- `getHistoricalRates()` - Generates simulated historical data for charts
- `getWeekendPeak()` - Calculates weekend exchange rate peaks

## AI Integration Patterns

When working with the AI flows:
- All flows are in `src/ai/flows/` with TypeScript and Zod schemas
- Use `'use server'` directive for server-side AI operations
- Flows return structured data via Zod schema validation
- Genkit prompts are defined separately from flows for reusability

## Styling & Components

- Uses **shadcn/ui** component library with Radix UI primitives
- **Dark mode** enabled by default in layout
- Tailwind with CSS variables for theming
- Custom fonts: Inter for body/headlines, Font Awesome for icons

## Development Notes

- TypeScript and ESLint errors are ignored during builds (configured in `next.config.ts`)
- Uses path aliases: `@/*` maps to `src/*`
- Turbopack enabled for faster development builds
- Firebase integration via Firebase Studio starter template

## CI/CD Pipeline

Automated workflows configured in `.github/workflows/`:
- **ci-cd.yml**: Full CI/CD with lint, type check, build, and Vercel deployment on `main` branch
- **pr-validation.yml**: Quick validation for pull requests

Deployment requires these GitHub secrets:
- `VERCEL_TOKEN`, `ORG_ID`, `PROJECT_ID` for Vercel deployment

## Environment Variables

Configure these for deployment:
```bash
NODE_ENV=production
# Add Google AI API keys for Genkit
# Add any Firebase configuration
```