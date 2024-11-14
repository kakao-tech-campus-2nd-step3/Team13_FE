import { useMutation } from '@tanstack/react-query'
import { updateCareWorker } from './careWorkerApi'
import { CareWorker, UpdateCareWorkerData } from './types'
import { AxiosError, AxiosResponse } from 'axios'

export const useUpdateCareWorker = () => {
  const { mutate } = useMutation<
    AxiosResponse<CareWorker>,
    AxiosError,
    { careworkerId: number; updatedData: UpdateCareWorkerData }
  >({
    mutationFn: ({ careworkerId, updatedData }) => updateCareWorker(careworkerId, updatedData),
    onSuccess: () => {
      alert('요양보호사 정보가 업데이트되었습니다.')
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return { mutate }
}
