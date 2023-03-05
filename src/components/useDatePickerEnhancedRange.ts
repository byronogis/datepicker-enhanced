/* eslint-disable prefer-regex-literals */
/* eslint-disable import/order */
import { computed, reactive, ref, watch, watchEffect } from 'vue'
import { dateUnifiedParse, dateUnify } from './utils'
import type { DateModelType } from 'element-plus'
import type {
  DatePickerEnhancedProps,
  DatePickerPanelItem,
  DatePickerPanelType,
  PopoverProps,
  Range,
} from './types'

interface RangeDatePickerEnhancedProps extends Pick<DatePickerEnhancedProps, 'type'> {
  modelValue: [DateModelType, DateModelType]
  disabledDate: (date: Date) => boolean
  popperClass: string
  startPlaceholder: string
  endPlaceholder: string
  rangeSeparator: string
}

const quarteryearEnum = ['一', '二', '三', '四']
const halfyearEnum = ['上', '下']
const dateSymbol = {
  quarteryear: 'Q',
  halfyear: 'H',
  year: 'Y',
}

export function usePopover(props: PopoverProps): Required<PopoverProps> {
  const popover = reactive({
    trigger: 'click',
    placement: 'bottom',
    hideAfter: 0,
    transition: 'el-zoom-in-top',
    visible: false,
    popperClass: props.popperClass,
  })
  return popover as Required<PopoverProps>
}

export default function useDatePickerEnhanced(
  props: RangeDatePickerEnhancedProps,
  emits: any,
  range: Range,
  existPopover?: PopoverProps,
) {
  const typeWithoutRange = props.type.replace('range', '') as DatePickerPanelType
  const localModelValue = ref<number[][]>([])
  const isLocalModelValueEmpty = computed(() => localModelValue.value[range].every(i => i === 0))

  // 避免其中一个面板选择完成时另一个面板重新生成
  watchEffect(() => {
    const newLocalModelValue = props.modelValue.map(date => {
      const { test, exec } = valiDate(typeWithoutRange, dateUnify(date, typeWithoutRange) as string)
      const sliceEndIdx = typeWithoutRange !== 'year' ? 3 : 2
      return (test && exec && exec.slice(1, sliceEndIdx).map(Number))
        || [0, 0]
    })

    if (newLocalModelValue[range]?.join('') === localModelValue.value[range]?.join('')) {
      return
    }

    localModelValue.value = newLocalModelValue
  })

  const popover = existPopover || usePopover(props)

  // input ref
  const inputValue = computed(() => {
    if (isLocalModelValueEmpty.value) {
      return ''
    }

    return dateUnify(props.modelValue[range], typeWithoutRange) as string
  })
  const inputStartPlaceholder = computed(() => props.startPlaceholder)
  const inputEndPlaceholder = computed(() => props.endPlaceholder)

  // input method
  const inputValueUpdate = (val: string) => {
    const newModelValue = props.modelValue.map(date => dateUnifiedParse(dateUnify(date, typeWithoutRange), typeWithoutRange)) as string[]

    if (val === '') {
      newModelValue[range] = ''
      emits('update:modelValue', newModelValue)
      return
    }

    const { test, exec } = valiDate(typeWithoutRange, val)

    if (test && exec) {
      const dateParsed = dateUnifiedParse(generateDateStr(typeWithoutRange, exec.slice(1, 3).map(Number)), typeWithoutRange) as string

      if (range === 0 && new Date(dateParsed).getTime() >= new Date(newModelValue[1]).getTime()) {
        emits('update:modelValue', newModelValue)
        return
      } else if (range === 1 && new Date(dateParsed).getTime() <= new Date(newModelValue[0]).getTime()) {
        emits('update:modelValue', newModelValue)
        return
      }

      newModelValue[range] = dateParsed

      emits('update:modelValue', newModelValue)
    }
  }

  // panel ref
  const getPanelValue = () => {
    if (isLocalModelValueEmpty.value) {
      const anotherValue = range === 1 ? localModelValue.value[0] : localModelValue.value[1]
      const isAnotherValueEmpty = anotherValue.every(i => i === 0)
      if (isAnotherValueEmpty) {
        return [new Date().getFullYear(), 1]
      } else {
        return [...anotherValue]
      }
    } else {
      return [...localModelValue.value[range]]
    }
    // ? [new Date().getFullYear(), 1] : [...localModelValue.value[range]]
  }
  const panelValue = ref<number[]>(getPanelValue()) // 操作所用; 重点：解构; 侦听再赋值
  const panelType = ref<DatePickerPanelType>(typeWithoutRange)
  const panelItems = ref<DatePickerPanelItem[]>([])
  const panelYear = computed(() => panelValue.value[0])
  const panelIsYear = computed(() => panelType.value === 'year')
  const panelStartYear = computed(() => Math.floor(panelYear.value / 10) * 10)
  const panelTitle = computed(() => {
    let title

    switch (panelType.value) {
      case 'year':
        title = `${panelStartYear.value} - ${panelStartYear.value + 9}`
        break

      default:
        title = `${panelYear.value}`
        break
    }

    return title
  })

  // panel method
  const panelPrevClick = () => {
    panelIsYear.value
      ? panelValue.value[0] -= 10
      : panelValue.value[0] -= 1

    generateItems()
  }
  const panelNextClick = () => {
    panelIsYear.value
      ? panelValue.value[0] += 10
      : panelValue.value[0] += 1

    generateItems()
  }
  const panelItemClick = (item: DatePickerPanelItem) => {
    console.log('点击了 ==> ', item)

    if (item.isDisabled) {
      console.log('isDisabled')
      return
    }

    if (panelIsYear.value && typeWithoutRange !== 'year') {
      panelValue.value[0] = item.year
      panelType.value = typeWithoutRange
    } else {
      const value: number[] = []

      value[0] = item.year
      typeWithoutRange !== 'year' && (value[1] = item[typeWithoutRange] as number)

      const dateStr = generateDateStr(typeWithoutRange, value)
      valiDate(typeWithoutRange, dateStr).test && (panelValue.value = value)
    }
  }
  const panelTitleClick = () => {
    if (panelIsYear.value) {
      return
    }

    panelType.value = 'year'
  }

  // 面板类型改变
  watch(() => panelType.value, () => {
    generateItems()
  })

  // 面板值改变时同步改变传入数据值
  watch(() => panelValue.value, (newV, oldV) => {
    console.log('改变了日期 new old: ', newV, oldV)

    const dateParsed = dateUnifiedParse(generateDateStr(typeWithoutRange, panelValue.value), typeWithoutRange)

    const newModelValue = props.modelValue.map(date => dateUnifiedParse(dateUnify(date, typeWithoutRange), typeWithoutRange))
    newModelValue[range] = dateParsed

    emits('update:modelValue', newModelValue)
    // popover.visible = false

    generateItems()
  })

  // 传入数据值变动时同步改变面板值, 以打开后最新状态
  watch(() => localModelValue.value, () => {
    if (isLocalModelValueEmpty.value) {
      return
    }
    // 单独改变元素而非直接改变数组,阻止循环侦听
    panelValue.value[0] = localModelValue.value[range][0]
    typeWithoutRange !== 'year' && (panelValue.value[1] = localModelValue.value[range][1])
    generateItems()
  })

  // 生成面板项目
  function generateItems() {
    panelItems.value = initPanelItems(
      panelType.value,
      panelYear.value,
      panelStartYear.value,
      isLocalModelValueEmpty.value ? panelValue.value : localModelValue.value[range],
      props.disabledDate,
    )
  }

  // 立即生成
  generateItems()

  return {
    popover,
    inputValue,
    inputStartPlaceholder,
    inputEndPlaceholder,
    inputValueUpdate,
    panelTitle,
    panelItems,
    panelPrevClick,
    panelNextClick,
    panelItemClick,
    panelTitleClick,
    panelType,
  }
}

