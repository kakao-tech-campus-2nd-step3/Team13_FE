import { fetchInstance } from '@/api/instance/instance'
import { Calendar, CalendarResponseData } from './types'

const role = localStorage.getItem('role')

const getCalendarPath = `/v1/${role}/chart/recipient`

export const getCalendarData = async (recipientId: number): Promise<Calendar[]> => {
  console.log(recipientId)
  const response = await fetchInstance.get<CalendarResponseData>(
    `${getCalendarPath}?recipient-id=${recipientId}`,
  )

  return response.data.response
}
