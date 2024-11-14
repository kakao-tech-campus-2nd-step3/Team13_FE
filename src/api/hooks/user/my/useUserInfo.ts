import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { CareWorkerResponse, GuardianResponse } from './types'
import { getUserInfo, updateUserInfo } from './userInfoApi'

type UserResponse = CareWorkerResponse | GuardianResponse

export const useUserInfo = () => {
  const role = localStorage.getItem('role') || 'careworker'
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['userInfo', role],
    queryFn: getUserInfo,
    enabled: !!role,
  })

  const mutation = useMutation<AxiosResponse, Error, Partial<UserResponse>>({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo', role] })
      alert('정보가 성공적으로 수정되었습니다.')
    },
    onError: () => {
      alert('정보 수정에 실패했습니다.')
    },
  })

  return { data, isLoading, isError, updateUserInfo: mutation.mutate }
}
