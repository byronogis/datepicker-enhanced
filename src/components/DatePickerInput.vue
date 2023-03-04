<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  value: string
  placeholder: string

  // range extra
  // startValue?: string[]
  // startPlaceholder?: string
  // endValue?: string[]
  // endPlaceholder?: string
  // separator?: string
}>()

const emits = defineEmits(['update:value'])

const inputFocus = ref(false)

const inputFocusUpdate = (status: boolean) => inputFocus.value = status

defineExpose({
  focus: inputFocus,
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div class="el-input el-input--prefix el-input--suffix el-date-editor el-date-editor--month el-tooltip__trigger el-tooltip__trigger">
    <div
      class="el-input__wrapper"
    >
      <span
        class="el-input__prefix"
      >
        <span class="el-input__prefix-inner">
          <i class="el-icon el-input__icon">
            <svg
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M128 384v512h768V192H768v32a32 32 0 1 1-64 0v-32H320v32a32 32 0 0 1-64 0v-32H128v128h768v64H128zm192-256h384V96a32 32 0 1 1 64 0v32h160a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h160V96a32 32 0 0 1 64 0v32zm-32 384h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64z"
              />
            </svg>
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
