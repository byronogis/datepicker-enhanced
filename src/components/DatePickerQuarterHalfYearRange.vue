<!-- eslint-disable import/order -->
<script setup lang="ts">
import { computed, inject, ref, toRef, watch, watchEffect } from 'vue'
import { ElPopover } from 'element-plus'
import type { Component } from 'vue'
import DatePickerPanelWrapper from './DatePickerPanelWrapper.vue'
import DatePickerPanel from './DatePickerPanel.vue'
import DatePickerInputRange from './DatePickerInputRange.vue'
import useDatePickerEnhanced from './useDatePickerEnhanced'

type DateModelType = string | number | Date

interface Props {
  type: 'quarteryear' | 'halfyear' | 'year'
  modelValue: DateModelType[]
  clearable: boolean
  placeholder: string[]
  popperClass: string
  rangeSeparator: string
  valueFormat: string
  prefixIcon: Component | null
  clearIcon: Component | null
  disabledDate: (date: Date) => boolean
  wantEnd: boolean
}

const props = defineProps<Props>()

const emits = defineEmits(['update:modelValue'])

const {
  popover,
  inputValue,
  panelTitle,
  panelItems,
  panelPrevClick,
  panelNextClick,
  panelItemClick,
  panelTitleClick,
  isArrowDisabledForRange,
} = useDatePickerEnhanced(props as any, emits)

const updateInputModelValue = (newVal: string, index: number) => {
  const inputValueClone = [...inputValue.value]

  if (index !== -1) {
    inputValueClone[index] = newVal
  } else {
    inputValueClone.forEach((_, i) => {
      inputValueClone[i] = newVal
    })
  }

  inputValue.value = inputValueClone
}

// 向外暴露的属性方法
defineExpose({
  visible: toRef(popover, 'visible'),
  updateVisible: (val: boolean) => {
    popover.visible = val
  },
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <ElPopover
    width="auto"
    v-bind="popover"
    @update:visible="popover.visible = $event"
  >
    <!--  -->
    <template #reference>
      <DatePickerInputRange
        :model-value="inputValue"
        :clearable="props.clearable"
        :placeholder="props.placeholder"
        :prefix-icon="props.prefixIcon"
        :clear-icon="props.clearIcon"
        :range-separator="props.rangeSeparator"
        @update:model-value="updateInputModelValue"
      />
    </template>
    <!--  -->
    <template #default>
      <DatePickerPanelWrapper is-range>
        <template #range-left>
          <!-- left -->
          <DatePickerPanel
            class="el-date-range-picker__content is-left"
            style="padding-top: 0;"
            :title="panelTitle[0]"
            :items="panelItems[0]"
            :is-arrow-disabled-for-range="isArrowDisabledForRange ? 'right' : false"
            @clickPrev="panelPrevClick(0)"
            @clickNext="panelNextClick(0)"
            @clickItem="panelItemClick(0, $event)"
            @clickTitle="panelTitleClick(0)"
          />
        </template>

        <template #range-right>
          <!-- right -->
          <DatePickerPanel
            class="el-date-range-picker__content is-right"
            style="padding-top: 0;"
            :title="panelTitle[1]"
            :items="panelItems[1]"
            :is-arrow-disabled-for-range="isArrowDisabledForRange ? 'left' : false"
            @clickPrev="panelPrevClick(1)"
            @clickNext="panelNextClick(1)"
            @clickItem="panelItemClick(1, $event)"
            @clickTitle="panelTitleClick(1)"
          />
        </template>
      </DatePickerPanelWrapper>
    </template>
  </ElPopover>
</template>
