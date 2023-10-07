<!-- eslint-disable import/order -->
<script setup lang="ts">
import { inject, ref, toRef, watchEffect } from 'vue'
import { ElPopover } from 'element-plus'
import type { Component } from 'vue'
import DatePickerPanelWrapper from './DatePickerPanelWrapper.vue'
import DatePickerPanel from './DatePickerPanel.vue'
import DatePickerInput from './DatePickerInput.vue'
import useDatePickerEnhanced from './useDatePickerEnhanced'

type DateModelType = string | number | Date

interface Props {
  type: 'quarteryear' | 'halfyear'
  modelValue: DateModelType[]
  clearable: boolean
  placeholder: string[]
  popperClass: string
  valueFormat: string
  prefixIcon: Component | null
  clearIcon: Component | null
  disabledDate: (date: Date) => boolean
  teleported: boolean
  wantEnd: boolean
}

const props = defineProps<Props>()

const emits = defineEmits([
  'update:modelValue',
])

const {
  popover,
  inputValue,
  panelItems,
  panelTitle,
  panelPrevClick,
  panelNextClick,
  panelItemClick,
  panelTitleClick,
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

const datepickerInputRef = ref<InstanceType<typeof DatePickerInput> | null>(null)

// 向外暴露的属性方法
defineExpose({
  visible: toRef(popover, 'visible'),
  updateVisible: (val: boolean) => {
    popover.visible = val
  },
  focus: () => {
    datepickerInputRef.value?.input.focus()
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
    <template #reference>
      <DatePickerInput
        ref="datepickerInputRef"
        :model-value="inputValue[0]"
        :clearable="props.clearable"
        :placeholder="props.placeholder[0]"
        :prefix-icon="props.prefixIcon"
        :clear-icon="props.clearIcon"
        @update:model-value="updateInputModelValue"
      />
    </template>

    <template #default>
      <DatePickerPanelWrapper>
        <template #default>
          <DatePickerPanel
            :title="panelTitle[0]"
            :items="panelItems[0]"
            @clickPrev="panelPrevClick(0)"
            @clickNext="panelNextClick(0)"
            @clickItem="panelItemClick(0, $event)"
            @clickTitle="panelTitleClick(0)"
          />
        </template>
      </DatePickerPanelWrapper>
    </template>
  </ElPopover>
</template>
