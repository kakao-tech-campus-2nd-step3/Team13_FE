import { useEffect, useState } from 'react'

import { fetchInstance } from '@/api/instance/instance'
import { ChartData } from '@/types/types'

export type ChartResponseData = {
  data: ChartData[]
}

const postChartPath = () => `/v1/careworker/chart`

export const postChart = async () => {
  const response = await fetchInstance.post<ChartResponseData>(postChartPath())
  return response.data
}

export const useGetRankingProducts = () => {
  const [data, setData] = useState<ChartResponseData | undefined>()
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(false)
        const response = await postChart()

        setData(response)
        setLoading(false)
      } catch {
        setError(true)
        setData(undefined)
      }
    }

    fetchData()
  }, [])

  return {
    data,
    isLoading,
    isError,
  }
}
