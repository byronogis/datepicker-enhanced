import { ROOT_COMMON_PICKER_INJECTION_KEY } from 'element-plus'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { defineComponent, nextTick, provide, ref } from 'vue'
import { useDatePickerEnhanced } from '../../src/composables/useDatePickerEnhanced'
import { enhInnerInjectionKey, enhPropsInjectionKey } from '../../src/utils/constant'
import dayjs from '../../src/utils/dayjs'

describe('useDatePickerEnhanced', () => {
  function mountComposable(options?: { range?: boolean, allowSame?: boolean, parsedValue?: any }) {
    const pickerVisible = ref(true)
    const onCalendarChange = vi.fn()
    const onPanelChange = vi.fn()
    const onPick = vi.fn()
    const range = options?.range ?? true
    const allowSame = options?.allowSame ?? true
    const parsed = options?.parsedValue ?? (
      range
        ? [dayjs('2024-01-01'), dayjs('2024-10-01')] // index: 0, 3
        : dayjs('2024-04-01') // index: 1
    )
    let exposedState: ReturnType<typeof useDatePickerEnhanced>

    const Child = defineComponent({
      setup() {
        const state = useDatePickerEnhanced()
        exposedState = state
        return {}
      },
      template: '<div />',
    })

    const Host = defineComponent({
      setup() {
        provide(ROOT_COMMON_PICKER_INJECTION_KEY, {
          pickerVisible,
          parsedValue: ref(parsed),
          onCalendarChange,
          onPanelChange,
          onPick,
          onSetPickerOption: vi.fn(),
        } as any)

        provide(enhPropsInjectionKey, {
          enhAllowSame: allowSame,
          enhWantEnd: false,
          // 禁用第二季度 （index 1）
          disabledDate: (date: Date) => date.getMonth() < 6 && date.getMonth() >= 3,
        } as any)

        provide(enhInnerInjectionKey, ref({
          innerType: 'quarteryear',
          innerFormat: 'YYYY-[Q]QY',
          innerIsRange: range,
          innerPanelAmount: range ? 2 : 1,
          innerModelValue: [],
          innerDefaultValue: range
            ? [new Date('2024-01-01'), new Date('2024-10-01')]
            : [new Date('2024-04-01')],
          innerEnhWantEnd: range ? [false, false] : [false],
        }))

        return {}
      },
      components: { Child },
      template: '<Child />',
    })

    render(Host)
    return { exposedState: () => exposedState!, onCalendarChange, onPanelChange, onPick, pickerVisible }
  }

  it('generates panel items and handles prev/next/title', async () => {
    const { exposedState, onPanelChange } = mountComposable()
    await nextTick()
    const state = exposedState()

    expect(state.panelItems.value[0]).toHaveLength(4)
    expect(state.panelTitles.value[0]).toBe('2024')
    expect(state.isArrowDisabledForRange.value).toBe(true)

    state.panelPrevClick(0)
    state.panelNextClick(0)
    expect(onPanelChange).toHaveBeenCalled()

    state.panelTitleClick(0)
    state.panelTitleClick(0)
    state.panelPrevClick(0)
    expect(state.panelTitles.value[0]).toMatch(/\d{4} - \d{4}/)

    // force empty year to trigger fallback title formatting
    state.panelDateArrays.value = [[0, 0], [0, 0]] as any
    expect(state.panelTitles.value[0]).toMatch(/\d{4}/)
  })

  it('picks range values and triggers calendar change and pick', async () => {
    const { exposedState, onCalendarChange, onPick } = mountComposable({ range: true, allowSame: true })
    await nextTick()
    const state = exposedState()

    const item = state.panelItems.value[0][0]
    const item2 = state.panelItems.value[0][2]
    state.panelItemClick(0, item)
    state.panelItemClick(0, item2)
    await nextTick()

    expect(onCalendarChange).toHaveBeenCalledTimes(2)
    expect(onPick).toHaveBeenCalledTimes(1)
  })

  it('blocks duplicate pick when enhAllowSame=false', async () => {
    const { exposedState, onPick } = mountComposable({ range: true, allowSame: false })
    await nextTick()
    const state = exposedState()

    const item = state.panelItems.value[0][0]
    state.panelItemClick(0, item)
    state.panelItemClick(0, item)
    await nextTick()

    expect(onPick).not.toHaveBeenCalled()
  })

  it('single mode picks once', async () => {
    const { exposedState, onPick } = mountComposable({ range: false })
    await nextTick()
    const state = exposedState()

    const item = state.panelItems.value[0][0]
    state.panelItemClick(0, item)
    await nextTick()

    expect(onPick).toHaveBeenCalledTimes(1)
  })

  it('returns arrow disabled false for single mode and exits early when selecting from year view', async () => {
    const { exposedState, onPick } = mountComposable({ range: false })
    await nextTick()
    const state = exposedState()

    expect(state.isArrowDisabledForRange.value).toBe(false)

    // switch to year panel then click an item to trigger early return branch
    state.panelTitleClick(0)
    await nextTick()
    const yearItem = state.panelItems.value[0][0]
    state.panelItemClick(0, yearItem)
    await nextTick()

    expect(onPick).not.toHaveBeenCalled()
    expect(state.panelTitles.value[0]).toBe(`${yearItem.year}`)
  })

  it('uses default arrays when parsed value is missing and reuses pre-update arrays', async () => {
    const { exposedState } = mountComposable({ range: true, parsedValue: [dayjs('2024-01-01')] })
    await nextTick()
    const state = exposedState()

    expect(state.panelItems.value[1][0].dateArrays[0]).toBeGreaterThan(0)

    const pickOne = state.panelItems.value[0][0]
    state.panelItemClick(0, pickOne)
    await nextTick()

    expect(state.panelItems.value[0][0].dateArrays).toEqual(pickOne.dateArrays)
  })

  it('previews hovered end date and swaps when hover is earlier', async () => {
    const { exposedState } = mountComposable({ range: true })
    await nextTick()
    const state = exposedState()

    const first = state.panelItems.value[1][2]
    const earlier = state.panelItems.value[1][0]
    const later = state.panelItems.value[1][3]

    state.panelItemHover(1, earlier)
    await nextTick()
    expect(state.panelItems.value[1][0].isStartDate).toBe(false)

    state.panelItemClick(1, first)
    await nextTick()

    state.panelItemHover(1, later)
    await nextTick()
    expect(state.panelItems.value[1][2].isInRange).toBe(true)
    expect(state.panelItems.value[1][3].isEndDate).toBe(true)

    state.panelItemHover(1, earlier)
    await nextTick()
    expect(state.panelItems.value[1][0].isStartDate).toBe(true)
    expect(state.panelItems.value[1][2].isEndDate).toBe(true)

    state.panelItemHover(1, null)
    await nextTick()
    expect(state.panelItems.value[1][0].isStartDate).toBe(true)
    expect(state.panelItems.value[1][2].isEndDate).toBe(true)
  })

  it('clears preUpdate and hover when picker closes', async () => {
    const { exposedState, pickerVisible } = mountComposable({ range: true })
    await nextTick()
    const state = exposedState()

    const first = state.panelItems.value[1][0]
    const later = state.panelItems.value[1][2]
    state.panelItemClick(0, first)
    state.panelItemHover(0, later)
    await nextTick()

    expect(state.panelItems.value[1][0].isStartDate).toBe(true)
    expect(state.panelItems.value[1][2].isEndDate).toBe(true)

    pickerVisible.value = false
    await nextTick()

    expect(state.panelItems.value[1][0].isStartDate).toBe(false)
    expect(state.panelItems.value[1][2].isEndDate).toBe(false)
  })

  it('blocks clicks and hovers on disabled items', async () => {
    const { exposedState, onPick } = mountComposable({ range: false })
    await nextTick()
    const state = exposedState()

    const disabledItem = state.panelItems.value[0].find(item => item.isDisabled)!
    state.panelItemClick(0, disabledItem)
    await nextTick()
    expect(onPick).not.toHaveBeenCalled()

    state.panelItemHover(0, disabledItem)
  })
})
