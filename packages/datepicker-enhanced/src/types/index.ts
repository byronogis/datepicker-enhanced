import type { DateModelType } from 'element-plus'
import type { DateArray } from '../utils/dateStr.ts'

export type * from './api.ts'

export type EnhDatePrimitive = DateModelType
export type EnhDate = EnhDatePrimitive | EnhDatePrimitive[]

export type EnhDateType
  = | 'quarteryear'
    | 'halfyear'
    | 'quarteryearrange'
    | 'halfyearrange'
    | 'yearrange'

export type EnhDateTypeClear
  = | 'quarteryear'
    | 'halfyear'
    | 'year'

export interface EnhInner {
  innerType: EnhDateTypeClear
  innerFormat: string
  /** 是否为范围选择 */
  innerIsRange: boolean
  /** 面板数量, 与 innerIsRange 对应, true 2 false 1 */
  innerPanelAmount: 1 | 2
  innerModelValue: EnhDatePrimitive[]
  innerDefaultValue: Date[]
  innerEnhWantEnd: [boolean, boolean?]
}

export interface EnhDatePickerPanelItem {
  /** 日期对象 */
  date: Date
  dateArrays: DateArray
  /** 所在面板类型 */
  type: EnhDateTypeClear
  /** 显示文本 */
  label: string
  /** 年份 */
  year: number
  /** 季度 */
  quarteryear: number | null
  /** 半年度 */
  halfyear: number | null
  /** 是否禁用 */
  isDisabled: boolean
  /** 是否为(含)今天 */
  isToday: boolean
  /** 非范围选择, 是否为当前项 */
  isCurrent: boolean | null
  /** 范围选择, 是否为起始日期 */
  isStartDate: boolean | null
  /** 范围选择, 是否为结束日期 */
  isEndDate: boolean | null
  /** 范围选择, 是否在范围内 */
  isInRange: boolean | null
}
