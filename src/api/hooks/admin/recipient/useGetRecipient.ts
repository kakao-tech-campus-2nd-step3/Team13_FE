import { useQuery } from '@tanstack/react-query'
import { getRecipients } from './recipientApi'

export const useGetRecipients = () =>
  useQuery({
    queryKey: ['recipients'],
    queryFn: getRecipients,
  })
