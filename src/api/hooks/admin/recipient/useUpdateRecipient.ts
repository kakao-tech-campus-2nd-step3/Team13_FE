import { useMutation } from '@tanstack/react-query'
import { updateRecipient } from './recipientApi'
import { Recipient, UpdateRecipientData } from './types'
import { AxiosError, AxiosResponse } from 'axios'

export const useUpdateRecipient = () => {
  const { mutate } = useMutation<
    AxiosResponse<Recipient>,
    AxiosError,
    { recipientId: number; updatedData: UpdateRecipientData }
  >({
    mutationFn: ({ recipientId, updatedData }) => updateRecipient(recipientId, updatedData),
    onSuccess: () => {
      alert('돌봄대상자 정보가 업데이트되었습니다.')
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return { mutate }
}
