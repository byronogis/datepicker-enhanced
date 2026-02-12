import type { EnhDatePickerPanelItem } from '../../src/types'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { defineComponent, nextTick, provide, ref } from 'vue'
import DatePickerPanel from '../../src/components/DatePickerPanel.vue'
import { enhPropsInjectionKey, enhSlotsInjectionKey } from '../../src/utils/constant'

const baseItem: EnhDatePickerPanelItem = {
  date: new Date('2024-01-01'),
  dateArrays: [2024, 1],
  type: 'quarteryear',
  label: 'Q1',
  year: 2024,
  halfyear: null,
  quarteryear: 1,
  isDisabled: false,
  isToday: false,
  isCurrent: false,
  isStartDate: null,
  isEndDate: null,
  isInRange: false,
}

describe('datePickerPanel', () => {
  it('renders items with custom class and ignores empty slots', async () => {
    const handleClickSpy = vi.fn()
    const activeItem: EnhDatePickerPanelItem = {
      ...baseItem,
      label: 'Q2',
      isToday: true,
      isCurrent: true,
      isDisabled: true,
      isStartDate: true,
      isEndDate: true,
      isInRange: true,
    }
    const Host = defineComponent({
      components: { DatePickerPanel },
      setup() {
        const clicked = ref('false')
        const hovered = ref('none')
        provide(enhPropsInjectionKey, {
          type: 'quarteryear',
          modelValue: [],
          cellClassName: () => 'decorated',
        })
        provide(enhSlotsInjectionKey, { })
        return {
          items: [baseItem, activeItem],
          clicked,
          hovered,
          handleClick(_item: EnhDatePickerPanelItem) {
            clicked.value = 'true'
            handleClickSpy()
          },
          handleHover(item: EnhDatePickerPanelItem | null) {
            hovered.value = item?.label ?? 'none'
          },
        }
      },
      template: `
        <div>
          <DatePickerPanel title="Test" :items="items" @click-item="handleClick" @hover-item="handleHover" />
          <span data-testid="clicked">{{ clicked }}</span>
          <span data-testid="hovered">{{ hovered }}</span>
        </div>
      `,
    })

    const { container } = render(Host)
    const cells = container.querySelectorAll('td')
    expect(cells.length).toBe(2)
    expect(cells[0]?.classList.contains('decorated')).toBe(true)
    expect(cells[1]?.classList.contains('decorated')).toBe(true)
    expect(cells[1]?.classList.contains('today')).toBe(true)
    expect(cells[1]?.classList.contains('current')).toBe(true)
    expect(cells[1]?.classList.contains('disabled')).toBe(true)
    expect(cells[1]?.classList.contains('start-date')).toBe(true)
    expect(cells[1]?.classList.contains('end-date')).toBe(true)
    expect(cells[1]?.classList.contains('in-range')).toBe(true)

    cells[0]?.querySelector('.cell')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
    expect(container.querySelector('[data-testid="clicked"]')?.textContent).toBe('true')

    cells[1]?.querySelector('.cell')?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
    await nextTick()
    expect(container.querySelector('[data-testid="hovered"]')?.textContent).toBe('Q2')

    cells[1]?.querySelector('.cell')?.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }))
    await nextTick()
    expect(container.querySelector('[data-testid="hovered"]')?.textContent).toBe('none')

    const clickCount = handleClickSpy.mock.calls.length

    container.querySelector('table')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(handleClickSpy.mock.calls.length).toBe(clickCount)

    const firstTd = container.querySelector('td')
    if (firstTd) {
      firstTd.dataset.index = 'NaN'
      firstTd.querySelector('.cell')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    }

    expect(handleClickSpy.mock.calls.length).toBe(clickCount)
  })
})
