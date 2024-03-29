<script setup lang="ts">
import { computed } from 'vue'
import { ElIcon } from 'element-plus'
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import type { DatePickerPanelItem } from '../types'

const props = defineProps<{
  title: string
  items: DatePickerPanelItem[]
  isArrowDisabledForRange?: boolean | 'left' | 'right'
}>()

const emits = defineEmits([
  'clickPrev',
  'clickNext',
  'clickItem',
  'clickTitle',
])

const numberOfRows = computed(() => Math.ceil(props.items.length / 4))
</script>

<template>
  <!-- content -->
  <div class="el-picker-panel__content">
    <!-- header -->
    <div class="el-date-picker__header el-date-picker__header--bordered">
      <span
        class="el-date-picker__prev-btn"
      >
        <button
          aria-label="上一年"
          class="el-picker-panel__icon-btn el-icon-d-arrow-left"
          :class="{
            'is-disabled': props.isArrowDisabledForRange === 'left',
          }"
          :disabled="props.isArrowDisabledForRange === 'left'"
          @click.prevent="emits('clickPrev')"
        ><ElIcon><DArrowLeft /></ElIcon></button>
      </span>
      <span
        role="button" class="el-date-picker__header-label"
        @click="emits('clickTitle')"
      >{{ props.title }}</span>
      <span
        class="el-date-picker__next-btn"
      >
        <button
          aria-label="下一年"
          class="el-picker-panel__icon-btn el-icon-d-arrow-right"
          :class="{
            'is-disabled': props.isArrowDisabledForRange === 'right',
          }"
          :disabled="props.isArrowDisabledForRange === 'right'"
          @click.prevent="emits('clickNext')"
        ><ElIcon><DArrowRight /></ElIcon></button>
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
                /* today: item.isToday, */
                /* current: item.isCurrent, */
                'disabled': item.isDisabled,
                'start-date': item.isStartDate,
                'end-date': item.isEndDate,
                'in-range': item.isInRange,
              }"
            >
              <div>
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
