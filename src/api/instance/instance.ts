import { renewTokens, tokenIsExpired } from '@/provider/Auth/authApi'
import { QueryClient } from '@tanstack/react-query'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

let isRefreshing = false
let pendingRequests: ((token: string) => void)[] = []

const initInstance = (config: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 15000,
    ...config,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...config.headers,
    },
  })

  instance.interceptors.request.use(
    async (config) => {
      let accessToken = localStorage.getItem('accessToken')
      if (accessToken && !tokenIsExpired(accessToken)) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
        return config
      }

      if (!isRefreshing) {
        isRefreshing = true

        try {
          const newToken = await renewTokens()
          localStorage.setItem('accessToken', newToken)
          pendingRequests.forEach((callback) => callback(newToken))
          pendingRequests = []
        } catch (error) {
          pendingRequests = []
          console.error('Token renewal failed', error)
          return Promise.reject(error)
        } finally {
          isRefreshing = false
        }
      }

      return new Promise((resolve) => {
        pendingRequests.push((token: string) => {
          config.headers['Authorization'] = `Bearer ${token}`
          resolve(config)
        })
      })
    },
    (error) => Promise.reject(error),
  )

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

export default fetchInstance
