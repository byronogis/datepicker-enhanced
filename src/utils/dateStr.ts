import type { DateTypeClear, OriginDateButSimple } from '../types'
import { DATE_ABBR, DATE_FORMAT } from './constant'
import dayjs from './dayjs'

// `年度/半年度/季度`日期缩写正则
const yearReg = /^(\d{4})$/
const halfyearReg = new RegExp(`^(\\d{4})-${DATE_ABBR.halfyear}([1-2])$`)
const quarteryearReg = new RegExp(`^(\\d{4})-${DATE_ABBR.quarteryear}([1-4])$`)

// 验证`年度/半年度/季度`日期缩写字符串是否符合期望的格式
export function valiDateAbbrStr(type: DateTypeClear, date: string) {
  let test = false
  let exec: RegExpExecArray | null = null

  switch (type) {
    case 'year':
      test = yearReg.test(date)
      test && (exec = yearReg.exec(date))
      break
    case 'halfyear':
      test = halfyearReg.test(date)
      test && (exec = halfyearReg.exec(date))
      break
    case 'quarteryear':
      test = quarteryearReg.test(date)
      test && (exec = quarteryearReg.exec(date))
      break
    default:
      test = false
      exec = null
      break
  }

  return {
    test,
    exec,
  }
}

// origin_date --> '2020'
// origin_date --> '2020-H1'
// origin_date --> '2020-Q1'
// [2020, 1] --> '2020'
// [2020, 1] --> '2020-H1'
// [2020, 1] --> '2020-Q1'
export function getDateAbbrStr(
  type: DateTypeClear,
  date: OriginDateButSimple | [number, number],
  origin: 'origin' | 'array' = 'origin',
) {
  if (origin === 'array' && Array.isArray(date)) {
    return translateArrayToDateAbbrStr(type, date as [number, number])
  } else {
    return translateDateToDateAbbrStr(type, new Date(date as OriginDateButSimple))
  }
}

// origin_date --> [2020, *]
// '2020'    --> [2020, 0]
// '2020-H2' --> [2020, 2]
// '2020-Q2' --> [2020, 2]
export function getDateArray(
  type: DateTypeClear,
  date: OriginDateButSimple | string,
  origin: 'origin' | 'abbr' = 'origin',
) {
  if (origin === 'abbr' && typeof date === 'string') {
    return translateDateAbbrStrToArray(type, date)
  } else {
    return translateDateToArray(type, new Date(date))
  }
}

// origin_date --> '2020-01-01'
// '2020-H1'   --> '2020-01-01'
// [2020, 1]   --> '2020-01-01'
export function getDateWithFormat(
  type: DateTypeClear,
  date: OriginDateButSimple | number[],
  origin: 'origin' | 'abbr' | 'array' = 'origin',
  wantEnd = false,
  valueFormat: string = DATE_FORMAT,
) {
  if (origin === 'array' && Array.isArray(date)) {
    const dateObj = translateArrayToDate(type, date as [number, number], wantEnd)
    return dayjs(dateObj).format(valueFormat)
  } else if (origin === 'abbr' && typeof date === 'string') {
    const dateObj = translateDateAbbrStrToDate(type, date, wantEnd)
    return dayjs(dateObj).format(valueFormat)
  } else {
    const dateObj = translateArrayToDate(type, getDateArray(type, date as OriginDateButSimple), wantEnd)
    return dayjs(dateObj).format(valueFormat)
  }
}

// origin_date --> Date
// '2020-Q3'   --> Date
// [2020, 2]   --> Date
export function getDate(
  type: DateTypeClear,
  date: OriginDateButSimple | number[],
  origin: 'origin' | 'abbr' | 'array' = 'origin',
  wantEnd = false,
) {
  if (origin === 'array' && Array.isArray(date)) {
    return translateArrayToDate(type, date as [number, number], wantEnd)
  } else if (origin === 'abbr' && typeof date === 'string') {
    return translateDateAbbrStrToDate(type, date, wantEnd)
  } else {
    return translateArrayToDate(type, getDateArray(type, date as OriginDateButSimple), wantEnd)
  }
}

