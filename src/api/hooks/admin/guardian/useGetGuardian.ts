import { useQuery } from '@tanstack/react-query'
import { getGuardians } from './guardianApi'

export const useGetGuardians = () =>
  useQuery({
    queryKey: ['guardians'],
    queryFn: getGuardians,
  })
