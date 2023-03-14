## DatePickerEnhanced

[![NPM version](https://img.shields.io/npm/v/datepicker-enhanced)](https://www.npmjs.com/package/datepicker-enhanced)

[简体中文](./README_zhCN.md) | [English](./README.md)

> A date picker enhanced component for [element-plus](https://github.com/element-plus/element-plus)

### Features

- New support for halfyear, quarteryear time point and year, halfyear and quarteryear time range selection

### Props Support for New Date Type

> up to now

- type: `halfyear` `quarteryear` `yearrange` `halfyearrange` `quarteryearrange`
- modelValue / v-model:  string | number | Date | (string | number | Date)[]
- placeholder?: string = '选择日期'
- startPlaceholder?: string = '开始日期'
- endPlaceholder?: string = '结束日期'
- popperClass?: string = ''
- rangeSeparator?: string = '至'
- valueFormat?: string = ''
- prefixIcon?: Component
- disabledDate?: (date: Date) => boolean = () => false
- style?: StyleValue = ''
- wantEnd?: boolean = false

#### `wantEnd`

By default, when a value is modified, the value passed is the starting value of the range，and you can get the end value by props of 'wantEnd'.

### Usage Example

```vue
<script setup lang="ts">
import DatePickerEnhanced from 'datepicker-enhanced'
import 'datepicker-enhanced/dist/style.css'

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

### Beginning with

[Vue-Component-Starter](https://github.com/peterroe/un/tree/main/templates/vue-component-starter)
