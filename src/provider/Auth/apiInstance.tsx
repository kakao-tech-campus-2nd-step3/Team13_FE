import { fetchInstance } from '@/api/instance/instance'
import { renewTokens, tokenIsExpired } from './authApi'

const apiInstance = fetchInstance

// Interceptor to attach token and handle renewal
apiInstance.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem('accessToken')

    // Check if the token is expired or missing
    if (!accessToken || tokenIsExpired(accessToken)) {
      try {
        accessToken = await renewTokens() // Renew token if necessary
      } catch (error) {
        console.error('Token renewal failed', error)
        return Promise.reject(error) // Reject if renewal fails
      }
    }

    // Attach the valid access token
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

export default apiInstance
