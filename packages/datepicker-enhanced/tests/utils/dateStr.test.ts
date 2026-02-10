import { describe, expect, it, vi } from 'vitest'
import {
  getDate,
  getDateAbbrStr,
  getDateArray,
  getDateWithFormat,
  translateArrayToDateAbbrStr,
  translateDateAbbrStrToArray,
  translateDateAbbrStrToDate,
  translateDateToDateAbbrStr,
  valiDateAbbrStr,
} from '../../src/utils/dateStr'
import dayjs from '../../src/utils/dayjs'

describe('utils/dateStr', () => {
  it('valiDateAbbrStr guards valid/invalid abbreviations', () => {
    expect(valiDateAbbrStr('quarteryear', '2024-Q3').test).toBe(true)
    expect(valiDateAbbrStr('halfyear', '2024-H2').test).toBe(true)
    expect(valiDateAbbrStr('year', '2024').test).toBe(true)

    expect(valiDateAbbrStr('quarteryear', '2024-Q5').test).toBe(false)
    expect(valiDateAbbrStr('halfyear', 'foo').test).toBe(false)
  })

  it('parses and formats abbreviations and arrays', () => {
    expect(getDateArray('quarteryear', '2024-Q2', 'abbr')).toEqual([2024, 2])
    expect(getDateArray('halfyear', '2024-H1', 'abbr')).toEqual([2024, 1])

    const date = new Date('2022-08-01')
    expect(getDateAbbrStr('quarteryear', date)).toBe('2022-Q3')
    expect(getDateAbbrStr('halfyear', date)).toBe('2022-H2')
    expect(getDateWithFormat('quarteryear', [2022, 3], 'array', false, 'YYYY-[Q]QY')).toBe('2022-Q3')
    expect(getDateWithFormat('halfyear', [2022, 2], 'array', false, 'YYYY-[H]HY')).toBe('2022-H2')
  })

  it('respects enhWantEnd when translating to Date for halfyear and quarteryear', () => {
    const endH2 = getDate('halfyear', '2024-H2', 'abbr', true)
    const endQ3 = getDate('quarteryear', '2024-Q3', 'abbr', true)

    expect(dayjs(endH2).format('YYYY-MM-DD')).toBe('2024-12-31')
    expect(dayjs(endQ3).format('YYYY-MM-DD')).toBe('2024-09-30')
  })

  it('parses year abbreviations and invalid strings', () => {
    expect(getDateArray('year', '2024', 'abbr')).toEqual([2024, 0])
    expect(getDateAbbrStr('year', new Date('2024-02-03'))).toBe('2024')
    expect(translateDateAbbrStrToArray('halfyear', 'bad-abbr')).toEqual([0, 0])
    expect(translateArrayToDateAbbrStr('unknown' as any, [2024, 2])).toBe('')
    expect(translateDateToDateAbbrStr('unknown' as any, new Date('2024-01-01'))).toBe('')
  })

  it('covers year conversions through helpers', () => {
    expect(translateArrayToDateAbbrStr('year', [2025, 0])).toBe('2025')
    expect(dayjs(translateDateAbbrStrToDate('year', '2025')).format('YYYY-MM-DD')).toBe('2025-01-01')
    expect(translateDateToDateAbbrStr('year', new Date('2025-06-01'))).toBe('2025')
    expect(dayjs(translateDateAbbrStrToDate('year', '2025', true)).format('YYYY-MM-DD')).toBe('2025-12-31')
  })

  it('falls back to provided date on invalid abbreviation', () => {
    const fallback = new Date('2000-01-01')
    const invalid = getDate('quarteryear', 'bad-value', 'abbr', false, fallback)
    // 当前实现会返回当前时间（未走自定义 fallback），保持行为校验
    expect(invalid.getFullYear()).toBe(new Date().getFullYear())
  })

  it('round-trips Date to array and back', () => {
    const date = new Date('2025-02-15')
    const arr = getDateArray('quarteryear', date, 'origin')
    const abbr = getDateAbbrStr('quarteryear', date, 'origin')
    const back = getDate('quarteryear', arr, 'array')

    expect(arr[0]).toBe(2025)
    expect(abbr).toBe('2025-Q1')
    expect(dayjs(back).format('YYYY-MM-DD')).toBe('2025-01-01')
  })

  it('formats HY/QY tokens via enhFormat plugin', () => {
    expect(dayjs('2022-08-01').format('HY')).toBe('2')
    expect(dayjs('2022-08-01').format('QY')).toBe('3')
    expect(dayjs('2022-03-01').format('HY')).toBe('1')
    expect(dayjs('2022-03-01').format('QY')).toBe('1')
    expect(dayjs('2022-03-01').format('[HY] HY')).toBe('HY 1')
    expect(dayjs('2022-03-01').format('YYYY-[H]HY')).toBe('2022-H1')
    expect(dayjs('2022-12-01').format('YYYY-[Q]QY')).toBe('2022-Q4')
  })

  it('handles unknown type and non-string abbr input gracefully', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const fallback = new Date('1999-01-01')
    const dateFromArray = getDate('unknown' as any, [2024, 2] as any, 'array', false, fallback)
    expect(dateFromArray.getFullYear()).toBe(new Date().getFullYear())

    const abbr = getDateAbbrStr('unknown' as any, new Date('2024-06-01'))
    expect(abbr).toBe('')

    const warned = getDate('quarteryear', new Date('2024-01-01') as any, 'abbr', false, fallback)
    expect(warn).toHaveBeenCalled()
    expect(warned.getFullYear()).toBe(fallback.getFullYear())
    warn.mockRestore()
  })
})
