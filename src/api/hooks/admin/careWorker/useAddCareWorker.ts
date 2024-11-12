import { useMutation } from '@tanstack/react-query'
import { addCareWorker } from './careWorkerApi'
import { CareWorker } from './types'
import { AxiosError, AxiosResponse } from 'axios'

export const useAddCareWorker = () => {
  const { mutate } = useMutation<AxiosResponse, AxiosError, Partial<CareWorker>>({
    mutationFn: addCareWorker,
    onSuccess: () => {
      alert('요양보호사가 등록되었습니다.')
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return { mutate }
}
