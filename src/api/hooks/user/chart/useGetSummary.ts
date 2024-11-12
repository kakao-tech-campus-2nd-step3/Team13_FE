import { useQuery } from '@tanstack/react-query'
import { getCalendar } from './chartApi'

export const getCalendarData = async () =>
  useQuery({
    queryKey: ['recipients'],
    queryFn: getCalendar,
  })
