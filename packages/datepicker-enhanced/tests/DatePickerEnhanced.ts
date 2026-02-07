import type { EnhDatePrimitive } from 'datepicker-enhanced'
import { DatePickerEnhanced } from 'datepicker-enhanced'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, ref } from 'vue'

type SingleValue = EnhDatePrimitive
type RangeValue = EnhDatePrimitive[]

interface SingleWrapperOptions {
  allowSame?: boolean
  wantEnd?: boolean
  disabledDate?: (date: Date) => boolean
}

interface RangeWrapperOptions {
  allowSame?: boolean
  disabledDate?: (date: Date) => boolean
}

function findCellByText(container: Element, text: string): HTMLElement | undefined {
  const cells = container.querySelectorAll('.el-month-table .cell')
  return Array.from(cells).find(cell => cell.textContent?.trim() === text) as HTMLElement | undefined
}

function createSingleWrapper(options?: SingleWrapperOptions): ReturnType<typeof defineComponent> {
  return defineComponent({
    setup() {
      const value = ref<SingleValue>(new Date('2024-01-01'))
      const onUpdate = (val: EnhDatePrimitive | EnhDatePrimitive[]): void => {
        value.value = Array.isArray(val) ? val[0] : val
      }

      return () => {
        const props = {
          'type': 'quarteryear',
          'modelValue': value.value,
          'teleported': false,
          'onUpdate:modelValue': onUpdate,
        } as const

        if (typeof options?.allowSame === 'boolean') {
          Object.assign(props, { enhAllowSame: options.allowSame })
        }
        if (typeof options?.wantEnd === 'boolean') {
          Object.assign(props, { enhWantEnd: options.wantEnd })
        }
        if (options?.disabledDate) {
          Object.assign(props, { disabledDate: options.disabledDate })
        }

        return h(DatePickerEnhanced, props)
      }
    },
  })
}

function createRangeWrapper(options?: RangeWrapperOptions): ReturnType<typeof defineComponent> {
  return defineComponent({
    setup() {
      const value = ref<RangeValue>([new Date('2023-01-01'), new Date('2023-10-01')])
      const onUpdate = (val: EnhDatePrimitive | EnhDatePrimitive[]): void => {
        value.value = Array.isArray(val) ? val : [val]
      }

      return () => {
        const props = {
          'type': 'quarteryearrange',
          'modelValue': value.value,
          'teleported': false,
          'onUpdate:modelValue': onUpdate,
        } as const

        if (typeof options?.allowSame === 'boolean') {
          Object.assign(props, { enhAllowSame: options.allowSame })
        }
        if (options?.disabledDate) {
          Object.assign(props, { disabledDate: options.disabledDate })
        }

        return h(DatePickerEnhanced, props)
      }
    },
  })
}

it('renders single input with placeholder and value', async () => {
  const { getByRole } = render(DatePickerEnhanced, {
    props: {
      type: 'quarteryear',
      modelValue: new Date('2024-04-01'),
      placeholder: '请选择',
      teleported: false,
    },
  })

  const input = getByRole('textbox')

  await expect.element(input).toHaveAttribute('placeholder', '请选择')
  await expect.element(input).toHaveValue('2024-Q2')
})

it('renders range inputs with placeholders and separator', () => {
  const { container } = render(DatePickerEnhanced, {
    props: {
      type: 'quarteryearrange',
      modelValue: [new Date('2023-01-01'), new Date('2023-10-01')],
      startPlaceholder: '开始',
      endPlaceholder: '结束',
      rangeSeparator: '~',
      teleported: false,
    },
  })

  const inputs = container.querySelectorAll('input.el-range-input')

  expect(inputs).toHaveLength(2)
  expect(inputs[0].getAttribute('placeholder')).toBe('开始')
  expect(inputs[1].getAttribute('placeholder')).toBe('结束')
  expect((inputs[0] as HTMLInputElement).value).toBe('2023-Q1')
  expect((inputs[1] as HTMLInputElement).value).toBe('2023-Q4')
  expect(container.querySelector('.el-range-separator')?.textContent).toBe('~')
})

