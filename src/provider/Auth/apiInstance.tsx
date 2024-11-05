import { fetchInstance } from '@/api/instance/instance'
import { renewTokens } from './authApi'

const apiInstance = fetchInstance

// Add request interceptor to handle token expiration and renewal
apiInstance.interceptors.request.use(
  async (config) => {
    // Retrieve the access token from localStorage
    let accessToken = localStorage.getItem('accessToken')

    // Check token expiration; renew if needed
    if (!accessToken || tokenIsExpired(accessToken)) {
      try {
        accessToken = await renewTokens()
        localStorage.setItem('accessToken', accessToken) // Save the new token in localStorage
      } catch (error) {
        console.error('Token renewal failed', error)
        return Promise.reject(error) // Reject the request if renewal fails
      }
    }

    // Set the Authorization header with the accessToken
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

// Utility function to check if token has expired
function tokenIsExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000 < Date.now()
  } catch (error) {
    console.error('Token parsing failed', error)
    return true // Treat as expired if there's an error
  }
}

export default apiInstance
