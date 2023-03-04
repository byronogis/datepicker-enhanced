<!-- eslint-disable import/order -->
<script setup lang="ts">
import { computed, inject, ref, watch, watchEffect } from 'vue'
import { ElPopover } from 'element-plus'
import type { DateModelType } from 'element-plus'
import DatePickerPanelWrapper from './DatePickerPanelWrapper.vue'
import DatePickerPanel from './DatePickerPanel.vue'
import DatePickerInputRange from './DatePickerInputRange.vue'
import useDatePickerEnhancedRange from './useDatePickerEnhancedRange'
import type { DatePickerPanelItem } from './types'

interface Props {
  modelValue: [DateModelType, DateModelType]
  disabledDate: (date: Date) => boolean
  popperClass: string
  startPlaceholder: string
  endPlaceholder: string
  rangeSeparator: string
  type:
  | 'quarteryearrange'
  | 'halfyearrange'
  | 'yearrange'
}

const props = defineProps<Props>()

const emits = defineEmits(['update:modelValue'])

// const attrs = useAttrs()

const {
  popover,
  inputValue,
  inputStartPlaceholder,
  inputValueUpdate,
  panelTitle,
  panelItems,
  panelPrevClick,
  panelNextClick,
  panelItemClick,
  panelTitleClick,
  panelType,
} = useDatePickerEnhancedRange(props, emits, 0)

const {
  // popover: popoverSecond, // 实际就是上面的
  inputValue: inputValueSecond,
  inputEndPlaceholder,
  inputValueUpdate: inputValueUpdateSecond,
  panelTitle: panelTitleSecond,
  panelItems: panelItemsSecond,
  panelPrevClick: panelPrevClickSecond,
  panelNextClick: panelNextClickSecond,
  panelItemClick: panelItemClickSecond,
  panelTitleClick: panelTitleClickSecond,
  panelType: panelTypeSecond,
} = useDatePickerEnhancedRange(props, emits, 1, popover)

const type = props.type.replace('range', '')
const clickedStatus = ref([false, false])
const clickItem = (item: DatePickerPanelItem, whichPanel: 1 | 2) => {
  type in item && (clickedStatus.value[whichPanel - 1] = true)
  whichPanel === 1 ? panelItemClick(item) : panelItemClickSecond(item)
}

watch(clickedStatus, () => {
  clickedStatus.value.every(Boolean) // 两块面板均点击过
    && (popover.visible = false) // 关闭面板
    && (clickedStatus.value = [false, false]) // 重置面板点击状态
}, { deep: true })

const scopedId: any = inject('scopedId')
const datepickerHalfQuarterYearRangeRef = ref<any>(null)
watchEffect(() => {
  const popper = datepickerHalfQuarterYearRangeRef.value?.popperRef?.contentRef as HTMLDivElement
  popper?.setAttribute?.(`${String(scopedId.value)}`, '')
})

const InputRef = ref<InstanceType<typeof DatePickerInputRange> | null>(null)
const panelWrapperRef = ref<InstanceType<typeof DatePickerPanelWrapper> | null>(null)
let wantClose = false

watchEffect(() => {
  const startFocus = !!InputRef.value?.startFocus
  const endFocus = !!InputRef.value?.endFocus
  if (startFocus || endFocus || panelWrapperRef.value?.focus) {
    wantClose = false
    popover.visible = true
  } else {
    wantClose = true
    setTimeout(() => {
      wantClose && (popover.visible = false) && ((wantClose = false))
    }, 100)
  }
})

const isArrowDisabled = computed(() => {
  const leftYearMax = panelTitle.value.slice(-4)
  const rightYearMin = panelTitleSecond.value.slice(0, 4)
  console.log('computed')

  if (panelType.value === 'year' && panelTypeSecond.value === 'year') {
    return leftYearMax >= rightYearMin
  } else if (panelType.value === 'year' && panelTypeSecond.value !== 'year') {
    return leftYearMax >= rightYearMin
  } else if (panelType.value !== 'year' && panelTypeSecond.value === 'year') {
    return leftYearMax >= rightYearMin
  } else {
    return leftYearMax >= rightYearMin
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
    ref="datepickerHalfQuarterYearRangeRef"
    :visible="popover.visible"
    :trigger="popover.trigger"
    :placement="popover.placement"
    :hide-after="popover.hideAfter"
    :transition="popover.transition"
    :popper-class="popover.popperClass"
    width="auto"
  >
    <!--  -->
    <template #reference>
      <DatePickerInputRange
        ref="InputRef"
        value=""
        placeholder=""
        :start-value="inputValue"
        :end-value="inputValueSecond"
        :start-placeholder="inputStartPlaceholder"
        :end-placeholder="inputEndPlaceholder"
        :range-separator="props.rangeSeparator"
        @update:startValue="inputValueUpdate"
        @update:endValue="inputValueUpdateSecond"
      />
    </template>
    <!--  -->
    <template #default>
      <DatePickerPanelWrapper
        ref="panelWrapperRef"
        is-range
      >
        <template #range-left>
          <!-- left -->
          <DatePickerPanel
            class="el-date-range-picker__content is-left p-0"
            :title="panelTitle"
            :items="panelItems"
            :right-panel-arrow-disabled="isArrowDisabled"
            @clickPrev="panelPrevClick"
            @clickNext="panelNextClick"
            @clickItem="clickItem($event, 1)"
            @clickTitle="panelTitleClick"
          />
        </template>

        <template #range-right>
          <!-- right -->
          <DatePickerPanel
            class="el-date-range-picker__content is-right p-0"
            :title="panelTitleSecond"
            :items="panelItemsSecond"
            :left-panel-arrow-disabled="isArrowDisabled"
            @clickPrev="panelPrevClickSecond"
            @clickNext="panelNextClickSecond"
            @clickItem="clickItem($event, 2)"
            @clickTitle="panelTitleClickSecond"
          />
        </template>
      </DatePickerPanelWrapper>
    </template>
  </ElPopover>
</template>
