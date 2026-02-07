<script setup lang="ts" generic="Value extends (string | string[]) = string">
import { computed, inject, ref } from 'vue'
import {
  enhAttrsInjectionKey,
  enhIsRangeInjectionKey,
  enhPropsInjectionKey,
} from '../utils/constant.ts'

defineOptions({
  inheritAttrs: false,
})

const enhAttrs = inject(enhAttrsInjectionKey)!
const enhProps = inject(enhPropsInjectionKey)!
const enhIsRange = inject(enhIsRangeInjectionKey)!

const value = defineModel<Value, string, Value, [any, (-1 | 0 | 1)?]>({
  // get: () => props.modelValue,
  set: function updateValue([e, index = -1]): [string, -1 | 0 | 1] {
    return [e?.target?.value ?? '', index]
  },
  required: true,
})

const wrapperClasses = computed(() => ([
  enhIsRange
    ? 'el-date-editor el-date-editor--monthrange el-input__wrapper el-range-editor el-tooltip__trigger el-tooltip__trigger'
    : 'el-input el-input--prefix el-input--suffix el-date-editor el-date-editor--month el-tooltip__trigger el-tooltip__trigger',
  {
    'is-disabled': enhProps.disabled,
    [`el-input--${enhProps.size}`]: true,
  },
  enhAttrs.class,
]))

const isMouseIn = ref(false)

const inputRef = ref<HTMLInputElement>()

defineExpose({
  input: inputRef,
})
</script>

<template>
  <div
    v-bind="{
      ...enhAttrs,
      class: wrapperClasses,
    }"
    @mouseenter="isMouseIn = true"
    @mouseleave="isMouseIn = false"
  >
    <template v-if="enhIsRange">
      <template v-if="enhProps.prefixIcon">
        <i class="el-icon el-input__icon el-range__icon">
          <component :is="enhProps.prefixIcon" />
        </i>
      </template>

      <input
        ref="inputRef"
        :value="value[0]"
        :placeholder="enhProps.startPlaceholder"
        :readonly="!enhProps.editable || enhProps.readonly || enhProps.disabled"
        class="el-range-input"
        autocomplete="off"
        tabindex="0"
        type="text"
        @change="value = ([$event, 0] as any)"
      >
      <span class="el-range-separator">{{ enhProps.rangeSeparator }}</span>

      <input
        :value="value[1]"
        :placeholder="enhProps.endPlaceholder"
        :readonly="!enhProps.editable || enhProps.readonly || enhProps.disabled"
        class="el-range-input"
        autocomplete="off"
        tabindex="0"
        type="text"
        @change="value = ([$event, 1] as any)"
      >

      <template v-if="enhProps.clearable && enhProps.clearIcon">
        <i
          class="el-icon el-input__icon el-range__close-icon"
          :class="{ 'el-range__close-icon--hidden': !(isMouseIn && (value[0].length || value[1].length) && !enhProps.readonly && !enhProps.disabled) }"
          @click="value = ([''] as any)"
        >
          <component :is="enhProps.clearIcon" />
        </i>
      </template>
    </template>

    <template v-else>
      <div
        class="el-input__wrapper"
      >
        <span
          v-if="enhProps.prefixIcon"
          class="el-input__prefix"
        >
          <span class="el-input__prefix-inner">
            <i class="el-icon el-input__icon el-range__icon">
              <component :is="enhProps.prefixIcon" />
            </i>
          </span>
        </span>
        <input
          ref="inputRef"
          :value="value"
          :placeholder="enhProps.placeholder"
          :readonly="!enhProps.editable || enhProps.readonly || enhProps.disabled"
          class="el-input__inner"
          autocomplete="off"
          tabindex="0"
          type="text"
          @change="value = ([$event, 0] as any)"
        >
        <span
          v-if="enhProps.clearable && enhProps.clearIcon"
          class="el-input__suffix"
        >
          <span class="el-input__suffix-inner">
            <i
              v-if="(isMouseIn && value.length && !enhProps.readonly && !enhProps.disabled)"
              class="el-icon el-input__icon el-range__close-icon"
              @click="value = ([''] as any)"
            >
              <component :is="enhProps.clearIcon" />
            </i>
          </span>
        </span>
      </div>
    </template>
  </div>
</template>
