import { useMutation } from '@tanstack/react-query'
import { fetchInstance } from '@/api/instance/instance'
import { AxiosError, AxiosResponse } from 'axios'

export const useExcelUpload = (url: string) => {
  const mutation = useMutation<AxiosResponse, AxiosError, File>({
    mutationFn: async (file) => {
      const formData = new FormData()
      formData.append('file', file)

      return await fetchInstance.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    onSuccess: () => {
      alert('엑셀 파일이 성공적으로 업로드되었습니다.')
      window.location.reload()
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const isLoading = mutation.status === 'pending'

  return {
    uploadExcel: mutation.mutate,
    isLoading,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  }
}
