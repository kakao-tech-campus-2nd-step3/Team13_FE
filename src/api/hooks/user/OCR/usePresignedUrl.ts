import { useQuery } from '@tanstack/react-query'
import { fetchInstance } from '@/api/instance/instance'

export const usePresignedUrl = (objectKey: string) => {
  return useQuery({
    queryKey: ['presignedUrl', objectKey],
    queryFn: async () => {
      const response = await fetchInstance.get(
        `/v1/s3/chart/generate-url?objectKey=${encodeURIComponent(objectKey)}`,
      )
      return response.data
    },
    enabled: !!objectKey,
  })
}
