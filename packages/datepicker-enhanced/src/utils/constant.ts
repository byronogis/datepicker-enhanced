import type { EmitFn, InjectionKey, Ref, ShortEmitsToObject } from 'vue'
import type {
  EnhDatePickerEmits,
  EnhDatePickerProps,
  EnhDatePickerSlots,
  EnhDateTypeClear,
  EnhInner,
} from '../types/index.ts'

export const DATE_ABBR: Record<EnhDateTypeClear, string> = {
  year: 'Y',
  halfyear: 'H',
  quarteryear: 'Q',
}

export const DATE_FORMAT: Record<EnhDateTypeClear, string> = {
  year: 'YYYY',
  halfyear: 'YYYY-[H]HY',
  quarteryear: 'YYYY-[Q]QY',
}

export const HALFYEAR_Enum = ['上半年', '下半年']

export const QUARTERYEAR_ENUM = ['第一季度', '第二季度', '第三季度', '第四季度']

export const DATE_TYPE: EnhDateTypeClear[] = [
  'year',
  'halfyear',
  'quarteryear',
]

export const enhPropsInjectionKey = Symbol('enhPropsKey') as InjectionKey<EnhDatePickerProps>
export const enhEmitsInjectionKey = Symbol('enhEmitsKey') as InjectionKey<EmitFn<ShortEmitsToObject<EnhDatePickerEmits>>>
export const enhSlotsInjectionKey = Symbol('enhSlotsKey') as InjectionKey<EnhDatePickerSlots>
export const enhInnerInjectionKey = Symbol('enhInnerKey') as InjectionKey<Ref<EnhInner>>

export function getEnhPropsDefault(): Partial<EnhDatePickerProps> {
  return {
    readonly: false,
    disabled: false,
    editable: true,
    clearable: true,
    placeholder: '',
    startPlaceholder: '',
    endPlaceholder: '',
    popperClass: '',
    rangeSeparator: '-',
    teleported: true,
    placement: 'bottom',
    automaticDropdown: true,

    enhWantEnd: false,
    enhAllowSame: true,
  }
}
