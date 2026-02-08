import type {
  EnhDatePickerPanelItem,
  EnhDateTypeClear,
} from '../types'
import dayjs from 'dayjs'
import { ROOT_COMMON_PICKER_INJECTION_KEY } from 'element-plus'
import { computed, inject, ref, watch } from 'vue'
import {
  enhInnerInjectionKey,
  enhPropsInjectionKey,
} from '../utils/constant.ts'
import {
  getDate,
  getDateArray,
} from '../utils/dateStr'
import generateItems from '../utils/generateItems'

function getPanelValue(type: EnhDateTypeClear, modelValue: number[][]) {
  const result = modelValue
    .map((i) => {
      if (i.every(j => j === 0)) {
        return getDateArray(type, new Date())
      }
      else {
        return [...i]
      }
    })
    .sort((a, b) => Number(getDate(type, a, 'array')) - Number(getDate(type, b, 'array')))

  // 处理范围面板边界
  // 年份时右侧面板年份不能小于左侧面板年份+10
  // 非年份时右侧面板年份不能小于左侧面板年份+1
  if (result.length === 2) {
    const leftYear = result[0][0]
    const rightYear = result[1][0]
    const rightYearMin = type === 'year'
      ? leftYear + 10
      : leftYear + 1

    if (rightYear < rightYearMin) {
      result[1][0] = rightYearMin
    }
  }

  return result
}

