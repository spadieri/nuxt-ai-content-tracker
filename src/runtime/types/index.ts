// Types for nuxt-ai-content-transparency module

export type AIAssistantType = 'Gemini' | 'Claude' | 'ChatGPT' | 'Perplexity' | 'Copilot' | 'None' | string

export type ResearchMethodType = 'AI' | 'DeepSearch' | 'Hybrid' | 'Human'
export type ContentGenerationType = 'AI' | 'AI-Assisted' | 'Collaborative' | 'Human'
export type ArticleReviewType = 'AI' | 'AI-Assisted' | 'Peer-Review' | 'Human'

export interface ContentMethodology {
  researchMethod?: ResearchMethodType
  researchAssistants?: AIAssistantType[]
  contentGeneration?: ContentGenerationType
  generationAssistants?: AIAssistantType[]
  articleReview?: ArticleReviewType
  reviewAssistants?: AIAssistantType[]
  sourcesCount?: number
  researchHours?: number
  lastUpdated?: string
  version?: string
  // Backward compatibility
  aiAssistant?: AIAssistantType
  aiAssistants?: AIAssistantType[]
}

export interface ElementAIPercentage {
  element: string
  label: string
  aiPercentage: number
  humanPercentage: number
  method: string
  description: string
  icon: string
  color: string
  weight?: number
  assistants?: Array<{
    name: AIAssistantType
    icon: string
    color: string
    className: string
  }>
}

export interface MethodologyAIBreakdown {
  elements: ElementAIPercentage[]
  averageAIPercentage: number
  assistants: Array<{
    name: AIAssistantType
    icon: string
    color: string
    className: string
  }>
}

export interface MethodologyBadge {
  type: string
  label: string
  value: string
  icon: string
  className: string
  description: string
  priority: number
}

export interface MethodologyStats {
  aiScore: number
  humanScore: number
  transparencyScore: number
  totalFields: number
}

// Module options
export interface ModuleOptions {
  /**
   * Weights for weighted average calculation
   * @default { research: 0.25, generation: 0.50, review: 0.25 }
   */
  weights?: {
    research?: number
    generation?: number
    review?: number
  }
  /**
   * AI percentages for each method
   */
  percentages?: {
    researchMethod?: Record<string, number>
    contentGeneration?: Record<string, number>
    articleReview?: Record<string, number>
  }
  /**
   * Enable/disable auto-import of components
   * @default true
   */
  components?: boolean
  /**
   * Prefix for components
   * @default 'Ait'
   */
  componentPrefix?: string
}

// Extend Nuxt types
declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    aiTransparency: ModuleOptions
  }
}

declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    aiTransparency: ModuleOptions
  }
}
