import { QueryClient } from '@tanstack/react-query'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'

const initInstance = (config: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 5000,
    ...config,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...config.headers,
    },
  })

  return instance
}

export const fetchInstance = initInstance({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
  },
})
