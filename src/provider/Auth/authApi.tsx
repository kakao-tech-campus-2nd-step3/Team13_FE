import { fetchInstance } from '@/api/instance/instance'
import type { UserResponseData } from './types'

export const AuthProvider = async (
  role: string,
  userInfo: { userId: string; password: string },
) => {
  const endpoint = `/v1/auth/login/${role}`

  try {
    const response = await fetchInstance.post<UserResponseData>(endpoint, userInfo)
    const { accessToken, refreshToken } = response.data

    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)

    return response.data
  } catch (error) {
    console.error('Error during login:', error)
    throw error
  }
}

export const renewTokens = async (): Promise<string> => {
  const refreshToken = localStorage.getItem('refreshToken')
  if (!refreshToken) throw new Error('No refresh token available')

  try {
    const response = await fetchInstance.post<UserResponseData>('/v1/auth/renew', {
      request: refreshToken,
    })
    const { accessToken, refreshToken: newRefreshToken } = response.data

    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', newRefreshToken)

    return accessToken
  } catch (error) {
    console.error('Error renewing tokens:', error)
    throw error
  }
}

// Utility function to check token expiration
export function tokenIsExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000 < Date.now()
  } catch (error) {
    console.error('Token parsing failed', error)
    return true // Treat as expired if there's an error
  }
}
