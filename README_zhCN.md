## DatePickerEnhanced

> [element-plus](https://github.com/element-plus/element-plus) 的日期选择器组件增强版

### 功能

- 兼容 element-plus 的 DatePicker 组件
- 新增支持 半年度、季度时间点和年度、半年度、季度时间范围选择

### 新日期类型的 Props 支持

> 截止当前

- type: `halfyear` `quarteryear` `yearrange` `halfyearrange` `quarteryearrange`
- modelValue:  string | number | Date
- disabledDate: (date: Date) => boolean
- popperClass: string
- placeholder: string
- startPlaceholder?: string
- endPlaceholder?: string
- rangeSeparator?: string
- prefixIcon?: Component
