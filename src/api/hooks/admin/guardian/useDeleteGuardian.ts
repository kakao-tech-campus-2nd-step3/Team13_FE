import { useMutation } from '@tanstack/react-query'
import { deleteGuardian } from './guardianApi'
import { AxiosError, AxiosResponse } from 'axios'

export const useDeleteGuardian = () => {
  const { mutate } = useMutation<AxiosResponse, AxiosError, number>({
    mutationFn: deleteGuardian,
    onSuccess: () => {
      alert('보호자가 삭제되었습니다.')
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return { mutate }
}
