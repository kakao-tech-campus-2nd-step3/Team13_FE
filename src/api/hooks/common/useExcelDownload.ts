import { useQuery } from '@tanstack/react-query'
import { fetchInstance } from '@/api/instance/instance'
import { useCallback, useEffect } from 'react'
import { AxiosResponse, AxiosError } from 'axios'

export const useExcelDownload = (url: string) => {
  const downloadExcel = useCallback(() => {
    return fetchInstance.get(url, { responseType: 'blob' })
  }, [url])

  const { refetch, isFetching, isSuccess, data, isError, error } = useQuery<
    AxiosResponse,
    AxiosError
  >({
    queryKey: ['excelDownload', url],
    queryFn: downloadExcel,
    enabled: false,
  })

  useEffect(() => {
    if (isSuccess && data) {
      const urlObject = window.URL.createObjectURL(new Blob([data.data]))
      const link = document.createElement('a')
      link.href = urlObject
      link.setAttribute('download', 'template.xlsx')
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(urlObject)
    }
  }, [isSuccess, data])

  useEffect(() => {
    if (isError && error) {
      console.error(error)
    }
  }, [isError, error])

  return { refetch, isFetching }
}
