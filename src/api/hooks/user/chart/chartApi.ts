import { Calendar, CalendarResponseData, Chart, ChartResponseData } from './types'
import apiInstance from '@/provider/Auth/apiInstance'

const role = localStorage.getItem('role')

const chartPath = `/v1/${role}/chart`
const summaryPath = `/v1/${role}/chart/recipient`

export const addRecipient = async (newRecipient: Partial<Chart>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, isNew, ...recipientData } = newRecipient
  return await apiInstance.post(chartPath, recipientData)
}

export const getRecipients = async (): Promise<Chart[]> => {
  const response = await apiInstance.get<ChartResponseData>(chartPath)
  return response.data.response
}

export const getCalendar = async (): Promise<Calendar[]> => {
  const response = await apiInstance.get<CalendarResponseData>(summaryPath)
  return response.data.response
}
