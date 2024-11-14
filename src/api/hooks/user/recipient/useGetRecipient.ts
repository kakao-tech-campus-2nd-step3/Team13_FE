import { useQuery } from '@tanstack/react-query'
import { getRecipients } from './recipientApi'

export const useGetRecipients = (role: string) =>
  useQuery({
    queryKey: ['recipients', role],
    queryFn: () => getRecipients(role),
  })
