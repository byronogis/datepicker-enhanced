<script setup lang="ts">
import { reactive } from 'vue'
import dayjs from 'dayjs'
import { name, version } from '../package.json'

const disabledDateList = ['2020-01-01', '2020-04-01', '2021-10-01']
const disableDateListButEnd = ['2020-03-31', '2020-06-30', '2021-12-31']

const disabledDateFn = (date: Date) => {
  const target = dayjs(date).format('YYYY-MM-DD')
  return disabledDateList.includes(target)
}

const disabledDateFnBunEnd = (date: Date) => {
  const target = dayjs(date).format('YYYY-MM-DD')
  return disableDateListButEnd.includes(target)
}

const quarteryearProps = reactive({
  type: 'quarteryear',
  modelValue: '2021-05-01',
  disabledDate: disabledDateFnBunEnd,
  valueFormat: 'YYYY-MM-DD',
  wantEnd: true,
})

const halfyearProps = reactive({
  type: 'halfyear',
  modelValue: '2021-05-01',
  disabledDate: disabledDateFnBunEnd,
  wantEnd: true,
})

const quarteryearrangeProps = reactive({
  type: 'quarteryearrange',
  modelValue: ['2020-05-01', '2023-08-01'],
  disabledDate: disabledDateFn,
  valueFormat: 'YYYY-MM-DD',
  wantEnd: true,
})

const halfyearrangeProps = reactive({
  type: 'halfyearrange',
  modelValue: ['2020-01-01', '2030-07-01'],
  disabledDate: disabledDateFn,
})

const yearrangeProps = reactive({
  type: 'yearrange',
  modelValue: ['2020', '2025'],
  disabledDate: disabledDateFn,
  valueFormat: 'YYYY-MM-DD',
  wantEnd: true,
})

const extraTypes = {
  quarteryear: quarteryearProps,
  halfyear: halfyearProps,
  quaretryearrange: quarteryearrangeProps,
  halfyearrange: halfyearrangeProps,
  yearrange: yearrangeProps,
}
</script>

<template>
  <ul class="item-wrapper">
    <template v-for="(item, key) in extraTypes" :key="key">
      <li class="item">
        <h4>{{ item.type }}</h4>
        <DatePickerEnhanced
          v-bind="item"
          @update:modelValue="item.modelValue = $event"
        />
        <div>props: </div>
        <pre>{{ item }}</pre>
      </li>
    </template>
  </ul>

  <footer class="footer">
    <a :href="`https://www.npmjs.com/package/${name}`" target="_blank">{{ name }}@{{ version }}</a>
  </footer>
</template>

<style scoped>
.item-wrapper {
  margin: 0;
  padding: 2em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  list-style: none;
}

.item {
  padding: 2em;
  margin-bottom: 2em;
  display: inline-block;
  min-width: 400px;
  min-height: 100px;
  box-shadow: 1px 1px 5px #333;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 4rem;
  line-height: 4rem;
  font-size: 1.5rem;
  text-align: center;
  background-color: #f5f5f5;
}
</style>
