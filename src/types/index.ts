import type { Component, StyleValue } from 'vue'
import type { DateModelType } from 'element-plus'

export type ExtraDateType =
  | 'quarteryear'
  | 'halfyear'
  | 'quarteryearrange'
  | 'halfyearrange'
  | 'yearrange'

export type DateType = ExtraDateType

export type DateTypeClear =
  | 'quarteryear'
  | 'halfyear'
  | 'year'

export interface DatePickerPanelItem {
  type: DateTypeClear
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

export interface InnerDatePickerEnhancedProps {
  type: DateTypeClear
  modelValue: DateModelType[]

  placeholder: string[]
  popperClass: string
  rangeSeparator: string
  valueFormat: string
  prefixIcon: Component
  clearIcon: Component
  disabledDate: (date: Date) => boolean
  cellClassName: (date: Date) => string
  teleported: boolean

  style: StyleValue

  wantEnd: boolean
  allowSame: boolean
}

export type OriginDateButSimple = string | number | Date
export type OriginDateButArray = [OriginDateButSimple, OriginDateButSimple]
export type OriginDate = OriginDateButSimple | OriginDateButArray
