// composables/useAITransparency.ts
import { useRuntimeConfig } from '#imports'
import type {
  ContentMethodology,
  ElementAIPercentage,
  MethodologyAIBreakdown,
  AIAssistantType,
  MethodologyBadge,
  MethodologyStats
} from '../types'

export const useAITransparency = () => {
  const config = useRuntimeConfig()
  const options = config.public.aiTransparency || {}

  // Default AI percentage mapping (can be overridden via config)
  const defaultPercentages = {
    researchMethod: {
      'AI': 100,
      'DeepSearch': 60,
      'Hybrid': 40,
      'Human': 0
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
  }

  // Merge user config with defaults
  const aiPercentageMapping = {
    researchMethod: { ...defaultPercentages.researchMethod, ...options.percentages?.researchMethod },
    contentGeneration: { ...defaultPercentages.contentGeneration, ...options.percentages?.contentGeneration },
    articleReview: { ...defaultPercentages.articleReview, ...options.percentages?.articleReview }
  }

  // Default weights (can be overridden via config)
  const defaultWeights = {
    research: 0.25,
    generation: 0.50,
    review: 0.25
  }

  const elementWeights = {
    researchMethod: options.weights?.research ?? defaultWeights.research,
    contentGeneration: options.weights?.generation ?? defaultWeights.generation,
    articleReview: options.weights?.review ?? defaultWeights.review
  }

  // AI Assistant configuration
  const assistantConfig: Record<string, { icon: string; color: string; className: string }> = {
    'Claude': {
      icon: '🧠',
      color: '#8B5CF6',
      className: 'ait-badge ait-badge--claude'
    },
    'Gemini': {
      icon: '💎',
      color: '#059669',
      className: 'ait-badge ait-badge--gemini'
    },
    'ChatGPT': {
      icon: '⚡',
      color: '#0D9488',
      className: 'ait-badge ait-badge--chatgpt'
    },
    'Perplexity': {
      icon: '🌐',
      color: '#0891B2',
      className: 'ait-badge ait-badge--perplexity'
    },
    'Copilot': {
      icon: '🚀',
      color: '#0284C7',
      className: 'ait-badge ait-badge--copilot'
    },
    'None': {
      icon: '🚫',
      color: '#6B7280',
      className: 'ait-badge ait-badge--none'
    }
  }

  // Methodology icons
  const methodologyIcons: Record<string, Record<string, string>> = {
    researchMethod: {
      'DeepSearch': '🔍',
      'AI': '🤖',
      'Human': '👤',
      'Hybrid': '🤝'
    },
    contentGeneration: {
      'AI': '🤖',
      'Human': '✍️',
      'AI-Assisted': '🤖✍️',
      'Collaborative': '👥'
    },
    articleReview: {
      'AI': '🔄',
      'Human': '👁️',
      'AI-Assisted': '🔄👁️',
      'Peer-Review': '👥✅'
    }
  }

  // Methodology labels
  const methodologyLabels: Record<string, string> = {
    researchMethod: 'Research',
    contentGeneration: 'Generation',
    articleReview: 'Review'
  }

  // Methodology descriptions
  const methodologyDescriptions: Record<string, Record<string, string>> = {
    researchMethod: {
      'DeepSearch': 'AI-powered research tools with human verification and source selection',
      'AI': 'Research conducted primarily with AI assistance for data collection and analysis',
      'Human': 'Traditional research conducted entirely by humans with verified sources',
      'Hybrid': 'Primarily human research with AI support to expand sources'
    },
    contentGeneration: {
      'AI': 'Content generated entirely by AI with human supervision',
      'Human': 'Content written entirely by humans without AI assistance',
      'AI-Assisted': 'Content written by humans with AI support for suggestions and optimization',
      'Collaborative': 'Content written in collaboration between multiple human authors, no AI'
    },
    articleReview: {
      'AI': 'Review and quality control performed by advanced AI systems',
      'Human': 'Review and quality control performed by human editors',
      'AI-Assisted': 'Human review with AI support for grammar and typo checking',
      'Peer-Review': 'Review performed by other professionals in the field, no AI'
    }
  }

  // Helper functions
  const getMethodologyIcon = (type: string, value: string): string => {
    return methodologyIcons[type]?.[value] || '❓'
  }

  const getMethodologyDescription = (type: string, value: string): string => {
    return methodologyDescriptions[type]?.[value] || 'Description not available'
  }

  const getMethodologyLabel = (type: string): string => {
    return methodologyLabels[type] || type
  }

  // Get AI percentage for a single element
  const getElementAIPercentage = (elementType: string, methodValue: string): number => {
    const mapping = aiPercentageMapping[elementType as keyof typeof aiPercentageMapping]
    return mapping?.[methodValue as keyof typeof mapping] ?? 0
  }

  // Process AI assistants for an element
  const processElementAssistants = (assistants: AIAssistantType[] | undefined) => {
    if (!assistants || assistants.length === 0) return []

    return assistants.map(assistant => ({
      name: assistant,
      icon: assistantConfig[assistant]?.icon || '❓',
      color: assistantConfig[assistant]?.color || '#6B7280',
      className: assistantConfig[assistant]?.className || 'ait-badge ait-badge--default'
    }))
  }

  // Process AI assistants (supports both single and array) - backward compatibility
  const processAIAssistants = (methodology: ContentMethodology) => {
    let assistants: AIAssistantType[] = []

    const allElementAssistants = [
      ...(methodology.researchAssistants || []),
      ...(methodology.generationAssistants || []),
      ...(methodology.reviewAssistants || [])
    ]

    if (allElementAssistants.length > 0) {
      assistants = [...new Set(allElementAssistants)]
    } else if (methodology.aiAssistants && methodology.aiAssistants.length > 0) {
      assistants = methodology.aiAssistants
    } else if (methodology.aiAssistant && methodology.aiAssistant !== 'None') {
      assistants = [methodology.aiAssistant]
    }

    return assistants.map(assistant => ({
      name: assistant,
      icon: assistantConfig[assistant]?.icon || '❓',
      color: assistantConfig[assistant]?.color || '#6B7280',
      className: assistantConfig[assistant]?.className || 'ait-badge ait-badge--default'
    }))
  }

  // Main function to calculate AI percentage breakdown
  const getMethodologyAIBreakdown = (methodology: ContentMethodology): MethodologyAIBreakdown => {
    const elements: ElementAIPercentage[] = []

    const elementConfigs = [
      {
        key: 'researchMethod',
        assistantsKey: 'researchAssistants',
        label: 'Research',
        icon: '🔍',
        color: '#3B82F6'
      },
      {
        key: 'contentGeneration',
        assistantsKey: 'generationAssistants',
        label: 'Generation',
        icon: '✍️',
        color: '#10B981'
      },
      {
        key: 'articleReview',
        assistantsKey: 'reviewAssistants',
        label: 'Review',
        icon: '👁️',
        color: '#F59E0B'
      }
    ]

    elementConfigs.forEach(config => {
      const methodValue = methodology[config.key as keyof ContentMethodology] as string
      const effectiveValue = methodValue || 'Human'
      const aiPercentage = getElementAIPercentage(config.key, effectiveValue)
      const humanPercentage = 100 - aiPercentage

      const elementAssistants = methodology[config.assistantsKey as keyof ContentMethodology] as AIAssistantType[] | undefined
      const processedAssistants = processElementAssistants(elementAssistants)

      elements.push({
        element: config.key,
        label: config.label,
        aiPercentage,
        humanPercentage,
        method: effectiveValue,
        description: getMethodologyDescription(config.key, effectiveValue),
        icon: config.icon,
        color: config.color,
        weight: elementWeights[config.key as keyof typeof elementWeights] || 0.33,
        assistants: processedAssistants.length > 0 ? processedAssistants : undefined
      })
    })

    // Calculate weighted average
    const totalWeight = elements.reduce((sum, el) => sum + (el.weight || 0.33), 0)
    const weightedSum = elements.reduce((sum, el) => sum + (el.aiPercentage * (el.weight || 0.33)), 0)
    const averageAIPercentage = totalWeight > 0
      ? Math.round(weightedSum / totalWeight)
      : 0

    const assistants = processAIAssistants(methodology)

    return {
      elements,
      averageAIPercentage,
      assistants
    }
  }

  // Get color based on AI percentage
  const getAIPercentageColor = (percentage: number): string => {
    if (percentage === 0) return '#10B981' // Green for 0% AI
    if (percentage <= 30) return '#84CC16' // Light green
    if (percentage <= 50) return '#F59E0B' // Yellow/Orange
    if (percentage <= 70) return '#EF4444' // Light red
    return '#DC2626' // Red for high AI percentage
  }

  // Get CSS class based on AI percentage
  const getAIPercentageClass = (percentage: number): string => {
    if (percentage === 0) return 'ait-percentage--human'
    if (percentage <= 30) return 'ait-percentage--low'
    if (percentage <= 50) return 'ait-percentage--medium'
    if (percentage <= 70) return 'ait-percentage--high'
    return 'ait-percentage--full'
  }

  // Get methodology stats
  const getMethodologyStats = (methodology: ContentMethodology): MethodologyStats => {
    const breakdown = getMethodologyAIBreakdown(methodology)

    return {
      aiScore: breakdown.averageAIPercentage,
      humanScore: 100 - breakdown.averageAIPercentage,
      transparencyScore: breakdown.elements.filter(el => el.method !== 'Human').length > 0 ? 100 : 50,
      totalFields: breakdown.elements.length
    }
  }

  // Validate methodology
  const validateMethodology = (methodology: ContentMethodology): string[] => {
    const warnings: string[] = []

    if (!methodology.researchMethod) {
      warnings.push('Research method not specified')
    }

    if (!methodology.contentGeneration) {
      warnings.push('Content generation method not specified')
    }

    if (!methodology.articleReview) {
      warnings.push('Review type not specified')
    }

    return warnings
  }

  // Format date
  const formatDate = (dateString: string, locale: string = 'en-US'): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
    return new Date(dateString).toLocaleDateString(locale, options)
  }

  return {
    // Main functions
    getMethodologyAIBreakdown,
    getElementAIPercentage,
    processAIAssistants,
    processElementAssistants,
    getMethodologyStats,
    validateMethodology,

    // Helper functions
    getMethodologyIcon,
    getMethodologyDescription,
    getMethodologyLabel,
    getAIPercentageColor,
    getAIPercentageClass,
    formatDate,

    // Configuration (read-only)
    aiPercentageMapping,
    elementWeights,
    assistantConfig,
    methodologyIcons,
    methodologyLabels,
    methodologyDescriptions
  }
}
