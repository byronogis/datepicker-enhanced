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
import type { DatePickerProps } from 'element-plus'
import type { StyleValue } from 'vue'
import type {
  EnhDate,
  EnhDatePickerPanelItem,
  EnhDatePrimitive,
  EnhDateType,
  EnhDateTypeClear,
} from './index.ts'

/**
 * @see https://element-plus.org/en-US/component/date-picker#attributes
 */
export interface EnhDatePickerProps<Type = EnhDateType, Value = EnhDate> extends Partial<Pick<
  DatePickerProps,
  | 'readonly'
  | 'disabled'
  | 'size'
  | 'editable'
  | 'clearable'
  | 'placeholder'
  | 'startPlaceholder'
  | 'endPlaceholder'
  | 'format'
  | 'popperOptions'
  | 'rangeSeparator'
  | 'valueFormat'
  | 'prefixIcon'
  | 'clearIcon'
  | 'cellClassName'
  | 'automaticDropdown'

  // // 以下未支持
  // | 'defaultTime'
  // | 'unlinkPanels'
  // | 'shortcuts'
  // | 'valueOnClear'
  // | 'showFooter'
  // | 'showConfirm'
  // | 'showWeekNumber'

  // // 以下未验证
  // | 'validateEvent'
  // | 'emptyValues'
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
  id?: string | string[]
  name?: string | string[]
  popperClass?: string
  popperStyle?: StyleValue
  teleported?: boolean
  defaultValue?: Date | Date[]
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

<!-- automd:contributors author="byronogis" license="MIT" -->

Published under the [MIT](https://github.com/byronogis/datepicker-enhanced/blob/main/LICENSE) license.
Made by [@byronogis](https://github.com/byronogis) and [community](https://github.com/byronogis/datepicker-enhanced/graphs/contributors) 💛
<br><br>
<a href="https://github.com/byronogis/datepicker-enhanced/graphs/contributors">
<img src="https://contrib.rocks/image?repo=byronogis/datepicker-enhanced" />
</a>

<!-- /automd -->

<!-- automd:with-automd -->

---

_🤖 auto updated with [automd](https://automd.unjs.io)_

<!-- /automd -->
