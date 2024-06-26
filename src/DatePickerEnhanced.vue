<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'
import { Calendar, CircleClose } from '@element-plus/icons-vue'
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

type Size = 'large' | 'default' | 'small'

interface Props {
  type: DateType
  modelValue: DateModelType | [DateModelType, DateModelType]

  readonly?: boolean
  disabled?: boolean
  editable?: boolean
  clearable?: boolean
  placeholder?: string
  startPlaceholder?: string
  endPlaceholder?: string
  popperClass?: string
  rangeSeparator?: string
  valueFormat?: string
  prefixIcon?: Component | null
  clearIcon?: Component | null
  disabledDate?: (date: Date) => boolean
  cellClassName?: (date: Date) => string
  teleported?: boolean
  size?: Size

  style?: StyleValue

  wantEnd?: boolean
  allowSame?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  readonly: false,
  disabled: false,
  editable: true,
  clearable: true,
  placeholder: '',
  startPlaceholder: '',
  endPlaceholder: '',
  popperClass: '',
  rangeSeparator: '-',
  valueFormat: '',
  prefixIcon: Calendar,
  clearIcon: CircleClose,
  disabledDate: () => false,
  teleported: false,
  size: 'default',
  style: '',
  wantEnd: false,
  allowSame: true,
})

const emits = defineEmits([
  'update:modelValue',
  'visibleChange',
])

const innerEnhancedType = computed<any>(() => props.type.replace('range', ''))

// 以数组的形式向下提供
const innerEnhancedModelValue = computed<DateModelType[]>(() => {
  let enhancedModelValue: DateModelType[]

  if (Array.isArray(props.modelValue)) {
    enhancedModelValue = [...props.modelValue]
    Array(2 - enhancedModelValue.length).fill(null).forEach(() => {
      enhancedModelValue.push('')
    })
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
provide('editable', props.editable)
provide('readonly', props.readonly) // 以及面板容器
provide('disabled', props.disabled) // 以及面板容器
provide('size', props.size)

type DatePickerRef = InstanceType<typeof DatePickerQuarterHalfYear> | InstanceType<typeof DatePickerQuarterHalfYearRange>
const datepickerRef = ref<DatePickerRef | null>(null)

// 面板状态改变时触发事件
watch(() => datepickerRef.value?.visible, (visible: boolean, oldVal: undefined | boolean) => {
  if (typeof oldVal !== 'boolean') {
    return
  }
  emits('visibleChange', visible)
})

// 向外暴露的属性方法
defineExpose({
  focus() {
    datepickerRef.value?.focus()
  },
  handleOpen() {
    datepickerRef.value?.updateVisible(true)
  },
  handleClose() {
    datepickerRef.value?.updateVisible(false)
  },
})
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
        ref="datepickerRef"
        :type="innerEnhancedType"
        :model-value="[innerEnhancedModelValue[0]]"
        :clearable="props.clearable"
        :placeholder="innerPlaceholder"
        :popper-class="innerEnhancedPopperClass"
        :value-format="props.valueFormat"
        :prefix-icon="props.prefixIcon"
        :clear-icon="props.clearIcon"
        :disabled-date="props.disabledDate"
        :teleported="props.teleported"
        :want-end="props.wantEnd"
        @update:modelValue="emits('update:modelValue', $event?.[0])"
      />
    </template>

    <!-- 季度/半年度/年度范围 -->
    <template v-else-if="['quarteryearrange', 'halfyearrange', 'yearrange'].includes(props.type)">
      <DatePickerQuarterHalfYearRange
        ref="datepickerRef"
        :type="innerEnhancedType"
        :model-value="innerEnhancedModelValue"
        :clearable="props.clearable"
        :placeholder="innerPlaceholder"
        :popper-class="innerEnhancedPopperClass"
        :range-separator="props.rangeSeparator"
        :value-format="props.valueFormat"
        :prefix-icon="props.prefixIcon"
        :clear-icon="props.clearIcon"
        :disabled-date="props.disabledDate"
        :teleported="props.teleported"
        :want-end="props.wantEnd"
        :allow-same="props.allowSame"
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
