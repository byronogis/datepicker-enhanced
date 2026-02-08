import type { DateModelType } from 'element-plus'

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

export interface EnhDatePickerPanelItem {
  date: Date
  type: EnhDateTypeClear
  label: string
  year: number
  quarteryear?: number
  halfyear?: number
  isToday: boolean
  isCurrent: boolean
  isDisabled?: boolean
  isStartDate?: boolean
  isEndDate?: boolean
  isInRange?: boolean
}
