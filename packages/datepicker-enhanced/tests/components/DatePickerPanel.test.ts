import type { EnhDatePickerPanelItem } from '../../src/types'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { defineComponent, nextTick, provide, ref } from 'vue'
import DatePickerPanel from '../../src/components/DatePickerPanel.vue'
import { enhPropsInjectionKey } from '../../src/utils/constant'

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
        provide(enhPropsInjectionKey, {
          type: 'quarteryear',
          modelValue: [],
          cellClassName: () => 'decorated',
        })
        return {
          items: [baseItem, activeItem],
          clicked,
          handleClick(_item: EnhDatePickerPanelItem) {
            clicked.value = 'true'
          },
        }
      },
      template: `
        <div>
          <DatePickerPanel title="Test" :items="items" @click-item="handleClick" />
          <span data-testid="clicked">{{ clicked }}</span>
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
  })
})
