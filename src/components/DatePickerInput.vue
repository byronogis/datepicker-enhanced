<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import type { Component, StyleValue } from 'vue'

const props = defineProps<{
  modelValue: string
  clearable: boolean
  placeholder: string
  prefixIcon: Component | null
  clearIcon: Component | null
}>()

const emits = defineEmits(['update:modelValue'])

const PrefixIcon = props.prefixIcon
const ClearIcon = props.clearIcon

const style = inject<StyleValue>('style')
const editable = inject<boolean>('editable')
const readonly = inject<boolean>('readonly')
const disabled = inject<boolean>('disabled')

const value = computed(() => props.modelValue)

const updateValue = (e: any, index?: number) => {
  emits('update:modelValue', e?.target?.value ?? '', index ?? -1)
}

const isMouseIn = ref(false)

const inputRef = ref<HTMLInputElement | null>(null)

defineExpose({
  input: inputRef,
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div
    class="el-input el-input--prefix el-input--suffix el-date-editor el-date-editor--month el-tooltip__trigger el-tooltip__trigger"
    :class="{
      'is-disabled': disabled,
    }"
    :style="style"
    @mouseenter="isMouseIn = true"
    @mouseleave="isMouseIn = false"
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
      <input
        ref="inputRef"
        :value="value"
        :placeholder="props.placeholder"
        :readonly="!editable || readonly || disabled"
        class="el-input__inner"
        autocomplete="off"
        tabindex="0"
        type="text"
        @change="updateValue($event, 0)"
      >
      <span
        v-if="props.clearable && props.clearIcon"
        class="el-input__suffix"
      >
        <span class="el-input__suffix-inner">
          <i
            v-if="(isMouseIn && value.length && !readonly && !disabled)"
            class="el-icon el-input__icon el-range__close-icon"
            @click="updateValue('')"
          >
            <ClearIcon />
          </i>
        </span>
      </span>
    </div>
  </div>
</template>
