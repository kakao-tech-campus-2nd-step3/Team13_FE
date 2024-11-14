import { useQuery } from '@tanstack/react-query'
import { fetchInstance } from '@/api/instance/instance'

export interface OCRResponse {
  text: string
}

export const usePerformOCR = (objectKey: string, recipientId: string, options = {}) => {
  return useQuery({
    queryKey: ['performOCR', objectKey, recipientId],
    queryFn: async () => {
      const response = await fetchInstance.get(
        `/v1/ocr/chart/perform?objectKey=${encodeURIComponent(objectKey)}&recipient-id=${encodeURIComponent(recipientId)}`,
      )
      return response.data
    },
    enabled: !!objectKey && !!recipientId,
    ...options,
  })
}
