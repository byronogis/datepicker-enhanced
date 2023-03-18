## DatePickerEnhanced

[![NPM version](https://img.shields.io/npm/v/datepicker-enhanced)](https://www.npmjs.com/package/datepicker-enhanced)

[简体中文](./README_zhCN.md) | [English](./README.md)

> A date picker enhanced component for [element-plus](https://github.com/element-plus/element-plus)
>
> [Demo](https://liamrad.github.io/datepicker-enhanced/)

### Features

- New support for halfyear, quarteryear time point and year, halfyear and quarteryear time range selection

### API Support for New Date Type

> up to now
>
> You can refer to [DatePicker | Element Plus](https://element-plus.org/zh-CN/component/date-picker.html)
>
> `*`: extra support

#### Attributes

- type: `halfyear` `quarteryear` `yearrange` `halfyearrange` `quarteryearrange`
- modelValue / v-model:  string | number | Date | (string | number | Date)[]
- readonly?: boolean = false
- disabled?: boolean = false
- editable?: boolean = true
- clearable?: boolean = true
- placeholder?: string = ''
- startPlaceholder?: string = ''
- endPlaceholder?: string = ''
- popperClass?: string = ''
- rangeSeparator?: string = '-'
- valueFormat?: string = ''
- prefixIcon?: Component | null = Calendar
- clearIcon?: Component | null = CircleClose
- disabledDate?: (date: Date) => boolean = () => false
- style?: StyleValue = ''
- *wantEnd?: boolean = false

##### `wantEnd`

By default, when a value is modified, the value passed is the starting value of the range，and you can get the end value by props of 'wantEnd'.

#### Events

- visibleChange: (visible: boolean)

#### Methods

- focus
- handleOpen
- handleClose

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
