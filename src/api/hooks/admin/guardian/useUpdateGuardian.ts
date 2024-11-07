import { useMutation } from '@tanstack/react-query'
import { updateGuardian } from './guardianApi'
import { Guardian, UpdateGuardianData } from './types'
import { AxiosError, AxiosResponse } from 'axios'

export const useUpdateGuardian = () => {
  const { mutate } = useMutation<
    AxiosResponse<Guardian>,
    AxiosError,
    { guardianId: number; updatedData: UpdateGuardianData }
  >({
    mutationFn: ({ guardianId, updatedData }) => updateGuardian(guardianId, updatedData),
    onSuccess: () => {
      alert('보호자 정보가 업데이트되었습니다.')
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return { mutate }
}
