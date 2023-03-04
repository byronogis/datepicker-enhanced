import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import type { DateModelType } from 'element-plus'
import type { DatePickerPanelType } from './types'

dayjs.extend(customParseFormat)

const dateFormat = 'YYYY-MM-DD'

const dateAbbr = [
  ['halfyear', 'H'],
  ['quarteryear', 'Q'],
]

function generateDateStr(date: DateModelType, type: DatePickerPanelType) {
  const standerStr = dayjs(date).format(dateFormat)
  const dateArr = standerStr.split('-').map(Number)

  const year = dateArr[0]
  const month = dateArr[1] + 1

  const dict = {
    halfyear: Math.ceil(month / 6),
    quarteryear: Math.ceil(month / 3),
  }

  let dateStr

  if (type === 'halfyear' || type === 'quarteryear') {
    const abbr = (dateAbbr.find(i => i[0] === type) as string[])[1]
    dateStr = `${year}-${abbr}${dict[type]}`
  } else { // year
    dateStr = `${year}`
  }

  return dateStr
}

export function dateUnify(dateOrigin: DateModelType | [DateModelType, DateModelType], type: DatePickerPanelType) {
  const getDateStr = (date: DateModelType) => {
    const isValid = dayjs(date, dateFormat, true).isValid()
    return generateDateStr(isValid ? date : new Date(), type)
  }

  if (Array.isArray(dateOrigin)) {
    return dateOrigin.map(cur => getDateStr(cur))
  } else {
    return getDateStr(dateOrigin)
  }
}

// '2021'    --> '2021-01-01'
// '2021-H2' --> '2021-07-01'
// '2021-Q2' --> '2021-04-01'
export function dateUnifiedParse(dateUnified: string | string[], type: DatePickerPanelType) {
  const parseDateStr = (date: string) => {
    const arr = date.split('-')
    const year = arr[0]
    if (type === 'halfyear') {
      const prepareToFormat = [year, (Number(arr[1][1]) - 1) * 6 + 1].join('-')
      return dayjs(prepareToFormat).format(dateFormat)
    } else if (type === 'quarteryear') {
      const prepareToFormat = [year, (Number(arr[1][1]) - 1) * 3 + 1].join('-')
      return dayjs(prepareToFormat).format(dateFormat)
    } else { // 'year'
      return dayjs(year).format(dateFormat)
    }
  }

  if (Array.isArray(dateUnified)) {
    return dateUnified.map(str => parseDateStr(str))
  } else {
    return parseDateStr(dateUnified)
  }
}