export function useDatePickerEnhanced() {
  const {
    // parsedValue,
    pickerVisible,
    // onCalendarChange,
    // onPanelChange,
    // onSetPickerOption,
    onPick,
  } = inject(ROOT_COMMON_PICKER_INJECTION_KEY)!

  const enhProps = inject(enhPropsInjectionKey)!
  const enhInner = inject(enhInnerInjectionKey)!

  const innerType = computed(() => enhInner.value.innerType)
  const innerIsRange = computed(() => enhInner.value.innerIsRange)
  const innerModelValue = computed(() => enhInner.value.innerModelValue)

  let itemClickTimes = 0
  let lastClickIndex = -1
  let preUpdateModelValue = Array.from<[number, number]>({ length: innerModelValue.value.length }).fill([0, 0])
  const isArrowDisabledForRange = ref(false)

  // [origin_date] --> [[2020, 1], ~]
  const localModelValue = computed(() => {
    return innerModelValue.value
      .sort((a, b) => +new Date(a) - +new Date(b))
      .map(date => getDateArray(innerType.value, date))
  })
  // [boolean, ~]
  const isLocalModelValueEmpty = computed(() => localModelValue.value.map(item => item.every(i => i === 0)))

  // panel prop
  const panelValue = ref<number[][]>(getPanelValue(innerType.value, localModelValue.value)) // 操作所用; 重点：解构; 侦听再赋值
  const panelItems = ref<EnhDatePickerPanelItem[][]>(Array.from<EnhDatePickerPanelItem[]>({ length: innerIsRange.value ? 2 : 1 }).fill([]))
  const panelType = ref<EnhDateTypeClear[]>(Array.from<EnhDateTypeClear>({ length: innerModelValue.value.length }).fill(innerType.value))
  const isYearPanel = computed<boolean[]>(() => panelType.value.map(i => i === 'year'))
  const panelStartYear = computed<number[]>(() => panelValue.value.map(i => i[0] - i[0] % 10))
  const panelStopYear = computed<number[]>(() => panelStartYear.value.map(i => i + 9))
  const panelTitle = computed<string[]>(() => {
    return panelValue.value.map((item, index) => {
      if (isYearPanel.value[index]) {
        return `${panelStartYear.value[index]} - ${panelStopYear.value[index]}`
      }
      else {
        return `${item[0]}`
      }
    })
  })

  // panel method
  const panelPrevClick = (index: number) => {
    isYearPanel.value[index]
      ? panelValue.value[index][0] -= 10
      : panelValue.value[index][0] -= 1
  }
  const panelNextClick = (index: number) => {
    isYearPanel.value[index]
      ? panelValue.value[index][0] += 10
      : panelValue.value[index][0] += 1
  }
  const panelItemClick = (index: number, item: EnhDatePickerPanelItem) => {
    console.log('点击了 ==> ', item)

    if (item.isDisabled) {
      console.log('isDisabled')
      return
    }

    // 点击期望类型项时, (有效)点击次数 + 1
    if (item.type === innerType.value) {
      itemClickTimes += 1
    }

    if (item.type === 'year' && innerType.value !== 'year') {
      panelValue.value[index][0] = item.year
      panelType.value[index] = innerType.value
    }
    else {
      const target = lastClickIndex === -1
        ? index
        : lastClickIndex === 1
          ? 0
          : 1

      // 第二次点击和第一次点击的值相同时, 不做后续处理
      if (!enhProps.enhAllowSame && itemClickTimes === 2 && (Number(preUpdateModelValue[lastClickIndex].join('')) === Number([item.year, item[innerType.value] || 0].join('')))) {
        // 有效点击次数 - 1
        itemClickTimes -= 1
        return
      }

      lastClickIndex = index
      panelValue.value[target] = [item.year, item[innerType.value] || 0]
      preUpdateModelValue[target] = [item.year, item[innerType.value] || 0]
    }
  }
  const panelTitleClick = (index: number) => {
    if (isYearPanel.value[index]) {
      return
    }

    // 范围面板不切换面板类型
    // TODO: 范围面板支持切换面板类型
    if (innerModelValue.value.length === 2 || innerType.value.includes('range')) {
      return
    }

    panelType.value[index] = 'year'
  }

  // 面板类型改变生成面板项目
  watch([panelType, panelTitle], () => {
    generatePanelItems()
  }, { deep: true })

  // 面板值改变时同步改变传入数据值
  watch(panelValue, (newV) => {
    // 更新范围面板左右箭头禁用状态
    if (panelValue.value.length === 2) {
      // 优先正则匹配title中的年份, 面板值的第一项兜底
      const leftYear = Number(panelTitle.value[0].match(/\d{4}/g)?.[0] ?? panelValue.value[0][0])
      const rightYear = Number(panelTitle.value[1].match(/\d{4}/g)?.[0] ?? panelValue.value[1][0])
      // 允许的差值
      const diff = panelType.value[0] === 'year'
        ? 10
        : 1

      isArrowDisabledForRange.value = rightYear - leftYear <= diff
    }

    // 未选择完成时不改变传入数据值, 仅重新生成面板项本次选择状态
    console.log('itemClickTimes < innerModelValue.value.length', itemClickTimes, innerModelValue.value.length)
    if (itemClickTimes < innerModelValue.value.length) {
      if (itemClickTimes === 0) {
        return
      }

      generatePanelItems([preUpdateModelValue[lastClickIndex]])
      return
    }

    console.log('改变了日期 new old: ', [...newV], localModelValue.value)

    const newModelValue = preUpdateModelValue
      .map((item, _index) => {
        return getDate(innerType.value, item, 'array', enhProps.enhWantEnd)
      })
      .sort((a, b) => +new Date(a) - +new Date(b))
      .map(i => dayjs(i))

    // 更新 modelValue
    console.log('newModelValue', newModelValue)
    onPick(innerIsRange.value ? newModelValue : newModelValue[0], false)
  }, { deep: true })

  // 传入数据值变动时同步改变面板值, 以打开后最新状态
  watch(localModelValue, () => {
    if (isLocalModelValueEmpty.value.every(Boolean)) {
      return
    }

    panelValue.value = getPanelValue(innerType.value, localModelValue.value)
    generatePanelItems()
  })

  watch(() => pickerVisible.value, (newVal: boolean) => {
    console.log('pickerVisible changed: ', newVal)
    if (newVal) {
      panelValue.value = getPanelValue(innerType.value, localModelValue.value)
      panelItems.value = Array.from<EnhDatePickerPanelItem[]>({ length: innerIsRange.value ? 2 : 1 }).fill([])
      panelType.value = Array.from<EnhDateTypeClear>({ length: innerModelValue.value.length }).fill(innerType.value)
      generatePanelItems()
    }
    else {
      // 状态重置
      itemClickTimes = 0
      lastClickIndex = -1
      preUpdateModelValue = Array.from<[number, number]>({ length: innerIsRange.value ? 2 : 1 }).fill([0, 0])
    }
  })

  // 生成面板项目
  function generatePanelItems(sourceModelValue: number[][] = localModelValue.value) {
    panelItems.value = Array.from<EnhDatePickerPanelItem[]>({ length: innerIsRange.value ? 2 : 1 }).map((_i, index) => generateItems(
      panelType.value[index],
      panelValue.value[index],
      panelStartYear.value[index],
      sourceModelValue,
      enhProps.disabledDate,
      enhProps.enhWantEnd,
    ))
  }

  return {
    panelItems,
    panelTitle,
    panelPrevClick,
    panelNextClick,
    panelItemClick,
    panelTitleClick,
    isArrowDisabledForRange,
  }
}
