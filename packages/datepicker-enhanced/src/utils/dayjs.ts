import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import enhFormat from './dayjs-plugins/enhFormat.ts'

dayjs.extend(customParseFormat)
dayjs.extend(enhFormat)

export default dayjs
