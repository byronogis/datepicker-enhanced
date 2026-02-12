<script setup lang="ts">
import type { EnhDatePickerProps } from 'datepicker-enhanced'
import { computed, watch } from 'vue'

type EditorModel = EnhDatePickerProps & {
  _disabledDateList: string[]
  _defaultValueList: string[]
}

const propsModel = defineModel<EditorModel>({ required: true })

const disabledDateText = computed({
  get() {
    return (propsModel.value._disabledDateList ?? []).join(',')
  },
  set(val: string) {
    propsModel.value._disabledDateList = val
      .split(',')
      .map(item => item.trim())
      .filter(Boolean)
  },
})

const defaultValueText = computed({
  get() {
    return (propsModel.value._defaultValueList ?? []).join(',')
  },
  set(val: string) {
    propsModel.value._defaultValueList = val
      .split(',')
      .map(item => item.trim())
      .filter(Boolean)
  },
})

const isRange = computed(() => propsModel.value.type?.includes('range'))

function setEnhWantEnd(part: 'start' | 'end', val: boolean): void {
  const current = propsModel.value.enhWantEnd

  if (isRange.value) {
    const next = Array.isArray(current)
      ? [...current]
      : [Boolean(current), Boolean(current)]
    const index = part === 'start' ? 0 : 1
    next[index] = val
    propsModel.value.enhWantEnd = next
    return
  }

  propsModel.value.enhWantEnd = val
}

const enhWantEndStart = computed({
  get() {
    const current = propsModel.value.enhWantEnd
    return Array.isArray(current) ? Boolean(current[0]) : Boolean(current)
  },
  set(val: boolean) {
    setEnhWantEnd('start', val)
  },
})

const enhWantEndEnd = computed({
  get() {
    const current = propsModel.value.enhWantEnd
    return Array.isArray(current) ? Boolean(current[1]) : Boolean(current)
  },
  set(val: boolean) {
    setEnhWantEnd('end', val)
  },
})

const startValue = computed({
  get() {
    const value = propsModel.value.modelValue
    return Array.isArray(value) ? (value[0] ?? '') : ''
  },
  set(val: string) {
    const current = propsModel.value.modelValue
    const next = Array.isArray(current) ? [...current] : ['', '']
    next[0] = val
    propsModel.value.modelValue = next
  },
})

const endValue = computed({
  get() {
    const value = propsModel.value.modelValue
    return Array.isArray(value) ? (value[1] ?? '') : ''
  },
  set(val: string) {
    const current = propsModel.value.modelValue
    const next = Array.isArray(current) ? [...current] : ['', '']
    next[1] = val
    propsModel.value.modelValue = next
  },
})

const singleValue = computed({
  get() {
    const value = propsModel.value.modelValue
    return Array.isArray(value) ? '' : (value ?? '')
  },
  set(val: string) {
    propsModel.value.modelValue = val
  },
})

watch(() => propsModel.value.type, () => {
  const current = propsModel.value.modelValue

  if (isRange.value && !Array.isArray(current)) {
    const base = typeof current === 'string' ? current : ''
    propsModel.value.modelValue = [base, '']
    propsModel.value.enhWantEnd = Array.isArray(propsModel.value.enhWantEnd)
      ? propsModel.value.enhWantEnd
      : [Boolean(propsModel.value.enhWantEnd), Boolean(propsModel.value.enhWantEnd)]
    return
  }

  if (!isRange.value && Array.isArray(current)) {
    const first = current.find(item => item !== '' && item != null) ?? ''
    propsModel.value.modelValue = first
  }

  if (!isRange.value && Array.isArray(propsModel.value.enhWantEnd)) {
    propsModel.value.enhWantEnd = propsModel.value.enhWantEnd[0] ?? false
  }
}, { flush: 'sync' })
</script>

