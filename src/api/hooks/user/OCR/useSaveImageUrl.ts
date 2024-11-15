import { useMutation } from '@tanstack/react-query'
import { fetchInstance } from '@/api/instance/instance'

export const useSaveImageUrl = () => {
  return useMutation({
    mutationFn: (objectKey: string) =>
      fetchInstance.post(`/v1/s3/chart/save-image-url?objectKey=${encodeURIComponent(objectKey)}`),
  })
}
