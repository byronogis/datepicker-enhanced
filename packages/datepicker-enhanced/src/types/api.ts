import type { DatePickerProps } from 'element-plus'
import type {
  EnhDate,
  EnhDatePickerPanelItem,
  EnhDatePrimitive,
  EnhDateType,
  EnhDateTypeClear,
} from './index.ts'

/**
 * TODO support more props
 * @see https://element-plus.org/en-US/component/date-picker#attributes
 */
export interface EnhDatePickerProps<Type = EnhDateType, Value = EnhDate> extends Partial<Omit<
  DatePickerProps,
  | 'type'
  | 'modelValue'

  // 以下未支持
  | 'defaultTime'
  | 'unlinkPanels'
  | 'shortcuts'
  | 'valueOnClear'
  | 'showFooter'
  | 'showConfirm'
  | 'showWeekNumber'

  // 以下未验证
  | 'validateEvent'
  | 'emptyValues'
>> {
  type: Type
  modelValue: Value

  /**
   * By default, when a value is modified, the value passed is the starting
   * value of the range，and you can get the end value by props of 'enhWantEnd'.
   * @default false
   */
  enhWantEnd?: boolean | boolean[]
  /**
   * By default, the start and end values of the range can be the same, and
   * you can set the value to `false` to not allow the same value.
   * @default true
   */
  enhAllowSame?: boolean

  /** ep类型优化 */
  teleported?: boolean
  disabledDate?: (date: Date) => boolean
}

/**
 * @see https://element-plus.org/en-US/component/date-picker#events
 */
export interface EnhDatePickerEmits {
  'update:modelValue': [value: EnhDatePrimitive | EnhDatePrimitive[]]
  'change': [value: EnhDatePrimitive | EnhDatePrimitive[]]
  'blur': []
  'focus': []
  'clear': []
  'calendar-change': [[Date, Date?]]
  'panel-change': [[Date, Date?], EnhDateTypeClear, unknown]
  'visibleChange': [visible: boolean]
}

export interface EnhDatePickerSlots {
  default?: (props: { cell: EnhDatePickerPanelItem }) => any
}

/**
 * @see https://element-plus.org/en-US/component/date-picker#exposes
 */
export interface EnhDatePickerExposed {
  focus: () => void
  blur: () => void
  handleOpen: () => void
  handleClose: () => void
}
