import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, onMounted, ref } from 'vue'

import DatePickerEnhanced from '../../src/DatePickerEnhanced.vue'

const mockExposed = {
  focus: vi.fn(),
  blur: vi.fn(),
  handleOpen: vi.fn(),
  handleClose: vi.fn(),
}

vi.mock('../../src/components/DatePickerQuarterHalfYear.vue', () => ({
  default: defineComponent({
    name: 'StubQuarterHalf',
    setup() {
      return () => h('div', { 'data-testid': 'stub-quarter' })
    },
  }),
}))

vi.mock('element-plus', async () => {
  const vue = await import('vue')
  const actual = await vi.importActual<any>('element-plus')
  const CommonPicker = vue.defineComponent({
    name: 'MockCommonPicker',
    emits: [
      'update:model-value',
      'change',
      'blur',
      'focus',
      'clear',
      'calendar-change',
      'panel-change',
      'visible-change',
    ],
    setup(_, { emit, slots, expose }) {
      expose(mockExposed)
      return () => vue.h('div', { 'data-testid': 'mock-common' }, [
        vue.h('button', { 'data-testid': 'emit-panel', 'onClick': () => emit('panel-change', 'panel', 1) }),
        vue.h('button', { 'data-testid': 'emit-focus', 'onClick': () => emit('focus', 'focused') }),
        vue.h('button', { 'data-testid': 'emit-visible', 'onClick': () => emit('visible-change', true) }),
        vue.h('button', { 'data-testid': 'emit-update', 'onClick': () => emit('update:model-value', '2000-01-01') }),
        vue.h('button', { 'data-testid': 'emit-change', 'onClick': () => emit('change', 'changed') }),
        vue.h('button', { 'data-testid': 'emit-blur', 'onClick': () => emit('blur', 'blurred') }),
        vue.h('button', { 'data-testid': 'emit-clear', 'onClick': () => emit('clear') }),
        vue.h('button', { 'data-testid': 'emit-calendar', 'onClick': () => emit('calendar-change', ['c']) }),
        slots.default?.({}),
      ])
    },
  })

  return {
    ...actual,
    CommonPicker,
    PICKER_POPPER_OPTIONS_INJECTION_KEY: actual.PICKER_POPPER_OPTIONS_INJECTION_KEY,
  }
})

describe('datePickerEnhanced expose and events', () => {
  it('calls exposed methods and forwards picker events', async () => {
    const panelChange = vi.fn()
    const focus = vi.fn()
    const visibleChange = vi.fn()
    const updateModelValue = vi.fn()
    const change = vi.fn()
    const blur = vi.fn()
    const clear = vi.fn()
    const calendarChange = vi.fn()
    let exposedApi: any

    const Host = defineComponent({
      components: { DatePickerEnhanced },
      setup() {
        const pickerRef = ref()
        onMounted(() => {
          exposedApi = pickerRef.value as any
        })
        return {
          pickerRef,
          panelChange,
          focus,
          visibleChange,
          updateModelValue,
          change,
          blur,
          clear,
          calendarChange,
        }
      },
      template: `
        <DatePickerEnhanced
          ref="pickerRef"
          type="quarteryear"
          :model-value="new Date()"
          :enhWantEnd="true"
          valueFormat="YYYY-MM-DD"
          :teleported="false"
          @panel-change="panelChange"
          @focus="focus"
          @visible-change="visibleChange"
          @update:model-value="updateModelValue"
          @change="change"
          @blur="blur"
          @clear="clear"
          @calendar-change="calendarChange"
        />
      `,
    })

    const { container } = render(Host)
    await nextTick()
    expect(exposedApi).toBeTruthy()

    exposedApi.focus()
    exposedApi.blur()
    exposedApi.handleOpen()
    exposedApi.handleClose()

    expect(mockExposed.focus).toHaveBeenCalled()
    expect(mockExposed.blur).toHaveBeenCalled()
    expect(mockExposed.handleOpen).toHaveBeenCalled()
    expect(mockExposed.handleClose).toHaveBeenCalled()

    container.querySelector('[data-testid="emit-panel"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    container.querySelector('[data-testid="emit-focus"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    container.querySelector('[data-testid="emit-visible"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    container.querySelector('[data-testid="emit-update"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    container.querySelector('[data-testid="emit-change"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    container.querySelector('[data-testid="emit-blur"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    container.querySelector('[data-testid="emit-clear"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    container.querySelector('[data-testid="emit-calendar"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(panelChange).toHaveBeenCalledWith('panel', 1)
    expect(focus).toHaveBeenCalledWith('focused')
    expect(visibleChange).toHaveBeenCalledWith(true)
    expect(updateModelValue).toHaveBeenCalledWith('2000-03-31')
    expect(change).toHaveBeenCalledWith('changed')
    expect(blur).toHaveBeenCalledWith('blurred')
    expect(clear).toHaveBeenCalled()
    expect(calendarChange).toHaveBeenCalledWith(['c'])
  })
})
