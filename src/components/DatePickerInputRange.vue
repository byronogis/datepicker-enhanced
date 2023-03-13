<script setup lang="ts">
import { computed, inject } from 'vue'
import type { Component, StyleValue } from 'vue'

const props = defineProps<{
  modelValue: string[]
  placeholder: string[]
  prefixIcon: Component
  rangeSeparator: string
}>()

const emits = defineEmits(['update:modelValue'])

const PrefixIcon = props.prefixIcon

const style = inject<StyleValue>('style')

const startValue = computed(() => props.modelValue[0])
const endValue = computed(() => props.modelValue[1])

const updateValue = (e: any, index: number) => {
  emits('update:modelValue', index, e?.target?.value ?? '')
}
</script>

<template>
  <div
    class="el-date-editor el-date-editor--monthrange el-input__wrapper el-range-editor el-tooltip__trigger el-tooltip__trigger"
    :style="style"
  >
    <template v-if="props.prefixIcon">
      <i class="el-icon el-input__icon el-range__icon">
        <PrefixIcon />
      </i>
    </template>

    <input
      :value="startValue"
      :placeholder="props.placeholder[0]"
      class="el-range-input"
      autocomplete="off"
      tabindex="0"
      type="text"
      @change="updateValue($event, 0)"
    >
    <span class="el-range-separator">{{ props.rangeSeparator }}</span>

    <input
      :value="endValue"
      :placeholder="props.placeholder[1]"
      class="el-range-input"
      autocomplete="off"
      tabindex="0"
      type="text"
      @change="updateValue($event, 1)"
    >

    <!-- <template v-if="props.clearIcon">
      <i class="el-icon el-input__icon el-range__close-icon el-range__close-icon--hidden">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512z"
          />
          <path fill="currentColor" d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z" />
        </svg>
      </i>
    </template> -->
  </div>
</template>
