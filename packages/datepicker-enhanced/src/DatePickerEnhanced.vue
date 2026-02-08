<script setup lang="ts">
import type {
  EnhDatePickerEmits,
  EnhDatePickerExposed,
  EnhDatePickerProps,
  EnhDatePrimitive,
  EnhDateTypeClear,
} from './types/index.ts'
import { Calendar, CircleClose } from '@element-plus/icons-vue'
import { CommonPicker } from 'element-plus'
import { computed, provide, useTemplateRef } from 'vue'
import DatePickerQuarterHalfYear from './components/DatePickerQuarterHalfYear.vue'
import {
  DATE_FORMAT,
  enhEmitsInjectionKey,
  enhInnerInjectionKey,
  enhPropsInjectionKey,
} from './utils/constant.ts'

// import 'element-plus/es/components/date-picker/style/css'
// import 'element-plus/es/components/calendar/style/css'

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
provide(enhEmitsInjectionKey, emits)

const innerType = computed(() => props.type.replace('range', '') as EnhDateTypeClear)
const innerFormat = computed(() => props.format ?? DATE_FORMAT[innerType.value])
const innerIsRange = computed(() => props.type.includes('range'))
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

provide(enhInnerInjectionKey, computed(() => ({
  innerType: innerType.value,
  innerFormat: innerFormat.value,
  innerIsRange: innerIsRange.value,
  innerModelValue: innerModelValue.value,
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
