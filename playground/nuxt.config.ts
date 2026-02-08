export default defineNuxtConfig({
  modules: ['../src/module'],

  aiTransparency: {
    // Custom weights (optional)
    weights: {
      research: 0.25,
      generation: 0.50,
      review: 0.25
    },
    // Custom percentages (optional)
    percentages: {
      researchMethod: {
        'AI': 100,
        'DeepSearch': 60,
        'Hybrid': 40,
        'Human': 0
      }
    },
    // Components options
    components: true,
    componentPrefix: 'Ait'
  },

  devtools: { enabled: true },
  compatibilityDate: '2025-01-01'
})
