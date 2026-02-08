<template>
  <div class="ait-compact">
    <!-- AI Percentage -->
    <div class="ait-compact__percentage">
      <span class="ait-compact__icon">🤖</span>
      <span
        class="ait-compact__value"
        :class="getAIPercentageClass(breakdown.averageAIPercentage)"
      >
        {{ breakdown.averageAIPercentage }}% AI
      </span>
    </div>

    <!-- Separator -->
    <span class="ait-compact__separator">•</span>

    <!-- AI Assistants -->
    <div v-if="breakdown.assistants.length > 0" class="ait-compact__assistants">
      <span
        v-for="assistant in breakdown.assistants.slice(0, maxAssistants)"
        :key="assistant.name"
        :title="assistant.name"
        class="ait-compact__assistant-icon"
      >
        {{ assistant.icon }}
      </span>
      <span
        v-if="breakdown.assistants.length > maxAssistants"
        class="ait-compact__more"
        :title="`+${breakdown.assistants.length - maxAssistants} more assistants`"
      >
        +{{ breakdown.assistants.length - maxAssistants }}
      </span>
    </div>

    <!-- Details button -->
    <button
      v-if="clickable"
      @click="$emit('showDetails')"
      class="ait-compact__details-btn"
      title="Show AI percentage details"
    >
      📊
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ContentMethodology } from '../types'
import { useAITransparency } from '../composables/useAITransparency'

interface Props {
  methodology: ContentMethodology
  maxAssistants?: number
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  maxAssistants: 2,
  clickable: false
})

defineEmits<{
  showDetails: []
}>()

const { getMethodologyAIBreakdown, getAIPercentageClass } = useAITransparency()

const breakdown = computed(() => getMethodologyAIBreakdown(props.methodology))
</script>

<style>
.ait-compact {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  transition: all 0.2s ease;
}

.ait-compact__percentage {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.ait-compact__icon {
  color: #6b7280;
}

.ait-compact__value {
  font-weight: 600;
}

.ait-compact__separator {
  color: #d1d5db;
}

.dark .ait-compact__separator {
  color: #4b5563;
}

.ait-compact__assistants {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.ait-compact__assistant-icon {
  font-size: 0.875rem;
}

.ait-compact__more {
  color: #6b7280;
  font-size: 0.75rem;
}

.ait-compact__details-btn {
  color: #9ca3af;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  transition: all 0.2s ease;
}

.ait-compact__details-btn:hover {
  color: #4b5563;
  transform: scale(1.1);
}

.dark .ait-compact__details-btn:hover {
  color: #d1d5db;
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
