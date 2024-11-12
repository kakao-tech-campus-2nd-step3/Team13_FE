import { fetchInstance } from '@/api/instance/instance'
import { renewTokens, tokenIsExpired } from './authApi'

const apiInstance = fetchInstance

apiInstance.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem('accessToken')

    if (!accessToken || tokenIsExpired(accessToken)) {
      try {
        accessToken = await renewTokens()
      } catch (error) {
        console.error('Token renewal failed', error)
        return Promise.reject(error)
      }
    }

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

export default apiInstance
