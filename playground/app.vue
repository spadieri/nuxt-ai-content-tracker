<template>
  <div class="playground">
    <h1>🤖 AI Content Transparency - Playground</h1>

    <section class="section">
      <h2>Compact Badge</h2>
      <AitPercentageCompact
        :methodology="sampleMethodology"
        :clickable="true"
        @show-details="showDetails = !showDetails"
      />
    </section>

    <section v-if="showDetails" class="section">
      <h2>Full Breakdown</h2>
      <AitPercentageBreakdown
        :methodology="sampleMethodology"
        :show-legend="true"
      />
    </section>

    <section class="section">
      <h2>Compact Breakdown</h2>
      <AitPercentageBreakdown
        :methodology="sampleMethodology"
        :compact="true"
        :show-legend="false"
      />
    </section>

    <section class="section">
      <h2>Raw Data (from composable)</h2>
      <pre>{{ JSON.stringify(breakdown, null, 2) }}</pre>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const showDetails = ref(false)

const sampleMethodology = {
  researchMethod: 'Hybrid',
  researchAssistants: ['Perplexity'],
  contentGeneration: 'AI-Assisted',
  generationAssistants: ['Claude'],
  articleReview: 'Human',
  sourcesCount: 12,
  researchHours: 3
}

const { getMethodologyAIBreakdown } = useAITransparency()
const breakdown = computed(() => getMethodologyAIBreakdown(sampleMethodology))
</script>

<style>
.playground {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

pre {
  background: #1f2937;
  color: #e5e7eb;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  font-size: 0.875rem;
}
</style>
