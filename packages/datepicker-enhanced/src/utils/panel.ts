import type {
  EnhDatePickerPanelItem,
  EnhDatePickerProps,
  EnhDateTypeClear,
  EnhInner,
} from '../types/index.ts'
import type { DateArray } from './dateStr.ts'
import { DATE_ABBR } from './constant.ts'
import { getDate } from './dateStr.ts'

export interface PanelContext {
  dateArrays: DateArray[]
  types: EnhDateTypeClear[]
  years: number[]
  enhProps: EnhDatePickerProps
  enhInner: EnhInner
}

export interface PanelCorrectOptions {
  sort?: boolean
  strict?: boolean
  defaultArrays?: false | DateArray[]
}

// 生成视图数据
export function generatePanelItems(
  {
    dateArrays,
    types,
    years,
    enhProps,
    enhInner,
  }: PanelContext,
): EnhDatePickerPanelItem[][] {
  const today = new Date()
  const todays = {
    year: today.getFullYear(),
    halfyear: Math.ceil((today.getMonth() + 1) / 6),
    quarteryear: Math.ceil((today.getMonth() + 1) / 3),
  }

  return types.map((type, index) => {
    const year = years[index] || new Date().getFullYear()
    const itemValues = getPanelItemValues(type, year)
    const isTargetType = type === enhInner.innerType

    return itemValues.map((value) => {
      const currentDateArrays: DateArray = type === 'year' ? [value, 0] : [year, value]
      const dateObj = getDate(type, currentDateArrays, 'array')

      const isStartDate = enhInner.innerIsRange && dateArrays.length >= 1
        ? dateArrays[0][0] === (type === 'year' ? value : year)
        && (type === 'year' ? true : dateArrays[0][1] === value)
        : null
      const isEndDate = enhInner.innerIsRange && dateArrays.length === 2
        ? dateArrays[1][0] === (type === 'year' ? value : year)
        && (type === 'year' ? true : dateArrays[1]?.[1] === value)
        : null

      return {
        date: dateObj,
        dateArrays: currentDateArrays,
        type,
        label: type === 'year'
          ? `${value}`
          : `${DATE_ABBR[type]}${value}`,
        year: type === 'year' ? value : year,
        halfyear: type === 'halfyear' ? value : null,
        quarteryear: type === 'quarteryear' ? value : null,
        isDisabled: isTargetType && (enhProps.disabledDate?.(dateObj) ?? false),
        isToday: {
          year: value === todays.year,
          halfyear: year === todays.year && value === todays.halfyear,
          quarteryear: year === todays.year && value === todays.quarteryear,
        }[type],
        isCurrent: enhInner.innerIsRange
          ? false
          : dateArrays.some((item) => {
              return type === 'year'
                ? item[0] === value
                : item[0] === year && item[1] === value
            }),
        isStartDate,
        isEndDate,
        // 如果是起止本身, 或者在起止之间, 都属于 inrange
        isInRange: enhInner.innerIsRange && (isStartDate || isEndDate || (
          dateArrays.length === 2
          && dateObj.getTime()
          > getDate(type, dateArrays[0], 'array').getTime()
          && dateObj.getTime()
          < getDate(type, dateArrays[1], 'array').getTime()
        )),
      } satisfies EnhDatePickerPanelItem
    })
  })
}

export function correctPanelDateArrays(
  {
    dateArrays,
    types,
    enhInner,
  }: Omit<PanelContext, 'years'>,
  {
    sort = true,
    strict = true,
    defaultArrays = false,
  }: PanelCorrectOptions = {},
): DateArray[] {
  let arraysCopy = dateArrays.map(item => [...item] as DateArray)

  const isInvalid = arraysCopy.some(item => item[0] === 0 && item[1] === 0)
  if (isInvalid) {
    if (!defaultArrays || defaultArrays.length !== arraysCopy.length) {
      return dateArrays
    }
    else {
      arraysCopy = defaultArrays
    }
  }

  if (arraysCopy.length === 2) {
    sort && arraysCopy.sort((a, b) => {
      return getDate(enhInner.innerType, a, 'array').getTime()
        - getDate(enhInner.innerType, b, 'array').getTime()
    })

    if (strict) {
      const rightYearMin = getRightPanelMinYear({
        types,
        dateArrays: arraysCopy,
      })
      if (arraysCopy[1][0] < rightYearMin) {
        arraysCopy[1][0] = rightYearMin
      }
    }
  }
  return arraysCopy
}

export function getRightPanelMinYear(
  {
    dateArrays,
    types,
  }: Pick<PanelContext, 'dateArrays' | 'types'>,
): number {
  const leftYear = dateArrays[0][0]
  return types[1] === 'year'
    ? leftYear + 10
    : leftYear + 1
}

function getPanelItemValues(
  type: EnhDateTypeClear,
  year: number = new Date().getFullYear(),
): number[] {
  return {
    year: Array.from({ length: 10 }, (_, idx) => year - (year % 10) + idx),
    halfyear: [1, 2],
    quarteryear: [1, 2, 3, 4],
  }[type]
}
