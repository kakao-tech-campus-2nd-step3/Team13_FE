import axios from 'axios'
import { renewTokens } from './authApi'

const apiInstance = axios.create({
  baseURL: '/v1',
})

apiInstance.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem('accessToken')

    // Check token expiration, renew if needed
    if (!accessToken || tokenIsExpired(accessToken)) {
      accessToken = await renewTokens()
    }

    // Set the Authorization header
    config.headers['Authorization'] = `Bearer ${accessToken}`

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Utility function to check token expiration
function tokenIsExpired(token: string) {
  const payload = JSON.parse(atob(token.split('.')[1]))
  return payload.exp * 1000 < Date.now()
}

export default apiInstance
