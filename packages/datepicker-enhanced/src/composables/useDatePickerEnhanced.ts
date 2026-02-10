import type {
  EnhDatePickerPanelItem,
  EnhDateTypeClear,
} from '../types/index.ts'
import type { DateArray } from '../utils/dateStr.ts'
import { ROOT_COMMON_PICKER_INJECTION_KEY } from 'element-plus'
import { computed, inject, ref, toRefs, watch } from 'vue'
import {
  enhInnerInjectionKey,
  enhPropsInjectionKey,
} from '../utils/constant.ts'
import {
  getDate,
  getDateArray,
} from '../utils/dateStr.ts'
import dayjs from '../utils/dayjs.ts'
import {
  correctPanelDateArrays,
  generatePanelItems,
  getRightPanelMinYear,
} from '../utils/panel.ts'

export function useDatePickerEnhanced() {
  const {
    parsedValue,
    // pickerVisible,
    onCalendarChange,
    onPanelChange,
    // onSetPickerOption,
    onPick,
  } = inject(ROOT_COMMON_PICKER_INJECTION_KEY)!

  const enhProps = inject(enhPropsInjectionKey)!
  const enhInner = inject(enhInnerInjectionKey)!

  const {
    innerType,
    innerIsRange,
    innerPanelAmount,
    // innerModelValue,
    innerDefaultValue,
  } = toRefs(enhInner.value)

  /**
   * 计算数据对应的日期数组 [[year, halfyear/quarteryear], ...]
   */
  const dateArrays = computed<DateArray[]>(() => {
    const parsedValue_ = [parsedValue.value].flat()
    return Array.from({ length: innerPanelAmount.value }, (_, index) => {
      return parsedValue_[index]
        ? getDateArray(innerType.value, parsedValue_[index].toDate(), 'origin', enhProps.enhWantEnd)
        : [0, 0]
    })
  })
  const preUpdateDateArrays = ref<DateArray[]>([])

  const panelTypes = ref<EnhDateTypeClear[]>(
    Array.from({ length: innerPanelAmount.value }, () => innerType.value),
  )
  const isYearPanel = computed<boolean[]>(() => panelTypes.value.map(i => i === 'year'))

  const panelDateArrays = ref<DateArray[]>([])
  /** 范围选择时, 左侧面板右箭头和右侧面板左箭头禁用状态 */
  const isArrowDisabledForRange = computed<boolean>(() => {
    if (!innerIsRange.value) {
      return false
    }

    const rightYearMin = getRightPanelMinYear({
      dateArrays: panelDateArrays.value,
      types: panelTypes.value,
    })
    return panelDateArrays.value[1][0] <= rightYearMin
  })
  watch(dateArrays, (newVal) => {
    panelDateArrays.value = correctPanelDateArrays({
      dateArrays: newVal,
      types: panelTypes.value,
      enhProps,
      enhInner: enhInner.value,
    }, {
      sort: true,
      strict: true,
      defaultArrays: innerDefaultValue.value.map(date => getDateArray(innerType.value, date, 'origin', enhProps.enhWantEnd)),
    })
    preUpdateDateArrays.value = []
  }, { immediate: true })

  const panelItems = computed<EnhDatePickerPanelItem[][]>(() => {
    // 优先使用 preUpdateDateArrays, 其次 dateArrays
    const targetDateArrays = preUpdateDateArrays.value.length > 0
      ? preUpdateDateArrays.value
      : dateArrays.value

    return generatePanelItems({
      dateArrays: targetDateArrays,
      types: panelTypes.value,
      years: panelDateArrays.value.map(item => item[0]),
      enhProps,
      enhInner: enhInner.value,
    })
  })

  const panelTitles = computed<string[]>(() => {
    return panelTypes.value.map((type, index) => {
      const year = panelDateArrays.value[index][0] || new Date().getFullYear()
      if (type === 'year') {
        const startYear = year - (year % 10)
        const endYear = startYear + 9
        return `${startYear} - ${endYear}`
      }
      else {
        return `${year}`
      }
    })
  })

  function handlePanelChange(index: number): void {
    const dates = panelDateArrays.value.map((item, _index) => {
      return getDate(innerType.value, item, 'array', enhProps.enhWantEnd)
    })

    // @ts-expect-error types
    onPanelChange(dates, panelTypes.value[index], undefined)
  }
  function panelPrevClick(index: number): void {
    isYearPanel.value[index]
      ? panelDateArrays.value[index][0] -= 10
      : panelDateArrays.value[index][0] -= 1

    handlePanelChange(index)
  }
  function panelNextClick(index: number): void {
    isYearPanel.value[index]
      ? panelDateArrays.value[index][0] += 10
      : panelDateArrays.value[index][0] += 1

    handlePanelChange(index)
  }
  function panelTitleClick(index: number): void {
    if (panelTypes.value[index] === 'year') {
      return
    }

    panelTypes.value[index] = 'year'
  }

  function panelItemClick(index: number, item: EnhDatePickerPanelItem): void {
    if (item.type !== innerType.value) {
      panelTypes.value[index] = innerType.value
      panelDateArrays.value[index][0] = item.year
      return
    }

    // 选择已包含的日期数组时, 不再处理
    if (
      !enhProps.enhAllowSame
      && preUpdateDateArrays.value.map(i => i.join('-')).includes(item.dateArrays.join('-'))
    ) {
      return
    }
    preUpdateDateArrays.value.push(item.dateArrays)
    // 范围选择第二次后, 进行排序处理
    if (preUpdateDateArrays.value.length === 2) {
      preUpdateDateArrays.value = correctPanelDateArrays({
        dateArrays: preUpdateDateArrays.value,
        types: panelTypes.value,
        enhProps,
        enhInner: enhInner.value,
      }, {
        sort: true,
        strict: false,
        defaultArrays: false,
      })
    }

    const dates = preUpdateDateArrays.value.map((dateArr) => {
      return getDate(innerType.value, dateArr, 'array', enhProps.enhWantEnd)
    })
    // @ts-expect-error type
    innerIsRange.value && onCalendarChange(dates)

    if (preUpdateDateArrays.value.length === innerPanelAmount.value) {
      const v = dates.map(date => dayjs(date))
      onPick(innerIsRange.value ? v : v[0], false)
      preUpdateDateArrays.value = []
    }
  }

  return {
    panelItems,
    panelTitles,
    panelPrevClick,
    panelNextClick,
    panelItemClick,
    panelTitleClick,
    isArrowDisabledForRange,
  }
}
