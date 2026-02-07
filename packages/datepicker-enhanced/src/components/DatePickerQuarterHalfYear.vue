<script setup lang="ts">
import type { ComponentExposed } from 'vue-component-type-helpers'
import type {
  EnhDatePickerProps,
  EnhDatePrimitive,
  EnhDateTypeClear,
} from './../types/index.ts'
import { ElPopover } from 'element-plus'
import { computed, inject, ref, toRef } from 'vue'
import { useDatePickerEnhanced } from '../composables/useDatePickerEnhanced'
import { enhIsRangeInjectionKey } from '../utils/constant.ts'
import DatePickerInput from './DatePickerInput.vue'
import DatePickerPanel from './DatePickerPanel.vue'
import DatePickerPanelWrapper from './DatePickerPanelWrapper.vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<EnhDatePickerProps<EnhDateTypeClear, EnhDatePrimitive[]>>()

const emits = defineEmits(['update:modelValue'])

const enhIsRange = inject(enhIsRangeInjectionKey)!

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
} = useDatePickerEnhanced(props, emits)

const inputModelValue = computed({
  get: () => enhIsRange ? inputValue.value : inputValue.value[0],
  set: function updateInputModelValue([newVal, index]: [string, -1 | 0 | 1]) {
    const inputValueClone = [...inputValue.value]

    if (index !== -1) {
      inputValueClone[index] = newVal
    }
    else {
      inputValueClone.forEach((_, i) => {
        inputValueClone[i] = newVal
      })
    }

    inputValue.value = inputValueClone
  },
})

const datepickerInputRef = ref<ComponentExposed<typeof DatePickerInput>>()

defineExpose({
  visible: toRef(popover, 'visible'),
  updateVisible: (val: boolean) => {
    popover.visible = val
  },
  focus: () => {
    datepickerInputRef.value?.input?.focus()
  },
})
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
        v-model="inputModelValue"
      />
    </template>

    <template #default>
      <template v-if="enhIsRange">
        <DatePickerPanelWrapper is-range>
          <template v-for="pos, idx in (['left', 'right'] as const)" :key="pos" #[`range-${pos}`]>
            <DatePickerPanel
              class="el-date-range-picker__content"
              :class="`is-${pos}`"
              style="padding-top: 0;"
              :title="panelTitle[idx]"
              :items="panelItems[idx]"
              :is-arrow-disabled-for-range="isArrowDisabledForRange ? ({
                left: 'right',
                right: 'left',
              } as const)[pos] : false"
              @click-prev="panelPrevClick(idx)"
              @click-next="panelNextClick(idx)"
              @click-item="panelItemClick(idx, $event)"
              @click-title="panelTitleClick(idx)"
            />
          </template>
        </DatePickerPanelWrapper>
      </template>

      <template v-else>
        <DatePickerPanelWrapper>
          <template #default>
            <DatePickerPanel
              :title="panelTitle[0]"
              :items="panelItems[0]"
              @click-prev="panelPrevClick(0)"
              @click-next="panelNextClick(0)"
              @click-item="panelItemClick(0, $event)"
              @click-title="panelTitleClick(0)"
            />
          </template>
        </DatePickerPanelWrapper>
      </template>
    </template>
  </ElPopover>
</template>
