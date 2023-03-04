<!-- eslint-disable unused-imports/no-unused-imports -->
<script setup lang="ts">
import { ref } from 'vue'

const halfyear = ref('2021-05-01')
const quarteryear = ref('2023-10-01')

const halfyearrange = ref<[string, string]>(['2016-05-01', '2018-10-01'])
const quarteryearrange = ref<[string, string]>(['2018-05-01', '2020-10-01'])
const yearrange = ref<[string, string]>(['2022-05-01', '2024-10-01'])

const month = ref('2021-06-01')
const monthrange = ref(['2021-07-01', '2021-09-01'])

const disableData = (date: Date) => {
  // console.log(date)
  return false
  // return date && (date.getMonth() + 1 === 7)
}
</script>

<template>
  <div>半年度选择器:</div>
  <DatePickerEnhanced
    v-model="halfyear"
    type="halfyear"
    placeholder="选择半年度"
    :disabled-date="disableData"
  />

  <div>季度选择器:</div>
  <DatePickerEnhanced
    v-model="quarteryear"
    type="quarteryear"
    placeholder="选择季度"
    :disabled-date="disableData"
  />

  <div>半年度范围</div>
  <DatePickerEnhanced
    v-model="halfyearrange"
    type="halfyearrange"
    start-placeholder="半年度开始"
    end-placeholder="半年度结束"
    :disabled-date="disableData"
  />

  <div>季度范围</div>
  <DatePickerEnhanced
    v-model="quarteryearrange"
    type="quarteryearrange"
    start-placeholder="季度开始"
    end-placeholder="季度结束"
    range-separator="To"
    :disabled-date="disableData"
  />

  <div>年度范围</div>
  <DatePickerEnhanced
    v-model="yearrange"
    type="yearrange"
    start-placeholder="年度开始"
    end-placeholder="年度结束"
    range-separator="To"
    :disabled-date="disableData"
  />

  <div>月度选择器:</div>
  <DatePickerEnhanced
    v-model="month"
    type="month"
    :disabled-date="disableData"
  />

  <div>月度范围选择</div>
  <DatePickerEnhanced
    v-model="monthrange"
    type="monthrange"
    range-separator="To"
    start-placeholder="Start month"
    end-placeholder="End month"
    :disabled-date="disableData"
  />
</template>
