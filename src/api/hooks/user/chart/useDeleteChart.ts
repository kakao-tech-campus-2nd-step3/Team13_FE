import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { deleteChart } from './chartApi'
import { useNavigate } from 'react-router-dom'

export const useDeleteChart = () => {
  const navigate = useNavigate()
  const { mutate } = useMutation<AxiosResponse, AxiosError, number>({
    mutationFn: deleteChart,
    onSuccess: () => {
      alert('삭제가 완료되었습니다.')
      navigate('/calendar')
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return { mutate }
}