// '2020'    --> [2020, 0]
// '2020-H2' --> [2020, 2]
// '2020-Q3' --> [2020, 3]
function translateDateAbbrStrToArray(type: DateTypeClear, date: string) {
  const { test, exec } = valiDateAbbrStr(type, date)

  if (!test || !exec) {
    return [0, 0]
  }

  const year = Number(exec[1])
  const halfyear = Number(exec[2])
  const quarteryear = Number(exec[2])

  let dateArr: [number, number] = [year, 0]

  switch (type) {
    case 'year':
      dateArr = [year, 0]
      break
    case 'halfyear':
      dateArr = [year, halfyear]
      break
    case 'quarteryear':
      dateArr = [year, quarteryear]
      break
    default:
      break
  }

  return dateArr
}

// [2020, 0] --> '2020'
// [2020, 2] --> '2020-H2'
// [2020, 3] --> '2020-Q3'
function translateArrayToDateAbbrStr(type: DateTypeClear, date: number[]) {
  // count: halfyear/quarteryear/0
  const [year, count] = date

  let dateAbbrStr = ''

  switch (type) {
    case 'year':
      dateAbbrStr = `${year}`
      break
    case 'halfyear':
      dateAbbrStr = `${year}-${DATE_ABBR.halfyear}${count}`
      break
    case 'quarteryear':
      dateAbbrStr = `${year}-${DATE_ABBR.quarteryear}${count}`
      break
    default:
      break
  }

  return dateAbbrStr
}

// '2020'    --> Date
// '2020-H2' --> Date
// '2020-Q3' --> Date
function translateDateAbbrStrToDate(type: DateTypeClear, date: string, wantEnd = false) {
  const { test, exec } = valiDateAbbrStr(type, date)

  if (!test || !exec) {
    return new Date(0)
  }

  const year = Number(exec[1])
  const halfyear = Number(exec[2])
  const quarteryear = Number(exec[2])

  let dateObj: Date = new Date(0)

  switch (type) {
    case 'year':
      dateObj = new Date(
        dayjs(`${year}`)[wantEnd ? 'endOf' : 'startOf']('year')
          .format(DATE_FORMAT),
      )
      break
    case 'halfyear':
      dateObj = new Date(
        dayjs(`${year}-${(halfyear - 1) * 6 + (wantEnd ? 6 : 1)}`)[wantEnd ? 'endOf' : 'startOf']('month')
          .format(DATE_FORMAT),
      )
      break
    case 'quarteryear':
      dateObj = new Date(
        dayjs(`${year}-${(quarteryear - 1) * 3 + (wantEnd ? 3 : 1)}`)[wantEnd ? 'endOf' : 'startOf']('month')
          .format(DATE_FORMAT),
      )
      break
    default:
      break
  }

  return dateObj
}

// Date --> '2020'
// Date --> '2020-H2'
// Date --> '2020-Q3'
function translateDateToDateAbbrStr(type: DateTypeClear, date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const halfyear = Math.ceil(month / 6)
  const quarteryear = Math.ceil(month / 3)

  let dateAbbrStr = ''

  switch (type) {
    case 'year':
      dateAbbrStr = `${year}`
      break
    case 'halfyear':
      dateAbbrStr = `${year}-${DATE_ABBR.halfyear}${halfyear}`
      break
    case 'quarteryear':
      dateAbbrStr = `${year}-${DATE_ABBR.quarteryear}${quarteryear}`
      break
    default:
      break
  }

  return dateAbbrStr
}

// [2020, 0] --> Date
// [2020, 2] --> Date
// [2020, 3] --> Date
function translateArrayToDate(type: DateTypeClear, date: number[], wantEnd = false) {
  const dateAbbrStr = translateArrayToDateAbbrStr(type, date)
  return translateDateAbbrStrToDate(type, dateAbbrStr, wantEnd)
}

// Date --> [2020, 0]
// Date --> [2020, 2]
// Date --> [2020, 3]
function translateDateToArray(type: DateTypeClear, date: Date) {
  const dateAbbrStr = translateDateToDateAbbrStr(type, date)
  return translateDateAbbrStrToArray(type, dateAbbrStr)
}
