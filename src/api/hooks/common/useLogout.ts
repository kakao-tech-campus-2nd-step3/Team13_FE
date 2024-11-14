import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchInstance } from '@/api/instance/instance'

export const useLogout = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await fetchInstance.post(
        '/v1/auth/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        },
      )
    },
    onSuccess: () => {
      localStorage.clear()
      queryClient.clear()
      navigate('/')
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return () => logoutMutation.mutate()
}
