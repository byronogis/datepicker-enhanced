<script setup lang="ts">
import { inject } from 'vue'
import { enhPropsInjectionKey } from '../utils/constant.ts'

const props = defineProps<{
  isRange?: boolean
}>()

const enhProps = inject(enhPropsInjectionKey)!
</script>

<template>
  <div
    v-if="!enhProps.readonly && !enhProps.disabled"
    tabindex="0"
    class="el-picker-panel"
    :class="!props.isRange ? 'el-date-picker' : 'el-date-range-picker'"
  >
    <div class="el-picker-panel__body-wrapper">
      <div class="el-picker-panel__body">
        <!-- content -->
        <template v-if="props.isRange">
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
