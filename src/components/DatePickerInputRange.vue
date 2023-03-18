<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import type { Component, StyleValue } from 'vue'

const props = defineProps<{
  modelValue: string[]
  clearable: boolean
  placeholder: string[]
  prefixIcon: Component | null
  clearIcon: Component | null
  rangeSeparator: string
}>()

const emits = defineEmits(['update:modelValue'])

const PrefixIcon = props.prefixIcon
const ClearIcon = props.clearIcon

const style = inject<StyleValue>('style')
const editable = inject<boolean>('editable')
const readonly = inject<boolean>('readonly')
const disabled = inject<boolean>('disabled')

const startValue = computed(() => props.modelValue[0])
const endValue = computed(() => props.modelValue[1])

const updateValue = (e: any, index?: number) => {
  emits('update:modelValue', e?.target?.value ?? '', index ?? -1)
}

const isMouseIn = ref(false)

const inputRef = ref<HTMLInputElement | null>(null)

defineExpose({
  input: inputRef,
})
</script>

<template>
  <div
    class="el-date-editor el-date-editor--monthrange el-input__wrapper el-range-editor el-tooltip__trigger el-tooltip__trigger"
    :class="{
      'is-disabled': disabled,
    }"
    :style="style"
    @mouseenter="isMouseIn = true"
    @mouseleave="isMouseIn = false"
  >
    <template v-if="props.prefixIcon">
      <i class="el-icon el-input__icon el-range__icon">
        <PrefixIcon />
      </i>
    </template>

    <input
      ref="inputRef"
      :value="startValue"
      :placeholder="props.placeholder[0]"
      :readonly="!editable || readonly || disabled"
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
      :readonly="!editable || readonly || disabled"
      class="el-range-input"
      autocomplete="off"
      tabindex="0"
      type="text"
      @change="updateValue($event, 1)"
    >

    <template v-if="props.clearable && props.clearIcon">
      <i
        class="el-icon el-input__icon el-range__close-icon"
        :class="{ 'el-range__close-icon--hidden': !(isMouseIn && (startValue.length || endValue.length) && !readonly && !disabled) }"
        @click="updateValue('')"
      >
        <ClearIcon />
      </i>
    </template>
  </div>
</template>
