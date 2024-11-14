import { useQuery } from '@tanstack/react-query'
import { fetchInstance } from '@/api/instance/instance'

export interface OCRResponse {
  text: string
}

export const usePerformOCR = (objectKey: string) => {
  return useQuery({
    queryKey: ['performOCR', objectKey],
    queryFn: async () => {
      const response = await fetchInstance.get(
        `/v1/ocr/chart/perform?objectKey=${encodeURIComponent(objectKey)}`,
      )
      return response.data
    },
    enabled: !!objectKey,
  })
}
