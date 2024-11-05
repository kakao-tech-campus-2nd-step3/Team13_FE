import { fetchInstance } from '@/api/instance/instance'
import { QueryClient } from '@tanstack/react-query'

// Function to handle login and store tokens
export const AuthProvider = async (role: string, userId: string, password: string) => {
  const endpoint = `/v1/auth/login/${role}`

  try {
    const response = await fetchInstance.post(endpoint, { userId, password })
    const { accessToken, refreshToken } = response.data

    // Store tokens in localStorage
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)

    return response.data
  } catch (error) {
    console.error('Error during login:', error)
    throw error
  }
}

// Set up Axios interceptor for automatic token renewal
fetchInstance.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem('accessToken')

    // Check if the token is expired and renew if necessary
    if (!accessToken || tokenIsExpired(accessToken)) {
      accessToken = await renewTokens()
    }

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

// Utility function to check token expiration
function tokenIsExpired(token: string): boolean {
  const payload = JSON.parse(atob(token.split('.')[1]))
  return payload.exp * 1000 < Date.now()
}

// Function for renewing tokens if accessToken is expired
export const renewTokens = async (): Promise<string> => {
  const refreshToken = localStorage.getItem('refreshToken')
  if (!refreshToken) {
    throw new Error('No refresh token available')
  }

  try {
    const response = await fetchInstance.post('/v1/auth/renew', { request: refreshToken })
    const { accessToken, refreshToken: newRefreshToken } = response.data

    // Update tokens in localStorage
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', newRefreshToken)

    return accessToken
  } catch (error) {
    console.error('Error renewing tokens:', error)
    throw error
  }
}

// Export the QueryClient with default options
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
