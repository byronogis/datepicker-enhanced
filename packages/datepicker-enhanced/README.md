## DatePickerEnhanced

[![NPM version](https://img.shields.io/npm/v/datepicker-enhanced)](https://www.npmjs.com/package/datepicker-enhanced)

[简体中文](./README_zhCN.md) | [English](./README.md)

> A date picker enhanced component for [element-plus](https://github.com/element-plus/element-plus)
>
> [Demo](https://byronogis.github.io/datepicker-enhanced/)

### Features

- New support for halfyear, quarteryear time point and year, halfyear and quarteryear time range selection

### API Support for New Date Type

- type: `halfyear` `quarteryear` `yearrange` `halfyearrange` `quarteryearrange`

<details>
<summary>Type Definition</summary>

<!-- automd:file src="./src/types/api.ts" code -->

```ts [api.ts]
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
export interface EnhDatePickerProps<Type = EnhDateType, Value = EnhDate> extends Partial<Pick<DatePickerProps, | 'readonly'
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
  // | 'disabledDate'
  | 'cellClassName'
  // | 'teleported'
  | 'size'
  // | 'style'
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
```

<!-- /automd -->
</details>

### Usage Example

```vue
<script setup lang="ts">
import { DatePickerEnhanced } from 'datepicker-enhanced'
import { ElDatePicker } from 'element-plus'

const extraType = ['halfyear', 'quarteryear', 'yearrange', 'halfyearrange', 'quarteryearrange']
const type = ref('halfyear')
</script>

<template>
  <template v-if="extraType.includes(type)">
    <DatePickerEnhanced v-model="value" :type="type" />
  </template>

  <template v-else>
    <ElDatePicker v-model="value" :type="type" />
  </template>
</template>
```
