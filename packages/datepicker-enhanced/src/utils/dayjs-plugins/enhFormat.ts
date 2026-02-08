import type { PluginFunc } from 'dayjs'

const enhFormat: PluginFunc = (_option, dayjsClass) => {
  const oldFormat = dayjsClass.prototype.format
  const REGEX = /(\[[^\]]+\])|HY|QY/g

  dayjsClass.prototype.format = function format(formatStr?: string): string {
    if (!formatStr || !REGEX.test(formatStr)) {
      return oldFormat.call(this, formatStr)
    }

    const month = this.month() + 1
    const halfYear = month <= 6 ? 1 : 2
    const quarterYear = Math.ceil(month / 3)
    const nextFormat = formatStr.replace(REGEX, (match, bracketed) => {
      if (bracketed) {
        return bracketed
      }

      switch (match) {
        case 'HY':
          return String(halfYear)
        case 'QY':
          return String(quarterYear)
        default:
          return match
      }
    })

    return oldFormat.call(this, nextFormat as any)
  }
}

export default enhFormat