<template>
  <ElForm class="form" label-position="top" @submit.prevent>
    <!-- type -->
    <ElFormItem label="type">
      <ElSelect v-model="propsModel.type">
        <ElOption label="quarteryear" value="quarteryear" />
        <ElOption label="halfyear" value="halfyear" />
        <ElOption label="yearrange" value="yearrange" />
        <ElOption label="quarteryearrange" value="quarteryearrange" />
        <ElOption label="halfyearrange" value="halfyearrange" />
      </ElSelect>
    </ElFormItem>

    <!-- size -->
    <ElFormItem label="size">
      <ElSelect v-model="propsModel.size">
        <ElOption label="default" value="" />
        <ElOption label="large" value="large" />
        <ElOption label="small" value="small" />
      </ElSelect>
    </ElFormItem>

    <!-- modelValue -->
    <ElFormItem v-if="!isRange" label="modelValue">
      <ElDatePicker
        v-model="singleValue"
        :value-format="propsModel.valueFormat"
        type="date"
        style="width: 100%;"
      />
    </ElFormItem>

    <template v-else>
      <ElFormItem label="start">
        <ElDatePicker
          v-model="startValue"
          :value-format="propsModel.valueFormat"
          type="date"
          style="width: 100%;"
        />
      </ElFormItem>
      <ElFormItem label="end">
        <ElDatePicker
          v-model="endValue"
          :value-format="propsModel.valueFormat"
          type="date"
          style="width: 100%;"
        />
      </ElFormItem>
    </template>

    <!-- placeholder -->
    <ElFormItem v-if="!isRange" label="placeholder">
      <ElInput v-model="propsModel.placeholder" />
    </ElFormItem>

    <template v-else>
      <ElFormItem label="startPlaceholder">
        <ElInput v-model="propsModel.startPlaceholder" />
      </ElFormItem>
      <ElFormItem label="endPlaceholder">
        <ElInput v-model="propsModel.endPlaceholder" />
      </ElFormItem>
    </template>

    <!-- format -->
    <ElFormItem label="format">
      <ElInput v-model="propsModel.format" />
    </ElFormItem>

    <!-- valueFormat -->
    <ElFormItem label="valueFormat">
      <ElInput v-model="propsModel.valueFormat" />
    </ElFormItem>

    <!-- popper-class -->
    <ElFormItem label="popperClass">
      <!-- @vue-expect-error -->
      <ElInput v-model="propsModel.popperClass" />
    </ElFormItem>

    <!-- popper-style -->
    <ElFormItem label="popperStyle">
      <!-- @vue-expect-error -->
      <ElInput v-model="propsModel.popperStyle" />
    </ElFormItem>

    <!-- popper-options -->
    <!-- <ElFormItem label="popperOptions">
      <ElInput v-model="propsModel.popperOptions" type="textarea" :rows="3" />
    </ElFormItem> -->

    <!-- range-separator -->
    <ElFormItem v-if="isRange" label="rangeSeparator">
      <ElInput v-model="propsModel.rangeSeparator" placeholder="-" />
    </ElFormItem>

    <!-- id -->
    <ElFormItem label="id">
      <!-- @vue-expect-error -->
      <ElInput
        :model-value="[propsModel.id].flat().join()"
        @update:model-value="propsModel.id = $event.split(',')"
      />
    </ElFormItem>

    <!-- name -->
    <ElFormItem label="name">
      <!-- @vue-expect-error -->
      <ElInput
        :model-value="[propsModel.name].flat().join()"
        @update:model-value="propsModel.name = $event.split(',')"
      />
    </ElFormItem>

    <!-- placement -->
    <ElFormItem label="placement">
      <ElSelect v-model="propsModel.placement" placeholder="bottom-start">
        <ElOption
          v-for="i in [
            'top',
            'top-start',
            'top-end',
            'bottom',
            'bottom-start',
            'bottom-end',
            'left',
            'left-start',
            'left-end',
            'right',
            'right-start',
            'right-end',
          ]"
          :key="i"
          :label="i"
          :value="i"
        />
      </ElSelect>
    </ElFormItem>

    <ElRow :gutter="10" class="full-row">
      <ElCol :span="12" :md="6">
        <ElCheckbox v-model="propsModel.disabled" label="disabled" />
      </ElCol>
      <ElCol :span="12" :md="6">
        <ElCheckbox v-model="propsModel.readonly" label="readonly" />
      </ElCol>
      <ElCol :span="12" :md="6">
        <ElCheckbox v-model="propsModel.editable" label="editable" />
      </ElCol>
      <ElCol :span="12" :md="6">
        <ElCheckbox v-model="propsModel.clearable" label="clearable" />
      </ElCol>
    </ElRow>

    <ElRow :gutter="10" class="full-row">
      <ElCol :span="12" :md="6">
        <ElCheckbox v-model="propsModel.teleported" label="teleported" />
      </ElCol>
      <ElCol :span="12" :md="6">
        <ElCheckbox v-model="propsModel.automaticDropdown" label="automaticDropdown" />
      </ElCol>
    </ElRow>

    <ElRow :gutter="10" class="full-row">
      <ElCol :span="12" :md="6">
        <ElCheckbox
          v-model="enhWantEndStart"
          :label="isRange ? 'enhWantEnd (start)' : 'enhWantEnd'"
        />
      </ElCol>
      <ElCol :span="12" :md="6">
        <template v-if="isRange">
          <ElCheckbox
            v-model="enhWantEndEnd"
            label="enhWantEnd (end)"
          />
        </template>
        <template v-else>
          <ElCheckbox v-model="propsModel.enhAllowSame" label="enhAllowSame" />
        </template>
      </ElCol>
    </ElRow>

    <ElRow v-if="isRange" :gutter="10" class="full-row">
      <ElCol :span="12" :md="6">
        <ElCheckbox v-model="propsModel.enhAllowSame" label="enhAllowSame" />
      </ElCol>
    </ElRow>

    <ElFormItem label="_disabledDateList（逗号分隔）" class="full-row">
      <ElInput v-model="disabledDateText" type="textarea" :rows="3" placeholder="2020-01-01,2020-04-01" />
    </ElFormItem>
    <ElFormItem label="_defaultValueList（逗号分隔）" class="full-row">
      <ElInput v-model="defaultValueText" type="textarea" :rows="2" placeholder="2050-01-01" />
    </ElFormItem>
  </ElForm>
</template>

<style scoped lang="postcss">
.form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
}

.full-row {
  grid-column: 1 / -1;
}
</style>
