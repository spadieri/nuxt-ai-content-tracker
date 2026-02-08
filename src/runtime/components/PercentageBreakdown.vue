<template>
  <div class="ait-breakdown">
    <!-- Header with average percentage -->
    <div v-if="!compact" class="ait-breakdown__header">
      <h3 class="ait-breakdown__title">
        🤖 AI Transparency Breakdown
      </h3>
      <div class="ait-breakdown__summary">
        <div class="ait-breakdown__stat">
          <div
            class="ait-breakdown__stat-value"
            :class="getAIPercentageClass(breakdown.averageAIPercentage)"
          >
            {{ breakdown.averageAIPercentage }}%
          </div>
          <div class="ait-breakdown__stat-label">AI Average</div>
        </div>
        <div class="ait-breakdown__stat">
          <div class="ait-breakdown__stat-value ait-breakdown__stat-value--human">
            {{ 100 - breakdown.averageAIPercentage }}%
          </div>
          <div class="ait-breakdown__stat-label">Human Average</div>
        </div>
      </div>
    </div>

    <!-- Element breakdown -->
    <div class="ait-breakdown__elements" :class="{ 'ait-breakdown__elements--compact': compact }">
      <div
        v-for="element in breakdown.elements"
        :key="element.element"
        class="ait-breakdown__element"
        :class="{ 'ait-breakdown__element--compact': compact }"
      >
        <!-- Element header -->
        <div class="ait-breakdown__element-header">
          <h4 class="ait-breakdown__element-title">
            <span class="ait-breakdown__element-icon">{{ element.icon }}</span>
            {{ element.label }}
          </h4>
          <div class="ait-breakdown__element-stats">
            <div
              class="ait-breakdown__element-ai"
              :class="getAIPercentageClass(element.aiPercentage)"
            >
              {{ element.aiPercentage }}% AI
            </div>
            <div class="ait-breakdown__element-human">
              {{ element.humanPercentage }}% Human
            </div>
          </div>
        </div>

        <!-- Method used -->
        <div class="ait-breakdown__method">
          <span class="ait-breakdown__method-badge">
            {{ element.method }}
          </span>
        </div>

        <!-- Element-specific assistants -->
        <div v-if="element.assistants && element.assistants.length > 0" class="ait-breakdown__assistants">
          <div class="ait-breakdown__assistants-label">Assistants:</div>
          <div class="ait-breakdown__assistants-list">
            <span
              v-for="assistant in element.assistants"
              :key="assistant.name"
              class="ait-breakdown__assistant"
            >
              {{ assistant.icon }} {{ assistant.name }}
            </span>
          </div>
        </div>

        <!-- Progress bar -->
        <div class="ait-breakdown__bar" :class="{ 'ait-breakdown__bar--compact': compact }">
          <div
            class="ait-breakdown__bar-ai"
            :style="{
              width: `${element.aiPercentage}%`,
              backgroundColor: getAIPercentageColor(element.aiPercentage)
            }"
          ></div>
          <div
            class="ait-breakdown__bar-human"
            :style="{ width: `${element.humanPercentage}%` }"
          ></div>
        </div>

        <!-- Description -->
        <p v-if="!compact" class="ait-breakdown__description">
          {{ element.description }}
        </p>
      </div>
    </div>

    <!-- All AI assistants used -->
    <div v-if="breakdown.assistants.length > 0" class="ait-breakdown__all-assistants">
      <h4 class="ait-breakdown__all-assistants-title">
        🧠 AI Assistants Used
      </h4>
      <div class="ait-breakdown__all-assistants-list">
        <span
          v-for="assistant in breakdown.assistants"
          :key="assistant.name"
          class="ait-breakdown__assistant"
        >
          {{ assistant.icon }} {{ assistant.name }}
        </span>
      </div>
    </div>

    <!-- Legend -->
    <div v-if="showLegend && !compact" class="ait-breakdown__legend">
      <h5 class="ait-breakdown__legend-title">📖 How to read percentages</h5>
      <div class="ait-breakdown__legend-items">
        <div class="ait-breakdown__legend-item">
          <div class="ait-breakdown__legend-color" style="background-color: #10b981"></div>
          <span>0% AI = Fully human</span>
        </div>
        <div class="ait-breakdown__legend-item">
          <div class="ait-breakdown__legend-color" style="background-color: #f59e0b"></div>
          <span>30-50% AI = Moderate assistance</span>
        </div>
        <div class="ait-breakdown__legend-item">
          <div class="ait-breakdown__legend-color" style="background-color: #f97316"></div>
          <span>50-70% AI = Significant assistance</span>
        </div>
        <div class="ait-breakdown__legend-item">
          <div class="ait-breakdown__legend-color" style="background-color: #dc2626"></div>
          <span>70-100% AI = Mostly AI</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ContentMethodology } from '../types'
import { useAITransparency } from '../composables/useAITransparency'

interface Props {
  methodology: ContentMethodology
  showLegend?: boolean
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showLegend: true,
  compact: false
})

const {
  getMethodologyAIBreakdown,
  getAIPercentageColor,
  getAIPercentageClass
} = useAITransparency()

