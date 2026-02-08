import { ROOT_COMMON_PICKER_INJECTION_KEY } from 'element-plus'
import { expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { defineComponent, nextTick, provide, ref } from 'vue'
import { useDatePickerEnhanced } from '../src/composables/useDatePickerEnhanced'
import { enhInnerInjectionKey, enhPropsInjectionKey } from '../src/utils/constant'

it('useDatePickerEnhanced generates panel items and triggers pick', async () => {
  const pickerVisible = ref(false)
  const onCalendarChange = vi.fn()
  const onPanelChange = vi.fn()
  const onPick = vi.fn()
  let exposedState: ReturnType<typeof useDatePickerEnhanced>

  const ChildComponent = defineComponent({
    setup() {
      const state = useDatePickerEnhanced()
      exposedState = state
      return { state }
    },
    template: '<div />',
  })

  const TestComponent = defineComponent({
    setup() {
      provide(ROOT_COMMON_PICKER_INJECTION_KEY, {
        pickerVisible,
        onCalendarChange,
        onPanelChange,
        onPick,
      } as any)

      provide(enhPropsInjectionKey, {
        enhAllowSame: true,
        enhWantEnd: false,
        disabledDate: () => false,
      } as any)

      const inner = ref({
        innerType: 'quarteryear',
        innerFormat: 'YYYY-[Q]QY',
        innerIsRange: false,
        innerModelValue: [new Date('2024-01-01')],
      })

      provide(enhInnerInjectionKey, inner as any)

      return {}
    },
    components: { ChildComponent },
    template: '<ChildComponent />',
  })

  render(TestComponent)

  pickerVisible.value = true
  await nextTick()
  await nextTick()

  expect(exposedState!.panelItems.value[0].length).toBe(4)

  const target = exposedState!.panelItems.value[0][1]
  exposedState!.panelItemClick(0, target)
  await nextTick()
  await nextTick()

  expect(onPick).toHaveBeenCalled()
})
