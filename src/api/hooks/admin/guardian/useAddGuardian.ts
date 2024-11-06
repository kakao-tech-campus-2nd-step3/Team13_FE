import { useMutation } from '@tanstack/react-query'
import { addGuardian } from './guardianApi'
import { Guardian } from './types'
import { AxiosError, AxiosResponse } from 'axios'

export const useAddGuardian = () => {
  const { mutate } = useMutation<AxiosResponse, AxiosError, Partial<Guardian>>({
    mutationFn: addGuardian,
    onSuccess: () => {
      alert('보호자가 등록되었습니다.')
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return { mutate }
}