it('applies disabled state to input wrapper', async () => {
  const { container, getByRole } = render(DatePickerEnhanced, {
    props: {
      type: 'quarteryear',
      modelValue: new Date('2025-07-01'),
      disabled: true,
      teleported: false,
    },
  })

  const input = getByRole('textbox')

  await expect.element(input).toHaveAttribute('readonly')
  expect(container.querySelector('.is-disabled')).toBeTruthy()
})

it('opens popover and renders panel title', async () => {
  const { container, getByRole } = render(createSingleWrapper())

  const input = getByRole('textbox')

  await input.click()

  const panel = container.querySelector<HTMLElement>('.el-picker-panel')
  const title = container.querySelector('.el-date-picker__header-label')

  await expect.element(panel!).toBeVisible()
  expect(title?.textContent).toContain('2024')
})

it('selecting a quarter updates input and closes popover', async () => {
  const { container, getByRole } = render(createSingleWrapper())

  const input = getByRole('textbox')

  await input.click()

  const panel = container.querySelector<HTMLElement>('.el-picker-panel')
  await expect.element(panel!).toBeVisible()

  const q4 = findCellByText(container, 'Q4')
  expect(q4).toBeTruthy()

  await q4!.click()
  await nextTick()

  await expect.element(input).toHaveValue('2024-Q4')
  await expect.element(panel!).not.toBeVisible()
})

it('range selection updates both inputs and closes popover', async () => {
  const { container } = render(createRangeWrapper())

  const inputs = container.querySelectorAll('input.el-range-input')
  expect(inputs).toHaveLength(2)

  await (inputs[0] as HTMLInputElement).click()

  const leftPanel = container.querySelector<HTMLElement>('.el-date-range-picker__content.is-left')
  const rightPanel = container.querySelector<HTMLElement>('.el-date-range-picker__content.is-right')
  const panel = container.querySelector<HTMLElement>('.el-picker-panel')

  await expect.element(leftPanel!).toBeVisible()
  await expect.element(rightPanel!).toBeVisible()

  const leftQ2 = findCellByText(leftPanel!, 'Q2')
  const rightQ3 = findCellByText(rightPanel!, 'Q3')

  expect(leftQ2).toBeTruthy()
  expect(rightQ3).toBeTruthy()

  await leftQ2!.click()
  await rightQ3!.click()
  await nextTick()

  expect((inputs[0] as HTMLInputElement).value).toBe('2023-Q2')
  expect((inputs[1] as HTMLInputElement).value).toBe('2024-Q3')
  await expect.element(panel!).not.toBeVisible()
})

it('disabledDate prevents selecting disabled quarter', async () => {
  const disabledDate = (date: Date): boolean => date.getMonth() <= 5
  const { container, getByRole } = render(createSingleWrapper({ disabledDate }))

  const input = getByRole('textbox')

  await input.click()

  const q2 = findCellByText(container, 'Q2')
  const q4 = findCellByText(container, 'Q4')

  expect(q2).toBeTruthy()
  expect(q4).toBeTruthy()

  expect(q2!.closest('td')?.classList.contains('disabled')).toBeTruthy()

  await q2!.click()
  await nextTick()
  await expect.element(input).toHaveValue('2024-Q1')

  await q4!.click()
  await nextTick()
  await expect.element(input).toHaveValue('2024-Q4')
})

it('enhAllowSame=false keeps popover open when selecting same range', async () => {
  const { container } = render(createRangeWrapper({ allowSame: false }))

  const inputs = container.querySelectorAll('input.el-range-input')
  await (inputs[0] as HTMLInputElement).click()

  const leftPanel = container.querySelector<HTMLElement>('.el-date-range-picker__content.is-left')
  const rightPanel = container.querySelector<HTMLElement>('.el-date-range-picker__content.is-right')

  await expect.element(leftPanel!).toBeVisible()
  await expect.element(rightPanel!).toBeVisible()

  const leftQ2 = findCellByText(leftPanel!, 'Q2')
  const rightQ2 = findCellByText(rightPanel!, 'Q2')

  await leftQ2!.click()
  await rightQ2!.click()
  await nextTick()

  expect(container.querySelector('.el-picker-panel')).toBeTruthy()
})
