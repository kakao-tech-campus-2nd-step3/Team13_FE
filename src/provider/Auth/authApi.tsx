import fetchInstance from '@/api/instance/instance'
import { apiInstance } from './apiInstance'
import type { UserResponseData } from './types'

export const AuthProvider = async (
  role: string,
  userInfo: { userId: string; password: string },
) => {
  const endpoint = `/v1/auth/login/${role}`
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  try {
    const response = await apiInstance.post<UserResponseData>(endpoint, userInfo)

    const { accessToken, refreshToken } = response.data
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    return response.data
  } catch (error) {
    console.error('Error during login:', error)
    throw error
  }
}

export const renewTokens = async () => {
  const refreshToken = localStorage.getItem('refreshToken')
  if (!refreshToken) throw new Error('No refresh token available')

  try {
    const response = await fetchInstance.post('/auth/renew', { refreshToken })
    const { accessToken, refreshToken: newRefreshToken } = response.data
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', newRefreshToken)
    return accessToken
  } catch (error) {
    console.error('Failed to renew tokens:', error)
    throw error
  }
}

export function tokenIsExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000 < Date.now()
  } catch (error) {
    console.error('Token parsing failed', error)
    return true
  }
}
