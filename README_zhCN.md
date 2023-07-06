## DatePickerEnhanced

[![NPM version](https://img.shields.io/npm/v/datepicker-enhanced)](https://www.npmjs.com/package/datepicker-enhanced)

[简体中文](./README_zhCN.md) | [English](./README.md)

> [element-plus](https://github.com/element-plus/element-plus) 的日期选择器组件增强版
>
> [Demo](https://byronogis.github.io/datepicker-enhanced/)

### 功能

- 新增支持 半年度、季度时间点和年度、半年度、季度时间范围选择

### 新日期类型 API 支持

> 截止当前
>
> 使用可参考 [DatePicker | Element Plus](https://element-plus.org/zh-CN/component/date-picker.html)
>
> `*`: 额外支持

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
- *allowSame?: boolean = true

##### `wantEnd`

当修改数值时默认情况下传递的数值是区间的起始值，可以通过传入 `wantEnd` 已得到结束值。

##### `allowSame`

默认情况下区间的起始值和结束值可以相同，可以将值设置为 `false` 不允许相同值。

#### Events

- visibleChange: (visible: boolean)

#### Methods

- focus
- handleOpen
- handleClose

### 使用示例

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

### 组件起手模板

[Vue-Component-Starter](https://github.com/peterroe/un/tree/main/templates/vue-component-starter)
