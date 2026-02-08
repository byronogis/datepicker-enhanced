import { expect, it } from 'vitest'
import { getDate, getDateAbbrStr, getDateArray, getDateWithFormat, valiDateAbbrStr } from '../src/utils/dateStr'
import dayjs from '../src/utils/dayjs'
import generateItems from '../src/utils/generateItems'

it('dateStr validates and parses abbreviations', () => {
  expect(valiDateAbbrStr('quarteryear', '2024-Q3').test).toBe(true)
  expect(valiDateAbbrStr('halfyear', '2024-H2').test).toBe(true)
  expect(valiDateAbbrStr('year', '2024').test).toBe(true)
  expect(valiDateAbbrStr('quarteryear', '2024-Q5').test).toBe(false)

  expect(getDateArray('quarteryear', '2024-Q2', 'abbr')).toEqual([2024, 2])
  expect(getDateArray('halfyear', '2024-H1', 'abbr')).toEqual([2024, 1])
})

it('dateStr formats with quarter/half year', () => {
  const date = new Date('2022-08-01')
  expect(getDateAbbrStr('quarteryear', date)).toBe('2022-Q3')
  expect(getDateAbbrStr('halfyear', date)).toBe('2022-H2')

  expect(getDate('quarteryear', [2022, 3], 'array').getMonth()).toBe(6)
  expect(getDateWithFormat('quarteryear', [2022, 3], 'array', false, 'YYYY-[Q]QY')).toBe('2022-Q3')
  expect(getDateWithFormat('halfyear', [2022, 2], 'array', false, 'YYYY-[H]HY')).toBe('2022-H2')
})

it('enhFormat plugin formats HY/QY tokens', () => {
  expect(dayjs('2022-08-01').format('HY')).toBe('2')
  expect(dayjs('2022-08-01').format('QY')).toBe('3')
  expect(dayjs('2022-03-01').format('HY')).toBe('1')
  expect(dayjs('2022-03-01').format('QY')).toBe('1')
  expect(dayjs('2022-03-01').format('[HY] HY')).toBe('HY 1')
})

it('generateItems marks disabled and range flags', () => {
  const items = generateItems(
    'quarteryear',
    [2024, 1],
    2020,
    [[2024, 2], [2024, 4]],
    (date: Date) => date.getMonth() < 6,
    false,
  )

  expect(items).toHaveLength(4)
  expect(items[0].isDisabled).toBe(true)
  expect(items[1].isStartDate).toBe(true)
  expect(items[3].isEndDate).toBe(true)
  expect(items[2].isInRange).toBe(true)
})
