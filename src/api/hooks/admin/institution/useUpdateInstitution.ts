import { useMutation } from '@tanstack/react-query'
import { updateInstitution } from './institutionApi'
import { Institution, UpdateInstitutionData } from './types'
import { AxiosError, AxiosResponse } from 'axios'

export const useUpdateInstitution = () => {
  const { mutate } = useMutation<AxiosResponse<Institution>, AxiosError, UpdateInstitutionData>({
    mutationFn: (updatedData) => updateInstitution(updatedData.id, updatedData),
    onSuccess: () => {
      alert('요양원 정보가 업데이트되었습니다.')
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return { mutate }
}
