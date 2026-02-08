# nuxt-ai-content-tracker

[![npm version][npm-version-src]][npm-version-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

A Nuxt module for tracking and displaying AI usage transparency in content creation.

## Features

- 🔢 **Weighted AI percentage calculation** - Calculate AI involvement with customizable weights
- 🎨 **Ready-to-use Vue components** - Compact badges and detailed breakdowns
- ⚙️ **Fully configurable** - Customize percentages, weights, and labels
- 🌙 **Dark mode support** - Built-in dark mode styles
- 📦 **TypeScript support** - Full type definitions included

## Quick Setup

Install the module:

```bash
npm install nuxt-ai-content-tracker
```

Add to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-ai-content-tracker'],

  aiTransparency: {
    // Optional: customize weights
    weights: {
      research: 0.25,
      generation: 0.50,
      review: 0.25
    }
  }
})
```

## Usage

### Composable

```vue
<script setup>
const { getMethodologyAIBreakdown, getAIPercentageClass } = useAITransparency()

const methodology = {
  researchMethod: 'Hybrid',
  researchAssistants: ['Perplexity'],
  contentGeneration: 'AI-Assisted',
  generationAssistants: ['Claude'],
  articleReview: 'Human'
}

const breakdown = getMethodologyAIBreakdown(methodology)
// breakdown.averageAIPercentage = 33 (weighted average)
// breakdown.elements = [{ element: 'researchMethod', aiPercentage: 40, ... }, ...]
</script>
```

### Components

#### Compact Badge

```vue
<template>
  <AitPercentageCompact
    :methodology="methodology"
    :max-assistants="2"
    :clickable="true"
    @show-details="showModal = true"
  />
</template>
```

#### Full Breakdown

```vue
<template>
  <AitPercentageBreakdown
    :methodology="methodology"
    :show-legend="true"
    :compact="false"
  />
</template>
```

## Methodology Structure

```ts
interface ContentMethodology {
  // Research phase
  researchMethod?: 'AI' | 'DeepSearch' | 'Hybrid' | 'Human'
  researchAssistants?: ('Claude' | 'Gemini' | 'ChatGPT' | 'Perplexity' | 'Copilot')[]

  // Content generation phase
  contentGeneration?: 'AI' | 'AI-Assisted' | 'Collaborative' | 'Human'
  generationAssistants?: ('Claude' | 'Gemini' | 'ChatGPT' | 'Perplexity' | 'Copilot')[]

  // Review phase
  articleReview?: 'AI' | 'AI-Assisted' | 'Peer-Review' | 'Human'
  reviewAssistants?: ('Claude' | 'Gemini' | 'ChatGPT' | 'Perplexity' | 'Copilot')[]

  // Optional metadata
  sourcesCount?: number
  researchHours?: number
  lastUpdated?: string
}
```

## Default AI Percentages

| Method | Value | AI % |
|--------|-------|------|
| **Research** | AI | 100% |
| | DeepSearch | 60% |
| | Hybrid | 40% |
| | Human | 0% |
| **Generation** | AI | 100% |
| | AI-Assisted | 60% |
| | Collaborative | 0% |
| | Human | 0% |
| **Review** | AI | 100% |
| | AI-Assisted | 50% |
| | Peer-Review | 0% |
| | Human | 0% |

## Configuration

```ts
export default defineNuxtConfig({
  modules: ['nuxt-ai-content-tracker'],

  aiTransparency: {
    // Weights for weighted average (must sum to 1.0)
    weights: {
      research: 0.25,    // 25% weight
      generation: 0.50,  // 50% weight (most important)
      review: 0.25       // 25% weight
    },

    // Custom AI percentages
    percentages: {
      researchMethod: {
        'AI': 100,
        'DeepSearch': 60,
        'Hybrid': 40,
        'Human': 0,
        'Custom': 50  // Add custom values
      },
      contentGeneration: {
        'AI': 100,
        'AI-Assisted': 60,
        'Collaborative': 0,
        'Human': 0
      },
      articleReview: {
        'AI': 100,
        'AI-Assisted': 50,
        'Peer-Review': 0,
        'Human': 0
      }
    },

    // Component options
    components: true,        // Auto-import components
    componentPrefix: 'Ait'   // Component prefix (AitPercentageCompact, etc.)
  }
})
```

## API Reference

### `useAITransparency()`

Returns an object with the following methods:

| Method | Description |
|--------|-------------|
| `getMethodologyAIBreakdown(methodology)` | Get full breakdown with weighted average |
| `getElementAIPercentage(element, method)` | Get AI % for a single element |
| `getAIPercentageColor(percentage)` | Get color for a percentage value |
| `getAIPercentageClass(percentage)` | Get CSS class for a percentage value |
| `getMethodologyStats(methodology)` | Get summary statistics |
| `validateMethodology(methodology)` | Validate methodology, returns warnings |

### Components

| Component | Props | Description |
|-----------|-------|-------------|
| `AitPercentageCompact` | `methodology`, `maxAssistants?`, `clickable?` | Compact inline badge |
| `AitPercentageBreakdown` | `methodology`, `showLegend?`, `compact?` | Detailed breakdown view |

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the module
npm run prepack
```

## Contributing

Contributions are welcome! Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages:

- `feat: add new feature` - for new features (bumps minor version)
- `fix: fix bug` - for bug fixes (bumps patch version)
- `feat!: breaking change` - for breaking changes (bumps major version)

## License

MIT License © 2026 spadieri

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-ai-content-tracker/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-ai-content-tracker
[license-src]: https://img.shields.io/npm/l/nuxt-ai-content-tracker.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://github.com/spadieri/nuxt-ai-content-tracker/blob/main/LICENSE
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
