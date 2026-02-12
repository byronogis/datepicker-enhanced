<script setup lang="ts">
import type { DayOrDays } from 'element-plus'
import { ROOT_COMMON_PICKER_INJECTION_KEY } from 'element-plus'
import { inject } from 'vue'
import { useDatePickerEnhanced } from '../composables/useDatePickerEnhanced.ts'
import { enhInnerInjectionKey } from '../utils/constant.ts'
import { getDate, valiDateAbbrStr } from '../utils/dateStr.ts'
import dayjs from '../utils/dayjs.ts'
import DatePickerPanel from './DatePickerPanel.vue'
import DatePickerPanelWrapper from './DatePickerPanelWrapper.vue'

const enhInner = inject(enhInnerInjectionKey)!

const {
  // parsedValue,
  // onCalendarChange,
  // onPanelChange,
  onSetPickerOption,
  onPick,
} = inject(ROOT_COMMON_PICKER_INJECTION_KEY)!

const {
  panelTitles,
  panelItems,
  panelPrevClick,
  panelNextClick,
  panelItemClick,
  panelItemHover,
  panelTitleClick,
  isArrowDisabledForRange,
} = useDatePickerEnhanced()

onSetPickerOption(['parseUserInput', function parseUserInput(input): DayOrDays {
  console.info('[datepicker-enhanced] parseUserInput: ', input)
  if (Array.isArray(input)) {
    // @ts-expect-error ignore
    return input.map(i => parseUserInput(i))
  }

  const { test } = valiDateAbbrStr(enhInner.value.innerType, input ?? '')
  const date = test
    ? dayjs(getDate(enhInner.value.innerType, input!, 'abbr'))
    : dayjs(input)
  return date
}])
onSetPickerOption(['isValidValue', (d) => {
  const valid = [d].flat().every(i => i?.isValid())
  console.info('[datepicker-enhanced] isValidValue: ', d, '=>', valid)
  return valid
}])
onSetPickerOption(['handleClear', () => {
  onPick(null)
}])
</script>

<template>
  <template v-if="enhInner.innerIsRange">
    <DatePickerPanelWrapper is-range>
      <template v-for="pos, idx in (['left', 'right'] as const)" :key="pos" #[`range-${pos}`]>
        <DatePickerPanel
          class="el-date-range-picker__content"
          :class="`is-${pos}`"
          style="padding-top: 0;"
          :title="panelTitles[idx]"
          :items="panelItems[idx]"
          :arrow-disabled="isArrowDisabledForRange ? ({
            left: 'right',
            right: 'left',
          } as const)[pos] : false"
          @click-prev="panelPrevClick(idx)"
          @click-next="panelNextClick(idx)"
          @click-item="panelItemClick(idx, $event)"
          @hover-item="panelItemHover(idx, $event)"
          @click-title="panelTitleClick(idx)"
        />
      </template>
    </DatePickerPanelWrapper>
  </template>

  <template v-else>
    <DatePickerPanelWrapper>
      <template #default>
        <DatePickerPanel
          :title="panelTitles[0]"
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
