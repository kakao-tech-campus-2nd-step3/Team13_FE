import { useMutation } from '@tanstack/react-query'
import { deleteCareWorker } from './careWorkerApi'
import { AxiosError, AxiosResponse } from 'axios'

export const useDeleteCareWorker = () => {
  const { mutate } = useMutation<AxiosResponse, AxiosError, number>({
    mutationFn: deleteCareWorker,
    onSuccess: () => {
      alert('요양보호사가 삭제되었습니다.')
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return { mutate }
}
