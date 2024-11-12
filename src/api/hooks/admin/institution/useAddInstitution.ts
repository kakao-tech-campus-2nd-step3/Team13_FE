import { useMutation } from '@tanstack/react-query'
import { addInstitution } from './institutionApi'
import { Institution } from './types'
import { AxiosError, AxiosResponse } from 'axios'

export const useAddInstitution = () => {
  const { mutate } = useMutation<AxiosResponse, AxiosError, Partial<Institution>>({
    mutationFn: addInstitution,
    onSuccess: () => {
      alert('요양원이 등록되었습니다.')
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return { mutate }
}
