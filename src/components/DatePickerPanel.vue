<script setup lang="ts">
import { computed } from 'vue'

import { ElIcon } from 'element-plus'
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import { dateUnifiedParse } from './utils'
import { generateDateStr } from './useDatePickerEnhancedRange'
import type { DatePickerPanelItem } from './types'

const props = withDefaults(defineProps<{
  title: string
  items: DatePickerPanelItem[]
  leftPanelArrowDisabled?: boolean
  rightPanelArrowDisabled?: boolean
  type?:
  | 'quarteryear'
  | 'halfyear'
  | 'year'
  typeSecond?:
  | 'quarteryear'
  | 'halfyear'
  | 'year'
  range?: 1 | 2
  leftValue?: string
  rightValue?: string

}>(), {
  type: 'year',
  typeSecond: 'year',
  leftValue: '',
  rightValue: '',
})

const emits = defineEmits([
  'clickPrev',
  'clickNext',
  'clickTitle',
  'clickItem',
])

const numberOfRows = computed(() => Math.ceil(props.items.length / 4))

// 左侧面板日期项自禁用判断
const leftPanelItemDisabled = (item: DatePickerPanelItem) => {
  const itemStr = generateDateStr(props.type, [item.year, item[props.type] || NaN])
  const parseItemStr = dateUnifiedParse(itemStr, props.type) as string

  const parseRightValue = dateUnifiedParse(props.rightValue, props.type) as string

  if (new Date(parseItemStr) <= new Date(parseRightValue)) {
    return false
  } else {
    return true
  }
}

// 右侧面板日期项自禁用判断
const rightPanelItemDisabled = (item: DatePickerPanelItem) => {
  const itemStr = generateDateStr(props.typeSecond, [item.year, item[props.typeSecond] || NaN])
  const parseItemStr = dateUnifiedParse(itemStr, props.typeSecond) as string

  const parseLeftValue = dateUnifiedParse(props.leftValue, props.typeSecond) as string

  if (new Date(parseItemStr) >= new Date(parseLeftValue)) {
    return false
  } else {
    return true
  }
}

// 日期项自禁用判断
const isDisabled = (item: DatePickerPanelItem) => {
  if (item.isDisabled) {
    return true
  }

  if (props.range === 1) {
    return leftPanelItemDisabled(item)
  } else if (props.range === 2) {
    return rightPanelItemDisabled(item)
  }

  return false
}

// const log = () => {
//   console.log(111)
//   emits('clickPrev')
// }
</script>

<template>
  <!-- content -->
  <div class="el-picker-panel__content">
    <!-- header -->
    <div class="el-date-picker__header el-date-picker__header--bordered">
      <span
        class="el-date-picker__prev-btn"
        :class="[props.leftPanelArrowDisabled && ('is-disabled cursor-not-allowed')]"
      >
        <span
          aria-label="上一年"
          class="el-picker-panel__icon-btn el-icon-d-arrow-left"
          :class="[props.leftPanelArrowDisabled && ('is-disabled pointer-events-none')]"
          @click="emits('clickPrev')"
        ><ElIcon :class="[props.leftPanelArrowDisabled && ('is-disabled cursor-not-allowed')]"><DArrowLeft /></ElIcon></span>
      </span>
      <span role="button" class="el-date-picker__header-label" @click="emits('clickTitle')">{{ props.title }}</span>
      <span
        class="el-date-picker__next-btn"
        :class="[props.rightPanelArrowDisabled && ('is-disabled cursor-not-allowed')]"
      >
        <span
          aria-label="下一年"
          class="el-picker-panel__icon-btn el-icon-d-arrow-right"
          :class="[props.rightPanelArrowDisabled && ('is-disabled pointer-events-none')]"
          @click="emits('clickNext')"
        ><ElIcon :class="[props.rightPanelArrowDisabled && ('is-disabled cursor-not-allowed')]"><DArrowRight /></ElIcon></span>
      </span>
    </div>
    <!-- table -->
    <table class="el-month-table" style="">
      <tbody>
        <tr v-for="row in numberOfRows" :key="row">
          <template
            v-for="item in props.items.slice((row - 1) * 4, (row - 1) * 4 + 4)"
            :key="item.label"
          >
            <td
              v-if="item"
              :class="{
                'today': item.isToday,
                'current': item.isCurrent,
                'disabled': isDisabled(item),
                'pointer-events-none': isDisabled(item),
              }"
            >
              <div :class="{ 'cursor-not-allowed': isDisabled(item) }">
                <span
                  class="cell"
                  @click="emits('clickItem', item)"
                >{{ item.label }}</span>
              </div>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>
