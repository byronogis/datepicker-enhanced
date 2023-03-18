<script setup lang="ts">
import { reactive, ref } from 'vue'
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

const visibleChangeFn = (val: boolean, type: string) => {
  console.log(type, ' - visibleChange --> ', val)
}

const quarteryearProps = reactive({
  _title: '季度-区间开始值-YYYY-MM-DD',
  type: 'quarteryear',
  modelValue: '2021-05-01',
  disabledDate: disabledDateFnBunEnd,
  valueFormat: 'YYYY-MM-DD',
  wantEnd: false,
})

const quarteryearProps2 = reactive({
  _title: '季度-区间结束值-YYYY-MM-DD',
  type: 'quarteryear',
  modelValue: '2021-05-01',
  disabledDate: disabledDateFnBunEnd,
  valueFormat: 'YYYY-MM-DD',
  wantEnd: true,
})

const quarteryearProps3 = reactive({
  _title: '季度-禁止输入',
  type: 'quarteryear',
  modelValue: '2021-05-01',
  disabledDate: disabledDateFnBunEnd,
  editable: false,
})

const quarteryearProps4 = reactive({
  _title: '季度-禁用',
  type: 'quarteryear',
  modelValue: '2021-05-01',
  disabledDate: disabledDateFnBunEnd,
  disabled: true,
})

const quarteryearProps5 = reactive({
  _title: '季度-无清理',
  type: 'quarteryear',
  modelValue: '2021-05-01',
  disabledDate: disabledDateFnBunEnd,
  clearable: false,
})

const halfyearProps = reactive({
  type: 'halfyear',
  modelValue: '2021-05-01',
  disabledDate: disabledDateFnBunEnd,
  wantEnd: true,
})

const halfyearProps2 = reactive({
  type: 'halfyear',
  modelValue: '2021-05-01',
  disabledDate: disabledDateFnBunEnd,
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

const halfyearrangeProps2 = reactive({
  _title: '半年范围-分隔符(至)',
  type: 'halfyearrange',
  modelValue: ['2020-01-01', '2030-07-01'],
  disabledDate: disabledDateFn,
  rangeSeparator: '至',
})

const halfyearrangeProps3 = reactive({
  _title: '半年范围-起止不允许相同',
  type: 'halfyearrange',
  modelValue: ['2020-01-01', '2030-07-01'],
  disabledDate: disabledDateFn,
  allowSame: false,
})

const yearrangeProps = reactive({
  type: 'yearrange',
  modelValue: ['2020', '2025'],
  disabledDate: disabledDateFn,
  valueFormat: 'YYYY-MM-DD',
  wantEnd: true,
})

const items: any[] = [
  quarteryearProps,
  quarteryearProps2,
  quarteryearProps3,
  quarteryearProps4,
  quarteryearProps5,
  halfyearProps,
  halfyearProps2,
  quarteryearrangeProps,
  halfyearrangeProps,
  halfyearrangeProps2,
  halfyearrangeProps3,
  yearrangeProps,
]

const DatePickerEnhancedRef = ref(null)

const focusFn = (index = 0) => {
  DatePickerEnhancedRef.value[index].focus()
}

const handleOpenFn = (index = 0) => {
  DatePickerEnhancedRef.value[index].handleOpen()
}

const handleCloseFn = (index = 0) => {
  DatePickerEnhancedRef.value[index].handleClose()
}

const btnList = [
  {
    value: 'focus',
    fn: focusFn,
  },
  {
    value: 'handleOpen',
    fn: handleOpenFn,
  },
  {
    value: 'handleClose',
    fn: handleCloseFn,
  },
]
</script>

<template>
  <ul class="item-wrapper">
    <template v-for="(item, index) in items" :key="index">
      <li class="item" style="position: relative;">
        <h4>{{ index + 1 }}: {{ item._title || item.type }}</h4>
        <DatePickerEnhanced
          ref="DatePickerEnhancedRef"
          v-bind="item"
          @update:modelValue="item.modelValue = $event"
          @visibleChange="visibleChangeFn($event, item.type)"
        />
        <div>props: </div>
        <pre>{{ item }}</pre>
        <div class="btn-wrapper" style="position: absolute; bottom: 1em; right: 1em;">
          <input
            v-for="(btn) in btnList"
            :key="btn.value"
            :value="btn.value"
            type="button"
            @click="btn.fn(index)"
          >
        </div>
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
