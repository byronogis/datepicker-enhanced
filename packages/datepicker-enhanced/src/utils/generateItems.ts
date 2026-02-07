import type {
  EnhDatePickerPanelItem,
  EnhDateTypeClear,
} from '../types'
import { DATE_ABBR } from '../utils/constant'
import { getDate } from '../utils/dateStr'

// 生成视图数据
export default function generateItems(
  panelType: EnhDateTypeClear,
  panelValue: number[],
  panelStartYear: number,
  // 用于判断当前项的isCurrent, 考虑到范围面板, 因此下面使用some遍历判断,以使得单面板可容纳多个isCurrent
  sourceModelValue: number[][],
  disabledDate: (date: Date) => boolean = () => false,
  enhWantEnd = false,
) {
  const isRange = sourceModelValue.length === 2
  const isValidRange = sourceModelValue.every(item => item.every(i => i !== 0))

  let items: EnhDatePickerPanelItem[] = []

  const curDate = new Date()
  const current = {
    year: curDate.getFullYear(),
    month: curDate.getMonth() + 1,
    quarteryear: Math.ceil(curDate.getMonth() / 3),
    halfyear: Math.ceil(curDate.getMonth() / 6),
  }

  if (panelType === 'year') { // 年度
    items = Array.from({ length: 10 }).fill(0).map((_cur, idx): EnhDatePickerPanelItem => {
      const year = panelStartYear + idx
      const dateObj = getDate('year', [year, 0], 'array', enhWantEnd)

      return {
        type: 'year',
        label: `${year}`,
        year,
        isToday: year === current.year,
        isCurrent: sourceModelValue.some(item => item[0] === year),
        isDisabled: disabledDate(dateObj),
        isStartDate: year === sourceModelValue[0][0],
        isEndDate: isRange && year === sourceModelValue[1][0],
        isInRange: isRange && sourceModelValue.every(item => item[0] !== 0)
          && year >= sourceModelValue[0][0] && year <= sourceModelValue[1][0],
      }
    })
  }
  else if (panelType === 'halfyear') { // 半年
    items = Array.from({ length: 2 }).fill(0).map((_cur, idx): EnhDatePickerPanelItem => {
      const year = panelValue[0]
      const halfyear = idx + 1
      const dateObj = getDate('halfyear', [year, halfyear], 'array', enhWantEnd)

      return {
        type: 'halfyear',
        label: `${DATE_ABBR.halfyear}${halfyear}`,
        year,
        halfyear,
        isToday: year === current.year && halfyear === current.halfyear,
        isCurrent: sourceModelValue.some(item => item[0] === year && item[1] === halfyear),
        isDisabled: disabledDate(dateObj),
        isStartDate: year === sourceModelValue[0][0] && halfyear === sourceModelValue[0][1],
        isEndDate: isRange && year === sourceModelValue[1][0] && halfyear === sourceModelValue[1][1],
        isInRange: isRange && isValidRange
          && Number([year, halfyear].join('')) >= Number([sourceModelValue[0][0], sourceModelValue[0][1]].join(''))
          && Number([year, halfyear].join('')) <= Number([sourceModelValue[1][0], sourceModelValue[1][1]].join('')),
      }
    })
  }
  else if (panelType === 'quarteryear') { // 季度
    items = Array.from({ length: 4 }).fill(0).map((_cur, idx): EnhDatePickerPanelItem => {
      const year = panelValue[0]
      const quarteryear = idx + 1
      const dateObj = getDate('quarteryear', [year, quarteryear], 'array', enhWantEnd)

      return {
        type: 'quarteryear',
        label: `${DATE_ABBR.quarteryear}${quarteryear}`,
        year,
        quarteryear,
        isToday: year === current.year && quarteryear === current.quarteryear,
        isCurrent: sourceModelValue.some(item => item[0] === year && item[1] === quarteryear),
        isDisabled: disabledDate(dateObj),
        isStartDate: year === sourceModelValue[0][0] && quarteryear === sourceModelValue[0][1],
        isEndDate: isRange && year === sourceModelValue[1][0] && quarteryear === sourceModelValue[1][1],
        isInRange: isRange && isValidRange
          && Number([year, quarteryear].join('')) >= Number([sourceModelValue[0][0], sourceModelValue[0][1]].join(''))
          && Number([year, quarteryear].join('')) <= Number([sourceModelValue[1][0], sourceModelValue[1][1]].join('')),
      }
    })
  }

  return items
}
