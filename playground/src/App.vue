<script setup lang="ts">
import type { EnhDatePickerProps } from 'datepicker-enhanced'
import { DatePickerEnhanced, getEnhPropsDefault } from 'datepicker-enhanced'
import dayjs from 'dayjs'
import { ElButton, ElCard, ElScrollbar } from 'element-plus'
import { ref, watch } from 'vue'
import Editor from './component/Editor.vue'

import 'element-plus/dist/index.css'

type PlaygroundState = EnhDatePickerProps & {
  _disabledDateList: string[]
  _defaultValueList: string[]
}

function getDefaults(): PlaygroundState {
  const defaultValueStr = '2000-01-01'
  const state: PlaygroundState = {
    ...getEnhPropsDefault(),
    type: 'quarteryear',
    modelValue: '2021-05-01',
    valueFormat: 'YYYY-MM-DD',
    defaultValue: new Date(defaultValueStr),

    enhWantEnd: false,
    _disabledDateList: ['2020-01-01', '2020-04-01', '2021-10-01'],
    _defaultValueList: [defaultValueStr],
  }

  // bind to state so edits to disabledDateList take effect without re-registering
  state.disabledDate = (date: Date) => {
    const target = dayjs(date).format('YYYY-MM-DD')
    return state._disabledDateList.includes(target)
  }

  return state
}

const pickerProps = ref<PlaygroundState>(getDefaults())

watch(() => pickerProps.value.type, () => {
  handleUpdateKey()
})

watch(() => pickerProps.value._defaultValueList, (newVal) => {
  // @ts-expect-error readonly --- IGNORE ---
  pickerProps.value.defaultValue = newVal.map(str => new Date(str))
}, { deep: true })

const DatePickerEnhancedRef = ref<InstanceType<typeof DatePickerEnhanced>>()

const btnList = (['focus', 'blur', 'handleOpen', 'handleClose'] as const).map((value) => {
  return {
    value,
    fn() {
      DatePickerEnhancedRef.value?.[value]()
    },
  }
})

let timer: number | null = null
function handleEvent(type: string, name: string, ...e: any[]): void {
  console.info(type, name, '-->', ...e)
  // 在防抖超过200ms后打印分割线，方便区分事件触发的先后顺序
  if (timer) {
    clearTimeout(timer)
  }
  timer = window.setTimeout(() => {
    console.info('----------------------------------')
    timer = null
  }, 800)
}

function handleUpdateModelValue(value: unknown): void {
  handleEvent(pickerProps.value.type, 'update:model-value', value)
  pickerProps.value.modelValue = value as any
}

function handleReset(): void {
  pickerProps.value = getDefaults()
}

const timeKey = ref(new Date().getTime())
function handleUpdateKey(): void {
  timeKey.value = new Date().getTime()
}
</script>

<template>
  <el-config-provider>
    <div class="p-4 bg-slate-50 min-h-screen lg:p-6 lg:h-screen">
      <div class="gap-4 grid grid-cols-1 h-full items-start lg:gap-6 lg:grid-cols-3">
        <ElCard shadow="never" body-class="" class="h-full">
          <template #header>
            <div class="card-title">
              <span>预览</span>
              <ElButton size="small" type="warning" plain @click="handleUpdateKey">
                重载
              </ElButton>
            </div>
          </template>
          <div class="flex flex-col gap-4 h-full min-h-0">
            <DatePickerEnhanced
              ref="DatePickerEnhancedRef"
              :key="timeKey"
              class="flex-none!"
              v-bind="pickerProps"
              @update:model-value="handleUpdateModelValue"
              @visible-change="(...$event) => handleEvent(pickerProps.type, 'visible-change', ...$event)"
              @calendar-change="(...$event) => handleEvent(pickerProps.type, 'calendar-change', ...$event)"
              @panel-change="(...$event) => handleEvent(pickerProps.type, 'panel-change', ...$event)"
              @change="(...$event) => handleEvent(pickerProps.type, 'change', ...$event)"
              @clear="(...$event) => handleEvent(pickerProps.type, 'clear', ...$event)"
              @focus="(...$event) => handleEvent(pickerProps.type, 'focus', ...$event)"
              @blur="(...$event) => handleEvent(pickerProps.type, 'blur', ...$event)"
            />

            <ElScrollbar class="flex-1">
              <pre
                class="text-xs leading-5 p-3 border border-slate-200 rounded-lg bg-white h-full overflow-auto"
              >{{ pickerProps }}</pre>
            </ElScrollbar>

            <div class="flex flex-wrap gap-2">
              <ElButton
                v-for="(btn) in btnList"
                :key="btn.value"
                size="small"
                type="primary"
                @click="btn.fn"
              >
                {{ btn.value }}
              </ElButton>
            </div>
          </div>
        </ElCard>

        <ElCard shadow="never" body-class="" class="h-full lg:col-span-2">
          <template #header>
            <div class="card-title">
              <span>属性编辑器</span>
              <ElButton size="small" type="warning" plain @click="handleReset">
                重置
              </ElButton>
            </div>
          </template>
          <ElScrollbar class="">
            <div class="p-2">
              <Editor v-model="pickerProps" />
            </div>
          </ElScrollbar>
        </ElCard>
      </div>
    </div>
  </el-config-provider>
</template>

<style scoped lang="postcss">
.card-title {
  --at-apply: text-base text-slate-800 font-semibold flex gap-2 items-center ;
}
</style>
