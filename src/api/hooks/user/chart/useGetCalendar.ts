import { fetchInstance } from '@/api/instance/instance'
import { Calendar, CalendarResponseData } from './types'

export const getCalendarData = async (recipientId: number, role: string): Promise<Calendar[]> => {
  const response = await fetchInstance.get<CalendarResponseData>(
    `/v1/${role}/chart/recipient?recipient-id=${recipientId}`,
  )

  return response.data.response
}
