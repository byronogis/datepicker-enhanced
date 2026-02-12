import { ROOT_COMMON_PICKER_INJECTION_KEY } from 'element-plus'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { defineComponent, provide, ref } from 'vue'
import DatePickerQuarterHalfYear from '../../src/components/DatePickerQuarterHalfYear.vue'
import { enhInnerInjectionKey, enhPropsInjectionKey } from '../../src/utils/constant'
import dayjs from '../../src/utils/dayjs'

describe('datePickerQuarterHalfYear', () => {
  function mountWithProviders(innerIsRange: boolean, extraProps?: Record<string, any>) {
    const onCalendarChange = vi.fn()
    const onPanelChange = vi.fn()
    const onPick = vi.fn()
    const onSetPickerOption = vi.fn()

    const TestHost = defineComponent({
      setup() {
        const parsedValue = ref(
          innerIsRange
            ? [dayjs('2024-01-01'), dayjs('2024-10-01')]
            : dayjs('2024-04-01'),
        )

        provide(ROOT_COMMON_PICKER_INJECTION_KEY, {
          parsedValue,
          onCalendarChange,
          onPanelChange,
          onPick,
          onSetPickerOption,
        } as any)

        provide(enhPropsInjectionKey, {
          enhAllowSame: true,
          enhWantEnd: false,
          disabledDate: () => false,
          ...(extraProps ?? {}),
        } as any)

        provide(enhInnerInjectionKey, ref({
          innerType: 'quarteryear',
          innerFormat: 'YYYY-[Q]QY',
          innerIsRange,
          innerPanelAmount: innerIsRange ? 2 : 1,
          innerModelValue: [],
          innerDefaultValue: innerIsRange
            ? [new Date('2024-01-01'), new Date('2024-10-01')]
            : [new Date('2024-04-01')],
          innerEnhWantEnd: innerIsRange ? [false, false] : [false],
        }))

        return {}
      },
      components: { DatePickerQuarterHalfYear },
      template: '<DatePickerQuarterHalfYear />',
    })

    const utils = render(TestHost)
    return { ...utils, onCalendarChange, onPanelChange, onPick, onSetPickerOption }
  }

  it('renders range panels and triggers panel change and pick', async () => {
    const { container, onPanelChange, onPick, onCalendarChange } = mountWithProviders(true)

    expect(onPanelChange).toHaveBeenCalledTimes(0)

    const prevButtons = container.querySelectorAll('[aria-label="上一年"]')
    const nextButtons = container.querySelectorAll('[aria-label="下一年"]')

    prevButtons[0]?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(onPanelChange).toHaveBeenCalledTimes(1)
    prevButtons[1]?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(onPanelChange).toHaveBeenCalledTimes(2)

    nextButtons[1]?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(onPanelChange).toHaveBeenCalledTimes(3)
    nextButtons[0]?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(onPanelChange).toHaveBeenCalledTimes(4)

    const titles = container.querySelectorAll('.el-date-picker__header-label')
    titles[0]?.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    const cells = container.querySelectorAll('.cell')
    cells[1]?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(onCalendarChange).toHaveBeenCalledTimes(1)

    cells[2]?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
    cells[cells.length - 1]?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))

    cells[2]?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(onCalendarChange).toHaveBeenCalledTimes(2)

    expect(onPick).toHaveBeenCalledTimes(1)
    const pickArgs = onPick.mock.calls[0][0] as any[]
    expect(pickArgs).toHaveLength(2)
  })

  it('renders single panel and picks once', async () => {
    const { container, onPick } = mountWithProviders(false)
    const cells = container.querySelectorAll('.cell')
    cells[0]?.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(onPick).toHaveBeenCalledTimes(1)
  })

  it('disables cross arrows in range mode and handles header clicks', () => {
    const { container, onPanelChange } = mountWithProviders(true)

    const nextButtons = container.querySelectorAll('[aria-label="下一年"]')
    const prevButtons = container.querySelectorAll('[aria-label="上一年"]')
    expect((nextButtons[0] as HTMLButtonElement).disabled).toBe(true)
    expect((prevButtons[1] as HTMLButtonElement).disabled).toBe(true)

    prevButtons[1]?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    nextButtons[0]?.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    const { container: singleContainer, onPanelChange: singlePanelChange } = mountWithProviders(false)
    singleContainer.querySelector('.el-date-picker__header-label')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    singleContainer.querySelector('[aria-label="下一年"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    singleContainer.querySelector('[aria-label="上一年"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(onPanelChange).not.toHaveBeenCalled()
    expect(singlePanelChange).toHaveBeenCalledTimes(2)
  })

  it('applies custom cell class names from enhProps', () => {
    const { container } = mountWithProviders(false, {
      cellClassName: () => 'custom-cell',
    })

    const firstCell = container.querySelector('td')
    expect(firstCell?.classList.contains('custom-cell')).toBe(true)
  })

  it('registers picker option handlers for parse, validate, and clear', async () => {
    const { onSetPickerOption, onPick } = mountWithProviders(false)

    const parseUserInput = onSetPickerOption.mock.calls.find(call => call[0][0] === 'parseUserInput')![0][1]
    const isValidValue = onSetPickerOption.mock.calls.find(call => call[0][0] === 'isValidValue')![0][1]
    const handleClear = onSetPickerOption.mock.calls.find(call => call[0][0] === 'handleClear')![0][1]

    // array input uses recursive parse
    const parsed = parseUserInput(['2024-Q1', '2024-Q2'])
    expect(Array.isArray(parsed)).toBe(true)

    // invalid abbreviation falls back to dayjs parsing but stays valid
    const invalid = parseUserInput('not-an-abbr')
    expect(invalid.isValid()).toBe(false)

    // validation fails when any item is invalid
    expect(isValidValue([invalid, dayjs('invalid') as any])).toBe(false)

    handleClear()
    expect(onPick).toHaveBeenCalledWith(null)
  })
})
