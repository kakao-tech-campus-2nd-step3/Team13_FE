import fetchInstance from '@/api/instance/instance'
import { Calendar, CalendarResponseData, Chart, ChartResponseData } from './types'
const role = localStorage.getItem('role')

const chartPath = `/v1/${role}/chart`
const summaryPath = `/v1/${role}/chart/recipient`

export const addRecipient = async (newRecipient: Partial<Chart>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, isNew, ...recipientData } = newRecipient
  return await fetchInstance.post(chartPath, recipientData)
}

export const getRecipients = async (): Promise<Chart[]> => {
  const response = await fetchInstance.get<ChartResponseData>(chartPath)
  return response.data.response
}

export const getCalendar = async (): Promise<Calendar[]> => {
  const response = await fetchInstance.get<CalendarResponseData>(summaryPath)
  return response.data.response
}

export const deleteChart = async (chartId: number) => {
  return await fetchInstance.delete(`${chartPath}/${chartId}`)
}
