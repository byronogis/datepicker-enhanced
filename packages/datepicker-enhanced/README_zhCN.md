## DatePickerEnhanced

[![NPM version](https://img.shields.io/npm/v/datepicker-enhanced)](https://www.npmjs.com/package/datepicker-enhanced)

[简体中文](./README_zhCN.md) | [English](./README.md)

> [element-plus](https://github.com/element-plus/element-plus) 的日期选择器组件增强版
>
> [Demo](https://byronogis.github.io/datepicker-enhanced/)

### 功能

- 新增支持 半年度、季度时间点和年度、半年度、季度时间范围选择

### 新日期类型 API 支持

- type: `halfyear` `quarteryear` `yearrange` `halfyearrange` `quarteryearrange`

<details>
<summary>Type Definition</summary>

<!-- automd:file src="./src/types/api.ts" code -->

```ts [api.ts]
import type { DatePickerProps } from 'element-plus'
import type {
  EnhDate,
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
  | 'defaultValue'
  | 'defaultTimee'
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
  enhWantEnd?: boolean
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

### 使用示例

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
