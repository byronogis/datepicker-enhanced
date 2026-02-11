<script setup lang="ts">
import type { EnhDatePickerPanelItem } from '../types'
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
import { computed, inject } from 'vue'
import { enhPropsInjectionKey } from '../utils/constant.ts'

const props = defineProps<{
  title: string
  items: EnhDatePickerPanelItem[]
  arrowDisabled?: boolean | 'left' | 'right'
}>()

const emits = defineEmits<{
  clickPrev: []
  clickNext: []
  clickItem: [item: EnhDatePickerPanelItem]
  hoverItem: [item: EnhDatePickerPanelItem | null]
  clickTitle: []
}>()

const enhProps = inject(enhPropsInjectionKey)!

const numberOfRows = computed(() => Math.ceil(props.items.length / 4))
</script>

<template>
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
            'is-disabled': props.arrowDisabled === 'left',
          }"
          :disabled="props.arrowDisabled === 'left'"
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
            'is-disabled': props.arrowDisabled === 'right',
          }"
          :disabled="props.arrowDisabled === 'right'"
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
            :key="`${item.type}:${item.dateArrays.join('-')}`"
          >
            <td
              :class="[
                {
                  'today': item.isToday,
                  'current': item.isCurrent,
                  'disabled': item.isDisabled,
                  'start-date': item.isStartDate,
                  'end-date': item.isEndDate,
                  'in-range': item.isInRange,
                },
                enhProps.cellClassName ? enhProps.cellClassName(item.date) : '',
              ]"
              @mouseenter="emits('hoverItem', item)"
              @mouseleave="emits('hoverItem', null)"
            >
              <div class="el-date-table-cell">
                <span
                  class="cell el-date-table-cell__text"
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
