import { DatePickerEnhanced } from 'datepicker-enhanced'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'

it('renders single input with placeholder and value', async () => {
  const { getByRole } = render(DatePickerEnhanced, {
    props: {
      type: 'quarteryear',
      modelValue: new Date('2024-04-01'),
      placeholder: '请选择',
      teleported: false,
    },
  })

  const input = getByRole('combobox')

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

  const input = getByRole('combobox')

  await expect.element(input).toBeDisabled()
  expect(container.querySelector('.is-disabled')).toBeTruthy()
})