export function generateDateStr(type: DatePickerPanelType, value: number[]) {
  if (type === 'year') {
    return `${value[0]}`
  }

  return `${value[0]}-${dateSymbol[type]}${value[1]}`
}

// 验证日期格式是否符合预期
function valiDate(dateType: DatePickerPanelType, dateStr: string) {
  const dateReg = dateType !== 'year'
    ? new RegExp(`^(\\d{4})-${dateSymbol[dateType]}(\\d)$`)
    : new RegExp('^(\\d{4})$')

  let test = dateReg.test(dateStr)
  const exec = dateReg.exec(dateStr)

  // 判断季度/半年度范围是否符合
  if (test && exec) {
    if (dateType === 'halfyear' && ![1, 2].includes(Number(exec[2]))) {
      test = false
    } else if (dateType === 'quarteryear' && ![1, 2, 3, 4].includes(Number(exec[2]))) {
      test = false
    }
  }

  return {
    test,
    exec,
  }
}

// 生成视图数据
function initPanelItems(
  panelType: DatePickerPanelType,
  panelYear: number,
  panelStartYear: number,
  datepickerValue: number[],
  disabledDate: (date: Date) => boolean,
) {
  let items: DatePickerPanelItem[]

  const curDate = new Date()
  const curYear = curDate.getFullYear()
  const curMonth = curDate.getMonth() + 1
  const curQuarterYear = Math.ceil(curMonth / 3)
  const curHalfYear = Math.ceil(curMonth / 6)

  if (panelType === 'quarteryear') { // 季度
    items = quarteryearEnum.map((cur, idx): DatePickerPanelItem => {
      const year = panelYear
      const quarteryear = idx + 1

      return {
        label: `第${cur}季度`,
        year,
        quarteryear,
        isToday: (year === curYear) && (quarteryear === curQuarterYear),
        isCurrent: (year === datepickerValue[0]) && (quarteryear === datepickerValue[1]),
        isDisabled: disabledDate(new Date(`${year}-${(quarteryear - 1) * 3 + 1}`)),
      }
    })
  } else if (panelType === 'halfyear') { // 半年度
    items = halfyearEnum.map((cur, idx): DatePickerPanelItem => {
      const year = panelYear
      const halfyear = idx + 1

      return {
        label: `${cur}半年`,
        year,
        halfyear,
        isToday: (year === curYear) && (halfyear === curHalfYear),
        isCurrent: (year === datepickerValue[0]) && (halfyear === datepickerValue[1]),
        isDisabled: disabledDate(new Date(`${year}-${(halfyear - 1) * 6 + 1}`)),
      }
    })
  } else if (panelType === 'year') { // 年度
    items = Array(10).fill(1).map((_cur, idx): DatePickerPanelItem => {
      const year = panelStartYear + idx

      return {
        label: `${year}`,
        year,
        isToday: year === curYear,
        isCurrent: year === datepickerValue[0],
        isDisabled: disabledDate(new Date(`${year}`)),
      }
    })
  } else {
    items = []
  }

  // datepicker.viewItems = list
  return items
}
