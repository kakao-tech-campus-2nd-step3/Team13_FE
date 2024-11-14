import { useQuery } from '@tanstack/react-query'
import { getCareWorkers } from './careWorkerApi'

export const useGetCareWorkers = () =>
  useQuery({
    queryKey: ['careWorkers'],
    queryFn: getCareWorkers,
  })
