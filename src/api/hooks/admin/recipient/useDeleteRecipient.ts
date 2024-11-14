import { useMutation } from '@tanstack/react-query'
import { deleteRecipient } from './recipientApi'
import { AxiosError, AxiosResponse } from 'axios'

export const useDeleteRecipient = () => {
  const { mutate } = useMutation<AxiosResponse, AxiosError, number>({
    mutationFn: deleteRecipient,
    onSuccess: () => {
      alert('돌봄대상자가 삭제되었습니다.')
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return { mutate }
}
