<script setup lang="ts">
import { computed, provide } from 'vue'
import { Calendar } from '@element-plus/icons-vue'
import type { Component, StyleValue } from 'vue'

import DatePickerQuarterHalfYear from './components/DatePickerQuarterHalfYear.vue'
import DatePickerQuarterHalfYearRange from './components/DatePickerQuarterHalfYearRange.vue'

import 'element-plus/es/components/date-picker/style/css'
import 'element-plus/es/components/calendar/style/css'

type DateType =
  | 'quarteryear'
  | 'halfyear'
  | 'quarteryearrange'
  | 'halfyearrange'
  | 'yearrange'

type DateModelType = string | number | Date

interface Props {
  type: DateType
  modelValue: DateModelType | [DateModelType, DateModelType]

  placeholder?: string
  startPlaceholder?: string
  endPlaceholder?: string
  popperClass?: string
  rangeSeparator?: string
  valueFormat?: string
  prefixIcon?: Component | null
  clearIcon?: Component
  disabledDate?: (date: Date) => boolean
  cellClassName?: (date: Date) => string

  style?: StyleValue

  wantEnd?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '选择日期',
  startPlaceholder: '开始日期',
  endPlaceholder: '结束日期',
  popperClass: '',
  rangeSeparator: '至',
  valueFormat: '',
  prefixIcon: Calendar,
  disabledDate: () => false,
  style: '',
  wantEnd: false,
})

const emits = defineEmits([
  'update:modelValue',
])

const innerEnhancedType = computed<any>(() => props.type.replace('range', ''))

// 以数组的形式向下提供
const innerEnhancedModelValue = computed<DateModelType[]>(() => {
  let enhancedModelValue: DateModelType[]

  if (Array.isArray(props.modelValue)) {
    enhancedModelValue = props.modelValue
  } else {
    enhancedModelValue = [props.modelValue]
  }

  return enhancedModelValue
})

// handle style
const innerEnhancedPopperClass = computed(() => {
  return `${props.popperClass} el-picker__popper p-0`
})

const innerPlaceholder = computed(() => {
  if (props.type.includes('range')) {
    return [props.startPlaceholder, props.endPlaceholder]
  } else {
    return [props.placeholder]
  }
})

// 向下提供给输入框
provide('style', props.style)
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div class="component-datepicker-enhanced" style="display: inline-block">
    <!-- 季度/半年度 -->
    <template v-if="['quarteryear', 'halfyear'].includes(props.type)">
      <DatePickerQuarterHalfYear
        :type="innerEnhancedType"
        :model-value="[innerEnhancedModelValue[0]]"
        :placeholder="innerPlaceholder"
        :popper-class="innerEnhancedPopperClass"
        :value-format="props.valueFormat"
        :prefix-icon="props.prefixIcon"
        :disabled-date="props.disabledDate"
        :want-end="props.wantEnd"
        @update:modelValue="emits('update:modelValue', $event?.[0])"
      />
    </template>

    <!-- 季度/半年度/年度范围 -->
    <template v-else-if="['quarteryearrange', 'halfyearrange', 'yearrange'].includes(props.type)">
      <DatePickerQuarterHalfYearRange
        :type="innerEnhancedType"
        :model-value="innerEnhancedModelValue"
        :placeholder="innerPlaceholder"
        :popper-class="innerEnhancedPopperClass"
        :range-separator="props.rangeSeparator"
        :value-format="props.valueFormat"
        :prefix-icon="props.prefixIcon"
        :disabled-date="props.disabledDate"
        :want-end="props.wantEnd"
        @update:modelValue="emits('update:modelValue', $event)"
      />
    </template>
  </div>
</template>

<style scoped>
:deep() .p-0 {
    padding: 0;
}

:deep() .cursor-not-allowed {
  cursor: not-allowed;
}

:deep() .pointer-events-none {
  pointer-events: none;
}

:deep() .el-picker-panel__icon-btn .el-icon {
  cursor: unset;
}
</style>
