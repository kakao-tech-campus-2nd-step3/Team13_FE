import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import fetchInstance from '@/api/instance/instance'
import { useCallback } from 'react'
import { CareWorkerResponse, GuardianResponse } from './types'
import { AxiosResponse } from 'axios'

type UserResponse = CareWorkerResponse | GuardianResponse

const getUserInfo = async (role: string): Promise<UserResponse> => {
  const endpoint = role === 'careworker' ? '/v1/careworker' : '/v1/guardian'
  const response = await fetchInstance.get(endpoint)
  return response.data.response
}

export const useUserInfo = () => {
  const role = localStorage.getItem('role') || 'careworker'
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['userInfo', role],
    queryFn: () => getUserInfo(role),
    enabled: !!role,
  })

  const updateUserInfo = useCallback(
    async (updatedData: Partial<UserResponse>) => {
      const endpoint = role === 'careworker' ? '/v1/careworker' : '/v1/guardian'
      return await fetchInstance.put(endpoint, updatedData)
    },
    [role],
  )

  const mutation = useMutation<AxiosResponse, Error, Partial<UserResponse>>({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userInfo', role],
      })
    },
  })

  return { data, isLoading, isError, updateUserInfo: mutation.mutate }
}
