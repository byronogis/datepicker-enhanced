/* eslint-disable @typescript-eslint/no-unused-vars */
import { computed, reactive, ref, watch } from 'vue'
import generateItems from '../utils/generateItems'
import {
  getDate,
  getDateAbbrStr,
  getDateArray,
  getDateWithFormat,
  valiDateAbbrStr,
} from '../utils/dateStr'
import type {
  DatePickerPanelItem,
  DateTypeClear,
  InnerDatePickerEnhancedProps,
} from '../types'

// type LocalModelValue = number[]

function usePopover(props: InnerDatePickerEnhancedProps): any {
  return reactive({
    trigger: 'click',
    placement: 'bottom',
    hideAfter: 0,
    transition: 'el-zoom-in-top',
    visible: false,
    popperClass: props.popperClass,
    teleported: false,
  })
}

function updateModelValue(emits: any, newValue: (string | Date)[]) {
  emits('update:modelValue', newValue)
}

function getPanelValue(type: DateTypeClear, modelValue: number[][]) {
  const result = modelValue
    .map(i => {
      if (i.every(j => j === 0)) {
        return getDateArray(type, new Date())
      } else {
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

export default function useDatePickerEnhanced(
  props: InnerDatePickerEnhancedProps,
  emits: any,
) {
  let itemClickTimes = 0
  let lastClickIndex = -1
  const isArrowDisabledForRange = ref(false)

  // [origin_date] --> [[2020, 1], ~]
  const localModelValue = computed(() => {
    return props.modelValue
      .sort((a, b) => +new Date(a) - +new Date(b))
      .map(date => getDateArray(props.type, date))
  })
  // [boolean, ~]
  const isLocalModelValueEmpty = computed(() => localModelValue.value.map(item => item.every(i => i === 0)))

  // popover prop
  const popover = usePopover(props)

  // input prop
  const inputValue = computed({
    get() {
      return isLocalModelValueEmpty.value.map((item, index) => {
        if (item) {
          return ''
        } else {
          return getDateAbbrStr(props.type, props.modelValue[index])
        }
      })
    },
    set(valArr) {
      const newModelValue = valArr
        .map((val, index) => {
          if (val === '') {
            return ''
          }

          if (valiDateAbbrStr(props.type, val).test) {
            return props.valueFormat
              ? getDateWithFormat(props.type, val, 'abbr', props.wantEnd, props.valueFormat)
              : getDate(props.type, val, 'abbr', props.wantEnd)
          } else {
            return props.valueFormat
              ? getDateWithFormat(props.type, localModelValue.value[index], 'array', props.wantEnd, props.valueFormat)
              : getDate(props.type, localModelValue.value[index], 'array', props.wantEnd)
          }
        })
        .sort((a, b) => +new Date(a) - +new Date(b))

      updateModelValue(emits, newModelValue)
    },
  })

  // panel prop
  const panelValue = ref<number[][]>(getPanelValue(props.type, localModelValue.value)) // 操作所用; 重点：解构; 侦听再赋值
  const panelItems = ref<DatePickerPanelItem[][]>([])
  const panelType = ref<DateTypeClear[]>([props.type, props.type])
  const isYearPanel = computed<boolean[]>(() => panelType.value.map(i => i === 'year'))
  const panelStartYear = computed<number[]>(() => panelValue.value.map(i => i[0] - i[0] % 10))
  const panelStopYear = computed<number[]>(() => panelStartYear.value.map(i => i + 9))
  const panelTitle = computed<string[]>(() => {
    return panelValue.value.map((item, index) => {
      if (isYearPanel.value[index]) {
        return `${panelStartYear.value[index]} - ${panelStopYear.value[index]}`
      } else {
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
  const panelItemClick = (index: number, item: DatePickerPanelItem) => {
    console.log('点击了 ==> ', item)

    if (item.isDisabled) {
      console.log('isDisabled')
      return
    }

    // 点击期望类型项时, (有效)点击次数 + 1
    if (item.type === props.type) {
      itemClickTimes += 1
    }

    if (item.type === 'year' && props.type !== 'year') {
      panelValue.value[index][0] = item.year
      panelType.value[index] = props.type
    } else {
      const target = lastClickIndex === -1
        ? index
        : lastClickIndex === 1
          ? 0
          : 1
      lastClickIndex = index
      panelValue.value[target] = [item.year, item[props.type] || 0]
    }
  }
  const panelTitleClick = (index: number) => {
    if (isYearPanel.value[index]) {
      return
    }

    // 范围面板不切换面板类型
    // TODO: 范围面板支持切换面板类型
    if (props.modelValue.length === 2 || props.type.includes('range')) {
      return
    }

    panelType.value[index] = 'year'
  }

  // 面板类型改变生成面板项目
  watch([panelType, panelTitle], () => {
    generatePanelItems()
  }, { deep: true })

  // 面板值改变时同步改变传入数据值
  watch(panelValue, newV => {
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
    if (itemClickTimes < props.modelValue.length) {
      if (itemClickTimes === 0) {
        return
      }

      generatePanelItems([panelValue.value[lastClickIndex]])
      return
    }

    console.log('改变了日期 new old: ', [...newV], localModelValue.value)

    const newModelValue = panelValue.value
      .map((item, index) => {
        return props.valueFormat
          ? getDateWithFormat(props.type, item, 'array', props.wantEnd, props.valueFormat)
          : getDate(props.type, item, 'array', props.wantEnd)
      })
      .sort((a, b) => +new Date(a) - +new Date(b))

    // 更新 modelValue
    updateModelValue(emits, newModelValue)
    // 关闭弹窗
    popover.visible = false
  }, { deep: true })

  // 传入数据值变动时同步改变面板值, 以打开后最新状态
  watch(localModelValue, () => {
    if (isLocalModelValueEmpty.value.every(Boolean)) {
      return
    }

    panelValue.value = getPanelValue(props.type, localModelValue.value)
    generatePanelItems()
  })

  watch(() => popover.visible, (newVal: boolean) => {
    if (newVal) {
      panelValue.value = getPanelValue(props.type, localModelValue.value)
      generatePanelItems()
    } else {
      // 状态重置
      itemClickTimes = 0
      lastClickIndex = -1
    }
  })

  // 生成面板项目
  function generatePanelItems(sourceModelValue: number[][] = localModelValue.value) {
    panelItems.value = props.modelValue.map((_i, index) => generateItems(
      panelType.value[index],
      panelValue.value[index],
      panelStartYear.value[index],
      sourceModelValue,
      props.disabledDate,
      props.wantEnd,
    ))
  }

  // 立即生成面板项目
  generatePanelItems()

  return {
    popover,
    inputValue,
    panelItems,
    panelTitle,
    panelPrevClick,
    panelNextClick,
    panelItemClick,
    panelTitleClick,
    isArrowDisabledForRange,
  }
}
