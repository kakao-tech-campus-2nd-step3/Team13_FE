import { useMutation } from '@tanstack/react-query'
import { deleteInstitution } from './institutionApi'
import { AxiosError, AxiosResponse } from 'axios'

export const useDeleteInstitution = () => {
  const { mutate } = useMutation<AxiosResponse, AxiosError, number>({
    mutationFn: deleteInstitution,
    onSuccess: () => {
      alert('요양원이 삭제되었습니다.')
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return { mutate }
}
