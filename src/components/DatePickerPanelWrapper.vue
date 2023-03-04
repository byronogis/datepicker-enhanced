<script setup lang="ts">
import { ref, toRef } from 'vue'

const props = defineProps<{
  isRange?: boolean
}>()

const isRange = toRef(props, 'isRange')

const panelFocus = ref(false)

const panelFocusUpdate = (status: boolean) => panelFocus.value = status

defineExpose({
  focus: panelFocus,
})
</script>

<template>
  <div
    tabindex="0"
    class="el-picker-panel"
    :class="!isRange ? 'el-date-picker' : 'el-date-range-picker'"
    @focus="panelFocusUpdate(true)"
    @blur="panelFocusUpdate(false)"
  >
    <div class="el-picker-panel__body-wrapper">
      <div class="el-picker-panel__body">
        <!-- content -->
        <template v-if="isRange">
          <slot name="range-left" />

          <slot name="range-right" />
        </template>

        <template v-else>
          <slot name="default" />
        </template>
      </div>
    </div>
  </div>
</template>
