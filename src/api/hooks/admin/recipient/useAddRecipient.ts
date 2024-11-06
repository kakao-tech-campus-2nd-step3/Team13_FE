import { useMutation } from '@tanstack/react-query'
import { addRecipient } from './recipientApi'
import { Recipient } from './types'
import { AxiosError, AxiosResponse } from 'axios'

export const useAddRecipient = () => {
  const { mutate } = useMutation<AxiosResponse, AxiosError, Partial<Recipient>>({
    mutationFn: addRecipient,
    onSuccess: () => {
      alert('돌봄대상자가 등록되었습니다.')
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return { mutate }
}
