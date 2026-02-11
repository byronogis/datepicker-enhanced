import type { EnhDatePrimitive, EnhDateTypeClear } from '../types/index.ts'
import { DATE_ABBR, DATE_FORMAT } from './constant.ts'
import dayjs from './dayjs.ts'

export type DateArray = [number, number]

/** `年度/半年度/季度`日期缩写正则 */
const DateAbbrRegs: Record<EnhDateTypeClear, RegExp> = {
  year: /^(\d{4})$/,
  halfyear: new RegExp(`^(\\d{4})-${DATE_ABBR.halfyear}([1-2])$`),
  quarteryear: new RegExp(`^(\\d{4})-${DATE_ABBR.quarteryear}([1-4])$`),
}

/** 验证`年度/半年度/季度`日期缩写字符串是否符合期望的格式 */
export function valiDateAbbrStr(
  type: EnhDateTypeClear,
  date: string,
): {
  test: boolean
  exec: RegExpExecArray | null
} {
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
  date: EnhDatePrimitive | DateArray,
  origin: 'origin' | 'array' = 'origin',
  enhWantEnd = false,
): string {
  const date_ = getDate(type, date as EnhDatePrimitive, origin, enhWantEnd)
  return translateDateToDateAbbrStr(type, date_)
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
  enhWantEnd = false,
): DateArray {
  const date_ = getDate(type, date as EnhDatePrimitive, origin, enhWantEnd)
  return translateDateToArray(type, date_)
}

/**
 * origin_date --> '2020-01-01' \
 * '2020-H1'   --> '2020-01-01' \
 * [2020, 1]   --> '2020-01-01'
 */
export function getDateWithFormat(
  type: EnhDateTypeClear,
  date: EnhDatePrimitive | DateArray,
  origin: 'origin' | 'abbr' | 'array' = 'origin',
  enhWantEnd = false,
  valueFormat: string = DATE_FORMAT[type],
): string {
  const date_ = getDate(type, date as EnhDatePrimitive, origin, enhWantEnd)
  return dayjs(date_).format(valueFormat)
}

/**
 * origin_date --> Date \
 * '2020-Q3'   --> Date \
 * [2020, 2]   --> Date
 */
export function getDate(
  type: EnhDateTypeClear,
  date: EnhDatePrimitive | DateArray,
  origin: 'origin' | 'abbr' | 'array' = 'origin',
  enhWantEnd = false,
  fallbackDate: Date = new Date(),
): Date {
  if (Array.isArray(date)) {
    return translateArrayToDate(type, date, enhWantEnd)
  }

  if (origin === 'abbr') {
    if (typeof date !== 'string') {
      console.warn('When origin is "abbr", date must be a string type.')
      return fallbackDate
    }
    return translateDateAbbrStrToDate(type, date, enhWantEnd)
  }
  else {
    return dayjs(date).toDate()
  }
}

/**
 * '2020'    --> [2020, 0] \
 * '2020-H2' --> [2020, 2] \
 * '2020-Q3' --> [2020, 3] \
 * Invalid   --> [0, 0]
 */
export function translateDateAbbrStrToArray(type: EnhDateTypeClear, dateAbbrStr: string): DateArray {
  const { test, exec } = valiDateAbbrStr(type, dateAbbrStr)

  if (!test || !exec) {
    return [0, 0]
  }

  const year = Number(exec[1])
  const halfyear = Number(exec[2])
  const quarteryear = Number(exec[2])

  let dateArr: DateArray = [year, 0]

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
    /* istanbul ignore next -- defensive fallback for unexpected type */
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
export function translateArrayToDateAbbrStr(type: EnhDateTypeClear, dateArr: DateArray): string {
  // count: halfyear/quarteryear/0
  const [year, count] = dateArr

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
export function translateDateAbbrStrToDate(
  type: EnhDateTypeClear,
  dateAbbrStr: string,
  enhWantEnd: boolean = false,
  /** dateAbbrStr 日期缩写校验失败时返回的默认日期 */
  fallbackDate: Date = new Date(),
): Date {
  let dateObj: Date = fallbackDate

  const { test, exec } = valiDateAbbrStr(type, dateAbbrStr)
  if (!test || !exec) {
    return dateObj
  }

  const year = Number(exec[1])
  const halfyear = Number(exec[2])
  const quarteryear = Number(exec[2])

  switch (type) {
    case 'year':
      dateObj = new Date(
        dayjs(`${year}`)[enhWantEnd ? 'endOf' : 'startOf']('year')
          .toDate(),
      )
      break
    case 'halfyear':
      dateObj = new Date(
        dayjs(`${year}-${(halfyear - 1) * 6 + (enhWantEnd ? 6 : 1)}`)[enhWantEnd ? 'endOf' : 'startOf']('month')
          .toDate(),
      )
      break
    case 'quarteryear':
      dateObj = new Date(
        dayjs(`${year}-${(quarteryear - 1) * 3 + (enhWantEnd ? 3 : 1)}`)[enhWantEnd ? 'endOf' : 'startOf']('month')
          .toDate(),
      )
      break
    /* istanbul ignore next -- defensive fallback for unexpected type */
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
export function translateDateToDateAbbrStr(type: EnhDateTypeClear, date: Date): string {
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
    /* istanbul ignore next -- defensive fallback for unexpected type */
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
function translateArrayToDate(
  type: EnhDateTypeClear,
  dateArr: DateArray,
  enhWantEnd = false,
): Date {
  const dateAbbrStr = translateArrayToDateAbbrStr(type, dateArr)
  return translateDateAbbrStrToDate(type, dateAbbrStr, enhWantEnd)
}

/**
 * Date --> [2020, 0] \
 * Date --> [2020, 2] \
 * Date --> [2020, 3]
 */
function translateDateToArray(type: EnhDateTypeClear, date: Date): DateArray {
  const dateAbbrStr = translateDateToDateAbbrStr(type, date)
  return translateDateAbbrStrToArray(type, dateAbbrStr)
}
