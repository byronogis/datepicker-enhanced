<script setup lang="ts">
import type {
  EnhDatePickerEmits,
  EnhDatePickerExposed,
  EnhDatePickerProps,
  EnhDatePickerSlots,
  EnhDatePrimitive,
  EnhDateTypeClear,
  EnhInner,
} from './types/index.ts'
import { CommonPicker, PICKER_POPPER_OPTIONS_INJECTION_KEY } from 'element-plus'
import { computed, provide, ref, useTemplateRef, watchEffect } from 'vue'
import DatePickerQuarterHalfYear from './components/DatePickerQuarterHalfYear.vue'
import {
  DATE_FORMAT,
  enhEmitsInjectionKey,
  enhInnerInjectionKey,
  enhPropsInjectionKey,
  enhSlotsInjectionKey,
  getEnhPropsDefault,
} from './utils/constant.ts'
import { getDate } from './utils/dateStr.ts'
import dayjs from './utils/dayjs.ts'

import 'element-plus/es/components/date-picker/style/css'

const props = withDefaults(
  defineProps<EnhDatePickerProps>(),
  // @ts-expect-error InferDefaults<LooseRequired<__VLS_Props>>”
  getEnhPropsDefault(),
)

const emits = defineEmits<EnhDatePickerEmits>()

const slots = defineSlots<EnhDatePickerSlots>()

provide(enhPropsInjectionKey, props)
provide(enhEmitsInjectionKey, emits)
provide(enhSlotsInjectionKey, slots)
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
const innerEnhWantEnd = computed<EnhInner['innerEnhWantEnd']>(() => {
  const enhWantEndToArray = [props.enhWantEnd].flat()
  return Array.from({ length: innerPanelAmount.value }, (_, index) => {
    return !!enhWantEndToArray[index]
  }) as [boolean, boolean?]
})

const enhInner = ref<EnhInner>({} as EnhInner)
watchEffect(() => {
  Object.assign(enhInner.value = enhInner.value || {}, {
    innerType: innerType.value,
    innerFormat: innerFormat.value,
    innerIsRange: innerIsRange.value,
    innerPanelAmount: innerPanelAmount.value,
    innerModelValue: innerModelValue.value,
    innerDefaultValue: innerDefaultValue.value,
    innerEnhWantEnd: innerEnhWantEnd.value,
  } satisfies EnhInner)
})
provide(enhInnerInjectionKey, enhInner)

function handleUpdateModelValue(val: EnhDatePrimitive | EnhDatePrimitive[]) {
  console.info('[datepicker-enhanced] handleUpdateModelValue: ', val)
  const value = [val].flat().filter(Boolean).map((date, index) => {
    const date_ = getDate(
      innerType.value,
      dayjs(date, props.valueFormat || undefined).toDate(),
      'origin',
      enhInner.value.innerEnhWantEnd[index],
    )
    return props.valueFormat
      ? dayjs(date_).format(props.valueFormat)
      : date_
  })
  emits('update:modelValue', innerIsRange.value ? value : value[0])
}

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
      ...$attrs,
      format: innerFormat,
    }"
    @update:model-value="handleUpdateModelValue"
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
