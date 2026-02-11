<script setup lang="ts">
import type {
  EnhDatePickerEmits,
  EnhDatePickerExposed,
  EnhDatePickerProps,
  EnhDatePrimitive,
  EnhDateTypeClear,
} from './types/index.ts'
import { CommonPicker, PICKER_POPPER_OPTIONS_INJECTION_KEY } from 'element-plus'
import { computed, provide, useTemplateRef } from 'vue'
import DatePickerQuarterHalfYear from './components/DatePickerQuarterHalfYear.vue'
import {
  DATE_FORMAT,
  enhEmitsInjectionKey,
  enhInnerInjectionKey,
  enhPropsInjectionKey,
  getEnhPropsDefault,
} from './utils/constant.ts'

import 'element-plus/es/components/date-picker/style/css'
import 'element-plus/es/components/calendar/style/css'

const props = withDefaults(
  defineProps<EnhDatePickerProps>(),
  // @ts-expect-error InferDefaults<LooseRequired<__VLS_Props>>”
  getEnhPropsDefault(),
)

const emits = defineEmits<EnhDatePickerEmits>()

provide(enhPropsInjectionKey, props)
provide(enhEmitsInjectionKey, emits)
provide(PICKER_POPPER_OPTIONS_INJECTION_KEY, props.popperOptions)

const innerType = computed(() => props.type.replace('range', '') as EnhDateTypeClear)
const innerFormat = computed(() => props.format ?? DATE_FORMAT[innerType.value])
const innerIsRange = computed(() => props.type.includes('range'))
const innerPanelAmount = computed(() => innerIsRange.value ? 2 : 1)
const innerModelValue = computed<EnhDatePrimitive[]>(() => {
  const modelValueToArray = [props.modelValue].flat()
  return Array.from({ length: innerPanelAmount.value }, (_, index) => {
    return modelValueToArray[index] || ''
  })
})
const innerDefaultValue = computed(() => {
  const defaultValueToArray = [props.defaultValue].flat()
  return Array.from({ length: innerPanelAmount.value }, (_, index) => {
    return defaultValueToArray[index] || new Date()
  })
})

provide(enhInnerInjectionKey, computed(() => ({
  innerType: innerType.value,
  innerFormat: innerFormat.value,
  innerIsRange: innerIsRange.value,
  innerPanelAmount: innerPanelAmount.value,
  innerModelValue: innerModelValue.value,
  innerDefaultValue: innerDefaultValue.value,
})))

const commonPickerRef = useTemplateRef('commonPicker')

defineExpose<EnhDatePickerExposed>({
  focus() {
    commonPickerRef.value?.focus()
  },
  blur() {
    commonPickerRef.value?.blur()
  },
  handleOpen() {
    commonPickerRef.value?.handleOpen()
  },
  handleClose() {
    commonPickerRef.value?.handleClose()
  },
})
</script>

<template>
  <!-- @vue-expect-error moduleValue number -->
  <CommonPicker
    ref="commonPicker"
    v-bind="{
      ...props,
      format: innerFormat,
    }"
    @update:model-value="emits('update:modelValue', $event)"
    @change="emits('change', $event)"
    @blur="emits('blur', $event)"
    @focus="emits('focus', $event)"
    @clear="emits('clear', $event)"
    @calendar-change="emits('calendarChange', $event)"
    @panel-change="(...$event) => emits('panelChange', ...$event)"
    @visible-change="emits('visibleChange', $event)"
  >
    <template #default="scopedProps">
      <DatePickerQuarterHalfYear
        v-bind="scopedProps"
      />
    </template>
  </CommonPicker>
</template>
