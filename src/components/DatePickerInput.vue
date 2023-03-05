<script setup lang="ts">
import { inject, ref } from 'vue'
import type { Component, StyleValue } from 'vue'

const props = defineProps<{
  value: string
  placeholder: string
  prefixIcon: Component

  // range extra
  // startValue?: string[]
  // startPlaceholder?: string
  // endValue?: string[]
  // endPlaceholder?: string
  // separator?: string
}>()

const emits = defineEmits(['update:value'])

const PrefixIcon = props.prefixIcon

const inputFocus = ref(false)

const inputFocusUpdate = (status: boolean) => inputFocus.value = status

defineExpose({
  focus: inputFocus,
})

const style = inject<StyleValue>('style')
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div
    class="el-input el-input--prefix el-input--suffix el-date-editor el-date-editor--month el-tooltip__trigger el-tooltip__trigger"
    :style="style"
  >
    <div
      class="el-input__wrapper"
    >
      <span
        v-if="props.prefixIcon"
        class="el-input__prefix"
      >
        <span class="el-input__prefix-inner">
          <i class="el-icon el-input__icon el-range__icon">
            <PrefixIcon />
          </i>
        </span>
      </span>
      <!-- 使用 click 而不是 focus
        防止选择完成后 datepicker_clickViewItem 把弹出层 visible 设为 false
        但因为焦点回到输入框后导致的 visible 重新设为 true 而致使弹出层不消失
      -->
      <input
        autocomplete="off"
        name=""
        tabindex="0"
        class="el-input__inner"
        type="text"
        :value="props.value"
        :placeholder="props.placeholder"
        @change="(e: any) => emits('update:value', e.target?.value ?? '')"
        @click="inputFocusUpdate(true)"
        @blur="inputFocusUpdate(false)"
      >
      <span
        class="el-input__suffix"
      >
        <span
          class="el-input__suffix-inner"
        />
      </span>
    </div>
  </div>
</template>
