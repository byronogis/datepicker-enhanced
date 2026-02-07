<script setup lang="ts">
import type {
  EnhDatePickerEmits,
  EnhDatePickerExposed,
  EnhDatePickerProps,
  EnhDatePrimitive,
  EnhDateTypeClear,
} from './types/index.ts'
import { Calendar, CircleClose } from '@element-plus/icons-vue'
import { computed, provide, ref, useAttrs, watch } from 'vue'
import DatePickerQuarterHalfYear from './components/DatePickerQuarterHalfYear.vue'
import {
  enhAttrsInjectionKey,
  enhIsRangeInjectionKey,
  enhPropsInjectionKey,
} from './utils/constant.ts'

import 'element-plus/es/components/date-picker/style/css'
import 'element-plus/es/components/calendar/style/css'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<EnhDatePickerProps>(), {
  readonly: false,
  disabled: false,
  editable: true,
  clearable: true,
  placeholder: '',
  startPlaceholder: '',
  endPlaceholder: '',
  popperClass: '',
  rangeSeparator: '-',
  prefixIcon: Calendar,
  clearIcon: CircleClose,
  disabledDate: () => false,
  teleported: false,
  enhWantEnd: false,
  enhAllowSame: true,
})

const emits = defineEmits<EnhDatePickerEmits>()

provide(enhPropsInjectionKey, props)

const attrs = useAttrs()
provide(enhAttrsInjectionKey, attrs)

const isRange = computed(() => props.type.includes('range'))
provide(enhIsRangeInjectionKey, isRange.value)

const innerType = computed(() => props.type.replace('range', '') as EnhDateTypeClear)

/** 以数组的形式向下提供 */
const innerModelValue = computed<EnhDatePrimitive[]>(() => {
  let enhancedModelValue: EnhDatePrimitive[]

  if (Array.isArray(props.modelValue)) {
    enhancedModelValue = [...props.modelValue]
    Array.from({ length: 2 - enhancedModelValue.length }).fill(0).forEach(() => {
      enhancedModelValue.push('')
    })
  }
  else {
    enhancedModelValue = [props.modelValue]
  }

  return enhancedModelValue
})

// handle style
const innerPopperClass = computed(() => {
  return `${props.popperClass} el-picker__popper`
})

const datepickerRef = ref<InstanceType<typeof DatePickerQuarterHalfYear>>()

/** 面板状态改变时触发事件 */
watch(() => datepickerRef.value?.visible, (visible: boolean, oldVal: undefined | boolean) => {
  if (typeof oldVal !== 'boolean') {
    return
  }
  emits('visibleChange', visible)
})

defineExpose<EnhDatePickerExposed>({
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

<template>
  <div class="component-datepicker-enhanced" style="display: inline-block">
    <DatePickerQuarterHalfYear
      ref="datepickerRef"
      v-bind="{
        ...props,
        type: innerType,
        modelValue: innerModelValue,
        popperClass: innerPopperClass,
      }"
      @update:model-value="emits('update:modelValue', isRange ? $event : $event?.[0])"
    />
  </div>
</template>
