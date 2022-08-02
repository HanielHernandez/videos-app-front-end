import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
export const getDaysFromNow = (date: Date | string): string => {
	return dayjs(date).fromNow()
}
