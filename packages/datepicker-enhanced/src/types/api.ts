import type { DatePickerProps/* , PopoverProps */ } from 'element-plus'
import type {
  EnhDate,
  EnhDatePrimitive,
  EnhDateType,
} from './index.ts'

/**
 * TODO support more props
 * @see https://element-plus.org/en-US/component/date-picker#attributes
 */
export interface EnhDatePickerProps<Type = EnhDateType, Value = EnhDate> extends Partial<Pick<
  DatePickerProps,
  | 'readonly'
  | 'disabled'
  | 'editable'
  | 'clearable'
  | 'placeholder'
  | 'startPlaceholder'
  | 'endPlaceholder'
  | 'popperClass'
  | 'rangeSeparator'
  | 'valueFormat'
  | 'prefixIcon'
  | 'clearIcon'
  | 'cellClassName'
  | 'size'
>> {
  type: Type
  modelValue: Value

  /**
   * By default, when a value is modified, the value passed is the starting
   * value of the range，and you can get the end value by props of 'enhWantEnd'.
   * @default false
   */
  enhWantEnd?: boolean
  /**
   * By default, the start and end values of the range can be the same, and
   * you can set the value to `false` to not allow the same value.
   * @default true
   */
  enhAllowSame?: boolean
  // enhPopover?: Partial<PopoverProps>
  // enhStyles?: {
  //   //
  // }

  /** ep类型优化 */
  teleported?: boolean
  disabledDate?: (date: Date) => boolean
}

/**
 * TODO support more events
 * @see https://element-plus.org/en-US/component/date-picker#events
 */
export interface EnhDatePickerEmits {
  'update:modelValue': [value: EnhDatePrimitive | EnhDatePrimitive[]]
  // 'change': [],
  // 'change': [],
  // 'blur': [],
  // 'focus': [],
  // 'clear': [],
  // 'calendar-change': [],
  // 'panel-change': [],
  'visibleChange': [visible: boolean]
}

/**
 * TODO support more exposed methods
 * @see https://element-plus.org/en-US/component/date-picker#exposes
 */
export interface EnhDatePickerExposed {
  focus: () => void
  // blur: () => void
  handleOpen: () => void
  handleClose: () => void
}
