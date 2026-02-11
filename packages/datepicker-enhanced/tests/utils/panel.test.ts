import { describe, expect, it } from 'vitest'
import {
  correctPanelDateArrays,
  generatePanelItems,
  getRightPanelMinYear,
} from '../../src/utils/panel'

const baseEnhInner = {
  innerFormat: 'YYYY-[Q]QY',
  innerPanelAmount: 2,
  innerDefaultValue: [],
} as const

const baseEnhProps = {
  enhWantEnd: false,
  disabledDate: () => false,
} as const

describe('utils/panel generatePanelItems', () => {
  it('marks current, start/end, range and disabled correctly for quarteryear', () => {
    const result = generatePanelItems({
      dateArrays: [[2024, 2], [2024, 4]],
      types: ['quarteryear'],
      years: [2024],
      enhProps: {
        ...baseEnhProps,
        disabledDate: (date: Date) => date.getMonth() < 6,
      } as any,
      enhInner: {
        ...baseEnhInner,
        innerType: 'quarteryear',
        innerIsRange: true,
        innerModelValue: [],
      } as any,
    })

    const items = result[0]
    expect(items).toHaveLength(4)
    expect(items[0].isDisabled).toBe(true)
    expect(items[1].isStartDate).toBe(true)
    expect(items[3].isEndDate).toBe(true)
    expect(items[2].isInRange).toBe(true)
  })

  it('marks isCurrent for single selection and respects innerType', () => {
    const result = generatePanelItems({
      dateArrays: [[2023, 1]],
      types: ['quarteryear', 'year'],
      years: [2023, 2020],
      enhProps: baseEnhProps as any,
      enhInner: {
        ...baseEnhInner,
        innerType: 'quarteryear',
        innerIsRange: false,
        innerModelValue: [],
      } as any,
    })

    expect(result[0][0].isCurrent).toBe(true)
    expect(result[1][0].isDisabled).toBe(false)
  })

  it('uses fallback year when missing and marks start/end for year type', () => {
    const currentYear = new Date().getFullYear()
    const result = generatePanelItems({
      dateArrays: [[currentYear, 0], [currentYear + 1, 0]],
      types: ['year'],
      years: [0],
      enhProps: baseEnhProps as any,
      enhInner: {
        ...baseEnhInner,
        innerType: 'year',
        innerIsRange: true,
        innerModelValue: [],
      } as any,
    })

    const start = result[0].find(item => item.year === currentYear)!
    const end = result[0].find(item => item.year === currentYear + 1)!
    expect(start.isStartDate).toBe(true)
    expect(end.isEndDate).toBe(true)
  })

  it('covers halfyear today marker and fields', () => {
    const today = new Date()
    const half = Math.ceil((today.getMonth() + 1) / 6)
    const result = generatePanelItems({
      dateArrays: [[today.getFullYear(), half]],
      types: ['halfyear'],
      years: [today.getFullYear()],
      enhProps: baseEnhProps as any,
      enhInner: {
        ...baseEnhInner,
        innerType: 'halfyear',
        innerIsRange: false,
        innerModelValue: [],
      } as any,
    })

    expect(result[0][half - 1].halfyear).toBe(half)
    expect(result[0][half - 1].isToday).toBe(true)
  })
})

describe('utils/panel correctPanelDateArrays', () => {
  it('returns defaults when invalid arrays and default provided', () => {
    const corrected = correctPanelDateArrays(
      {
        dateArrays: [[0, 0], [0, 0]],
        types: ['quarteryear', 'quarteryear'],
        enhProps: baseEnhProps as any,
        enhInner: { innerType: 'quarteryear', innerIsRange: true } as any,
      },
      { defaultArrays: [[2024, 1], [2024, 3]], strict: false },
    )

    expect(corrected).toEqual([[2024, 1], [2024, 3]])
  })

  it('sorts when requested and leaves right year if already >= min', () => {
    const corrected = correctPanelDateArrays(
      {
        dateArrays: [[2024, 4], [2023, 2]],
        types: ['quarteryear', 'quarteryear'],
        enhProps: baseEnhProps as any,
        enhInner: { innerType: 'quarteryear', innerIsRange: true } as any,
      },
      { sort: true, strict: true },
    )

    expect(corrected[0]).toEqual([2023, 2])
    expect(corrected[1][0]).toBe(2024)
  })

  it('returns raw arrays when default length mismatches', () => {
    const corrected = correctPanelDateArrays(
      {
        dateArrays: [[0, 0], [0, 0]],
        types: ['quarteryear', 'quarteryear'],
        enhProps: baseEnhProps as any,
        enhInner: { innerType: 'quarteryear', innerIsRange: true } as any,
      },
      { defaultArrays: [[2024, 1]] },
    )

    expect(corrected).toEqual([[0, 0], [0, 0]])
  })

  it('bumps right panel year up to minimum when strict', () => {
    const corrected = correctPanelDateArrays(
      {
        dateArrays: [[2025, 0], [2020, 0]],
        types: ['year', 'year'],
        enhProps: baseEnhProps as any,
        enhInner: { innerType: 'year', innerIsRange: true } as any,
      },
      { sort: false, strict: true },
    )

    expect(corrected[1][0]).toBe(2035)
  })
})

describe('utils/panel getRightPanelMinYear', () => {
  it('uses +1 for non-year types and +10 for year', () => {
    expect(getRightPanelMinYear({ dateArrays: [[2024, 1]], types: ['quarteryear', 'quarteryear'] })).toBe(2025)
    expect(getRightPanelMinYear({ dateArrays: [[2020, 0]], types: ['year', 'year'] })).toBe(2030)
  })
})
