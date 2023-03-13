import { DATE_ABBR } from '../utils/constant'
import { getDate } from '../utils/dateStr'
import type {
  DatePickerPanelItem,
  DateTypeClear,
} from '../types'

// 生成视图数据
export default function generateItems(
  panelType: DateTypeClear,
  panelValue: number[],
  panelStartYear: number,
  // 用于判断当前项的isCurrent, 考虑到范围面板, 因此下面使用some遍历判断,以使得单面板可容纳多个isCurrent
  localModelValue: number[][],
  disabledDate: (date: Date) => boolean,
  wantEnd = false,
) {
  const isRange = localModelValue.length === 2
  const isValidRange = localModelValue.every(item => item.every(i => i !== 0))

  let items: DatePickerPanelItem[] = []

  const curDate = new Date()
  const current = {
    year: curDate.getFullYear(),
    month: curDate.getMonth() + 1,
    quarteryear: Math.ceil(curDate.getMonth() / 3),
    halfyear: Math.ceil(curDate.getMonth() / 6),
  }

  if (panelType === 'year') { // 年度
    items = Array(10).fill(0).map((_cur, idx): DatePickerPanelItem => {
      const year = panelStartYear + idx
      const dateObj = getDate('year', [year, 0], 'array', wantEnd)

      return {
        type: 'year',
        label: `${year}`,
        year,
        isToday: year === current.year,
        isCurrent: localModelValue.some(item => item[0] === year),
        isDisabled: disabledDate(dateObj),
        isStartDate: year === localModelValue[0][0],
        isEndDate: isRange && year === localModelValue[1][0],
        isInRange: isRange && localModelValue.every(item => item[0] !== 0)
            && year >= localModelValue[0][0] && year <= localModelValue[1][0],
      }
    })
  } else if (panelType === 'halfyear') { // 半年
    items = Array(2).fill(0).map((_cur, idx): DatePickerPanelItem => {
      const year = panelValue[0]
      const halfyear = idx + 1
      const dateObj = getDate('halfyear', [year, halfyear], 'array', wantEnd)

      return {
        type: 'halfyear',
        label: `${DATE_ABBR.halfyear}${halfyear}`,
        year,
        halfyear,
        isToday: year === current.year && halfyear === current.halfyear,
        isCurrent: localModelValue.some(item => item[0] === year && item[1] === halfyear),
        isDisabled: disabledDate(dateObj),
        isStartDate: year === localModelValue[0][0] && halfyear === localModelValue[0][1],
        isEndDate: isRange && year === localModelValue[1][0] && halfyear === localModelValue[1][1],
        isInRange: isRange && isValidRange
          && Number([year, halfyear].join('')) >= Number([localModelValue[0][0], localModelValue[0][1]].join(''))
          && Number([year, halfyear].join('')) <= Number([localModelValue[1][0], localModelValue[1][1]].join('')),
      }
    })
  } else if (panelType === 'quarteryear') { // 季度
    items = Array(4).fill(0).map((_cur, idx): DatePickerPanelItem => {
      const year = panelValue[0]
      const quarteryear = idx + 1
      const dateObj = getDate('quarteryear', [year, quarteryear], 'array', wantEnd)

      return {
        type: 'quarteryear',
        label: `${DATE_ABBR.quarteryear}${quarteryear}`,
        year,
        quarteryear,
        isToday: year === current.year && quarteryear === current.quarteryear,
        isCurrent: localModelValue.some(item => item[0] === year && item[1] === quarteryear),
        isDisabled: disabledDate(dateObj),
        isStartDate: year === localModelValue[0][0] && quarteryear === localModelValue[0][1],
        isEndDate: isRange && year === localModelValue[1][0] && quarteryear === localModelValue[1][1],
        isInRange: isRange && isValidRange
          && Number([year, quarteryear].join('')) >= Number([localModelValue[0][0], localModelValue[0][1]].join(''))
          && Number([year, quarteryear].join('')) <= Number([localModelValue[1][0], localModelValue[1][1]].join('')),
      }
    })
  }

  return items
}
