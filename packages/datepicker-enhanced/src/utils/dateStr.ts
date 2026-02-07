import type { EnhDatePrimitive, EnhDateTypeClear } from '../types'
import { DATE_ABBR, DATE_FORMAT } from './constant'
import dayjs from './dayjs'

/** `年度/半年度/季度`日期缩写正则 */
const DateAbbrRegs: Record<EnhDateTypeClear, RegExp> = {
  year: /^(\d{4})$/,
  halfyear: new RegExp(`^(\\d{4})-${DATE_ABBR.halfyear}([1-2])$`),
  quarteryear: new RegExp(`^(\\d{4})-${DATE_ABBR.quarteryear}([1-4])$`),
}

/** 验证`年度/半年度/季度`日期缩写字符串是否符合期望的格式 */
export function valiDateAbbrStr(type: EnhDateTypeClear, date: string) {
  let test = false
  let exec: RegExpExecArray | null = null

  switch (type) {
    case 'year':
      test = DateAbbrRegs.year.test(date)
      test && (exec = DateAbbrRegs.year.exec(date))
      break
    case 'halfyear':
      test = DateAbbrRegs.halfyear.test(date)
      test && (exec = DateAbbrRegs.halfyear.exec(date))
      break
    case 'quarteryear':
      test = DateAbbrRegs.quarteryear.test(date)
      test && (exec = DateAbbrRegs.quarteryear.exec(date))
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

/**
 * origin_date --> '2020' \
 * origin_date --> '2020-H1' \
 * origin_date --> '2020-Q1' \
 * [2020, 1] --> '2020' \
 * [2020, 1] --> '2020-H1' \
 * [2020, 1] --> '2020-Q1'
 */
export function getDateAbbrStr(
  type: EnhDateTypeClear,
  date: EnhDatePrimitive | [number, number],
  origin: 'origin' | 'array' = 'origin',
) {
  if (origin === 'array' && Array.isArray(date)) {
    return translateArrayToDateAbbrStr(type, date as [number, number])
  }
  else {
    return translateDateToDateAbbrStr(type, new Date(date as EnhDatePrimitive))
  }
}

/**
 * origin_date --> [2020, *] \
 * '2020'    --> [2020, 0] \
 * '2020-H2' --> [2020, 2] \
 * '2020-Q2' --> [2020, 2]
 */
export function getDateArray(
  type: EnhDateTypeClear,
  date: EnhDatePrimitive | string,
  origin: 'origin' | 'abbr' = 'origin',
) {
  if (origin === 'abbr' && typeof date === 'string') {
    return translateDateAbbrStrToArray(type, date)
  }
  else {
    return translateDateToArray(type, new Date(date))
  }
}

/**
 * origin_date --> '2020-01-01' \
 * '2020-H1'   --> '2020-01-01' \
 * [2020, 1]   --> '2020-01-01'
 */
export function getDateWithFormat(
  type: EnhDateTypeClear,
  date: EnhDatePrimitive | number[],
  origin: 'origin' | 'abbr' | 'array' = 'origin',
  enhWantEnd = false,
  valueFormat: string = DATE_FORMAT,
) {
  if (origin === 'array' && Array.isArray(date)) {
    const dateObj = translateArrayToDate(type, date as [number, number], enhWantEnd)
    return dayjs(dateObj).format(valueFormat)
  }
  else if (origin === 'abbr' && typeof date === 'string') {
    const dateObj = translateDateAbbrStrToDate(type, date, enhWantEnd)
    return dayjs(dateObj).format(valueFormat)
  }
  else {
    const dateObj = translateArrayToDate(type, getDateArray(type, date as EnhDatePrimitive), enhWantEnd)
    return dayjs(dateObj).format(valueFormat)
  }
}

/**
 * origin_date --> Date \
 * '2020-Q3'   --> Date \
 * [2020, 2]   --> Date
 */
export function getDate(
  type: EnhDateTypeClear,
  date: EnhDatePrimitive | number[],
  origin: 'origin' | 'abbr' | 'array' = 'origin',
  enhWantEnd = false,
) {
  if (origin === 'array' && Array.isArray(date)) {
    return translateArrayToDate(type, date as [number, number], enhWantEnd)
  }
  else if (origin === 'abbr' && typeof date === 'string') {
    return translateDateAbbrStrToDate(type, date, enhWantEnd)
  }
  else {
    return translateArrayToDate(type, getDateArray(type, date as EnhDatePrimitive), enhWantEnd)
  }
}

/**
 * '2020'    --> [2020, 0] \
 * '2020-H2' --> [2020, 2] \
 * '2020-Q3' --> [2020, 3]
 */
function translateDateAbbrStrToArray(type: EnhDateTypeClear, date: string) {
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

/**
 * [2020, 0] --> '2020' \
 * [2020, 2] --> '2020-H2' \
 * [2020, 3] --> '2020-Q3'
 */
function translateArrayToDateAbbrStr(type: EnhDateTypeClear, date: number[]) {
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

/**
 * '2020'    --> Date \
 * '2020-H2' --> Date \
 * '2020-Q3' --> Date
 */
function translateDateAbbrStrToDate(type: EnhDateTypeClear, date: string, enhWantEnd = false) {
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
        dayjs(`${year}`)[enhWantEnd ? 'endOf' : 'startOf']('year')
          .format(DATE_FORMAT),
      )
      break
    case 'halfyear':
      dateObj = new Date(
        dayjs(`${year}-${(halfyear - 1) * 6 + (enhWantEnd ? 6 : 1)}`)[enhWantEnd ? 'endOf' : 'startOf']('month')
          .format(DATE_FORMAT),
      )
      break
    case 'quarteryear':
      dateObj = new Date(
        dayjs(`${year}-${(quarteryear - 1) * 3 + (enhWantEnd ? 3 : 1)}`)[enhWantEnd ? 'endOf' : 'startOf']('month')
          .format(DATE_FORMAT),
      )
      break
    default:
      break
  }

  return dateObj
}

/**
 * Date --> '2020' \
 * Date --> '2020-H2' \
 * Date --> '2020-Q3'
 */
function translateDateToDateAbbrStr(type: EnhDateTypeClear, date: Date) {
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

/**
 * [2020, 0] --> Date \
 * [2020, 2] --> Date \
 * [2020, 3] --> Date
 */
function translateArrayToDate(type: EnhDateTypeClear, date: number[], enhWantEnd = false) {
  const dateAbbrStr = translateArrayToDateAbbrStr(type, date)
  return translateDateAbbrStrToDate(type, dateAbbrStr, enhWantEnd)
}

/**
 * Date --> [2020, 0] \
 * Date --> [2020, 2] \
 * Date --> [2020, 3]
 */
function translateDateToArray(type: EnhDateTypeClear, date: Date) {
  const dateAbbrStr = translateDateToDateAbbrStr(type, date)
  return translateDateAbbrStrToArray(type, dateAbbrStr)
}
