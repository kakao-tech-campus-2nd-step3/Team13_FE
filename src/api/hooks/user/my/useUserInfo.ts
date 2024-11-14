import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { CareWorkerResponse, GuardianResponse } from '@/api/hooks/user/my/types'
import { getUserInfo, updateUserInfo } from '@/api/hooks/user/my/userInfoApi'

type UserResponse = CareWorkerResponse | GuardianResponse

export const useUserInfo = () => {
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery<UserResponse>({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  })

  const mutation = useMutation<AxiosResponse, Error, Partial<UserResponse>>({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] })
    },
  })

  return { data, isLoading, isError, updateUserInfo: mutation.mutate }
}
