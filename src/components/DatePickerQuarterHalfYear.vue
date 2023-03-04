<!-- eslint-disable import/order -->
<script setup lang="ts">
import { inject, ref, watchEffect } from 'vue'
import { ElPopover } from 'element-plus'
import type { Component } from 'vue'
import type { DateModelType } from 'element-plus'
import DatePickerPanelWrapper from './DatePickerPanelWrapper.vue'
import DatePickerPanel from './DatePickerPanel.vue'
import DatePickerInput from './DatePickerInput.vue'
import useDatePickerEnhanced from './useDatePickerEnhanced'

interface Props {
  modelValue: DateModelType
  disabledDate: (date: Date) => boolean
  popperClass: string
  prefixIcon: Component
  placeholder: string
  type:
  | 'quarteryear'
  | 'halfyear'
}

const props = defineProps<Props>()

const emits = defineEmits(['update:modelValue'])

const {
  popover,
  inputValue,
  inputPlaceholder,
  inputValueUpdate,
  panelTitle,
  panelItems,
  panelPrevClick,
  panelNextClick,
  panelItemClick,
  panelTitleClick,
} = useDatePickerEnhanced(props, emits)

const scopedId: any = inject('scopedId')
const datepickerHalfQuarterYearRef = ref<any>(null)
watchEffect(() => {
  const popper = datepickerHalfQuarterYearRef.value?.popperRef?.contentRef as HTMLDivElement
  popper?.setAttribute?.(`${String(scopedId.value)}`, '')
})

const InputRef = ref<InstanceType<typeof DatePickerInput> | null>(null)
const panelWrapperRef = ref<InstanceType<typeof DatePickerPanelWrapper> | null>(null)
let wantClose = false

watchEffect(() => {
  if (InputRef.value?.focus || panelWrapperRef.value?.focus) {
    wantClose = false
    popover.visible = true
  } else {
    wantClose = true
    setTimeout(() => {
      wantClose && (popover.visible = false) && (wantClose = false)
    }, 100)
  }
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <ElPopover
    ref="datepickerHalfQuarterYearRef"
    :visible="popover.visible"
    :trigger="popover.trigger"
    :placement="popover.placement"
    :hide-after="popover.hideAfter"
    :transition="popover.transition"
    :popper-class="popover.popperClass"
    width="auto"
  >
    <template #reference>
      <DatePickerInput
        ref="InputRef"
        :value="inputValue"
        :placeholder="inputPlaceholder"
        :prefix-icon="props.prefixIcon"
        @update:value="inputValueUpdate"
      />
    </template>

    <template #default>
      <DatePickerPanelWrapper
        ref="panelWrapperRef"
      >
        <template #default>
          <DatePickerPanel
            :title="panelTitle"
            :items="panelItems"
            @clickPrev="panelPrevClick"
            @clickNext="panelNextClick"
            @clickItem="panelItemClick"
            @clickTitle="panelTitleClick"
          />
        </template>
      </DatePickerPanelWrapper>
    </template>
  </ElPopover>
</template>
