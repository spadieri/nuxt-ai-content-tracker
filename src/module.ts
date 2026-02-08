import { defineNuxtModule, addComponentsDir, addImportsDir, createResolver } from '@nuxt/kit'
import type { ModuleOptions } from './runtime/types'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-ai-content-tracker',
    configKey: 'aiTransparency',
    compatibility: {
      nuxt: '>=3.0.0'
    }
  },
  defaults: {
    weights: {
      research: 0.25,
      generation: 0.50,
      review: 0.25
    },
    percentages: {
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
    },
    components: true,
    componentPrefix: 'Ait'
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Pass options to runtime config
    nuxt.options.runtimeConfig.public.aiTransparency = options

    // Add composables
    addImportsDir(resolve('./runtime/composables'))

    // Add components if enabled
    if (options.components) {
      addComponentsDir({
        path: resolve('./runtime/components'),
        prefix: options.componentPrefix
      })
    }
  }
})

export type { ModuleOptions, ContentMethodology, ElementAIPercentage, MethodologyAIBreakdown } from './runtime/types'
