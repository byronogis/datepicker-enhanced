## DatePickerEnhanced

[![NPM version](https://img.shields.io/npm/v/datepicker-enhanced)](https://www.npmjs.com/package/datepicker-enhanced)

[简体中文](./README_zhCN.md) | [English](./README.md)

> [element-plus](https://github.com/element-plus/element-plus) 的日期选择器组件增强版

### 功能

- 新增支持 半年度、季度时间点和年度、半年度、季度时间范围选择

### 新日期类型的 Props 支持

> 截止当前
>
> `*`: 额外支持

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
- *wantEnd?: boolean = false

#### `wantEnd`

当修改数值时默认情况下传递的数值是区间的起始值，可以通过传入 `wantEnd` 已得到结束值。

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
