import { useQuery } from '@tanstack/react-query'
import { getInstitutions } from './institutionApi'

export const useGetInstitutions = () =>
  useQuery({
    queryKey: ['institutions'],
    queryFn: getInstitutions,
  })
