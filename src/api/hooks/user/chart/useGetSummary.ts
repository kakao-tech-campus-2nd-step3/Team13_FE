import { fetchInstance } from '@/api/instance/instance'
import { Summary, SummaryResponseData } from './types'

const getSummaryPath = `/v1/chart/summary`

export const getSummaryData = async (chartId: number): Promise<Summary> => {
  const response = await fetchInstance.get<SummaryResponseData>(
    `${getSummaryPath}?chartId=${chartId}`,
  )

  return response.data.response
}