const breakdown = computed(() => getMethodologyAIBreakdown(props.methodology))
</script>

<style>
.ait-breakdown {
  transition: all 0.3s ease;
}

.ait-breakdown__header {
  margin-bottom: 1.5rem;
  text-align: center;
}

.ait-breakdown__title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.dark .ait-breakdown__title {
  color: #fff;
}

.ait-breakdown__summary {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(to right, #eff6ff, #eef2ff);
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #dbeafe;
}

.dark .ait-breakdown__summary {
  background: linear-gradient(to right, rgba(30, 58, 138, 0.3), rgba(49, 46, 129, 0.3));
  border-color: #1e3a8a;
}

.ait-breakdown__stat {
  text-align: center;
}

.ait-breakdown__stat-value {
  font-size: 1.5rem;
  font-weight: 700;
}

.ait-breakdown__stat-value--human {
  color: #059669;
}

.dark .ait-breakdown__stat-value--human {
  color: #34d399;
}

.ait-breakdown__stat-label {
  font-size: 0.75rem;
  color: #6b7280;
}

.dark .ait-breakdown__stat-label {
  color: #9ca3af;
}

.ait-breakdown__elements {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.ait-breakdown__elements--compact {
  margin-bottom: 1rem;
}

.ait-breakdown__element {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.ait-breakdown__element:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.dark .ait-breakdown__element {
  background: #1f2937;
  border-color: #374151;
}

.ait-breakdown__element--compact {
  padding: 0.75rem;
}

.ait-breakdown__element-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.ait-breakdown__element-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dark .ait-breakdown__element-title {
  color: #e5e7eb;
}

.ait-breakdown__element-icon {
  font-size: 1.125rem;
}

.ait-breakdown__element-stats {
  text-align: right;
}

.ait-breakdown__element-ai {
  font-size: 0.875rem;
  font-weight: 700;
}

.ait-breakdown__element-human {
  font-size: 0.75rem;
  color: #6b7280;
}

.dark .ait-breakdown__element-human {
  color: #9ca3af;
}

.ait-breakdown__method {
  margin-bottom: 0.75rem;
}

.ait-breakdown__method-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: #dbeafe;
  color: #1e40af;
}

.dark .ait-breakdown__method-badge {
  background: #1e3a8a;
  color: #93c5fd;
}

.ait-breakdown__assistants {
  margin-bottom: 0.75rem;
}

.ait-breakdown__assistants-label {
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.dark .ait-breakdown__assistants-label {
  color: #9ca3af;
}

.ait-breakdown__assistants-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.ait-breakdown__assistant {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: #f3f4f6;
  color: #374151;
}

.dark .ait-breakdown__assistant {
  background: #374151;
  color: #e5e7eb;
}

.ait-breakdown__bar {
  height: 0.75rem;
  background: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
  display: flex;
}

.dark .ait-breakdown__bar {
  background: #4b5563;
}

.ait-breakdown__bar--compact {
  height: 0.5rem;
}

.ait-breakdown__bar-ai,
.ait-breakdown__bar-human {
  height: 100%;
  transition: width 0.8s ease-in-out;
}

.ait-breakdown__bar-human {
  background: #10b981;
}

.dark .ait-breakdown__bar-human {
  background: #34d399;
}

.ait-breakdown__description {
  font-size: 0.75rem;
  color: #6b7280;
  line-height: 1.5;
  margin-top: 0.5rem;
}

.dark .ait-breakdown__description {
  color: #9ca3af;
}

.ait-breakdown__all-assistants {
  background: #f9fafb;
  border-radius: 0.5rem;
  padding: 1rem;
}

.dark .ait-breakdown__all-assistants {
  background: rgba(31, 41, 55, 0.5);
}

.ait-breakdown__all-assistants-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dark .ait-breakdown__all-assistants-title {
  color: #e5e7eb;
}

.ait-breakdown__all-assistants-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.ait-breakdown__legend {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #eff6ff;
  border-radius: 0.5rem;
}

.dark .ait-breakdown__legend {
  background: rgba(30, 58, 138, 0.2);
}

.ait-breakdown__legend-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.dark .ait-breakdown__legend-title {
  color: #e5e7eb;
}

.ait-breakdown__legend-items {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #6b7280;
}

@media (min-width: 640px) {
  .ait-breakdown__legend-items {
    grid-template-columns: repeat(2, 1fr);
  }
}

.dark .ait-breakdown__legend-items {
  color: #9ca3af;
}

.ait-breakdown__legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.ait-breakdown__legend-color {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 0.25rem;
}

/* AI Percentage classes */
.ait-percentage--human { color: #059669; }
.ait-percentage--low { color: #84cc16; }
.ait-percentage--medium { color: #f59e0b; }
.ait-percentage--high { color: #f97316; }
.ait-percentage--full { color: #dc2626; }

.dark .ait-percentage--human { color: #34d399; }
.dark .ait-percentage--low { color: #a3e635; }
.dark .ait-percentage--medium { color: #fbbf24; }
.dark .ait-percentage--high { color: #fb923c; }
.dark .ait-percentage--full { color: #f87171; }
</style>
