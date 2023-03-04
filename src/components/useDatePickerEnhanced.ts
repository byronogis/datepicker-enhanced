/* eslint-disable import/order */
import { computed, reactive, ref, watch } from 'vue'
import { dateUnifiedParse, dateUnify } from './utils'
import type { DateModelType } from 'element-plus'
import type {
  DatePickerEnhancedProps,
  DatePickerPanelItem,
  DatePickerPanelType,
  PopoverProps,
} from './types'

interface PointDatePickerEnhancedProps extends Pick<DatePickerEnhancedProps, 'popperClass' | 'placeholder' | 'type'> {
  modelValue: DateModelType
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
  props: Required<PointDatePickerEnhancedProps>,
  emits: any,
  // existPopover?: PopoverProps,
) {
  const type = props.type.replace('range', '') as DatePickerPanelType
  const localModelValue = computed(() => {
    const { test, exec } = valiDate(type, dateUnify(props.modelValue, type) as string)
    return (test && exec && exec.slice(1, 3).map(Number)) || [new Date().getFullYear(), 1]
  })
  //

  // const popover = existPopover || usePopover(props)
  const popover = usePopover(props)

  // input ref
  const inputValue = computed(() => dateUnify(props.modelValue, type) as string)
  const inputPlaceholder = computed(() => props.placeholder)

  // input method
  const inputValueUpdate = (val: string) => {
    const { test, exec } = valiDate(type, val)
    test && exec && emits('update:modelValue', dateUnifiedParse(val, type))
  }

  // panel ref
  const panelValue = ref<number[]>([...localModelValue.value]) // 操作所用; 重点：解构; 侦听再赋值
  const panelType = ref<DatePickerPanelType>(type)
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
      return
    }

    if (panelIsYear.value && type !== 'year') {
      panelValue.value[0] = item.year
      panelType.value = type
    } else {
      const value = [item.year, item[type]] as number[]
      const dateStr = generateDateStr(type, value)
      valiDate(type, dateStr).test && (panelValue.value = value)
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

    const dateParsed = dateUnifiedParse(generateDateStr(type, panelValue.value), type)

    emits('update:modelValue', dateParsed)
    popover.visible = false

    generateItems()
  })

  // 传入数据值变动时同步改变面板值, 以打开后最新状态
  watch(() => localModelValue.value, () => {
    // 单独改变元素而非直接改变数组,阻止循环侦听
    panelValue.value[0] = localModelValue.value[0]
    panelValue.value[1] = localModelValue.value[1]
    generateItems()
  })

  // 生成面板项目
  function generateItems() {
    panelItems.value = initPanelItems(
      panelType.value,
      panelYear.value,
      panelStartYear.value,
      localModelValue.value,
    )
  }

  // 立即生成
  generateItems()

  return {
    popover,
    inputValue,
    inputPlaceholder,
    inputValueUpdate,
    panelTitle,
    panelItems,
    panelPrevClick,
    panelNextClick,
    panelItemClick,
    panelTitleClick,
  }
}

function generateDateStr(type: DatePickerPanelType, value: number[]) {
  return `${value[0]}-${dateSymbol[type]}${value[1]}`
}

// 验证日期格式是否符合预期
function valiDate(dateType: DatePickerPanelType, dateStr: string) {
  const dateReg = new RegExp(`^(\\d{4})-${dateSymbol[dateType]}(\\d)$`)
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
      }
    })
  } else {
    items = []
  }

  // datepicker.viewItems = list
  return items
}
