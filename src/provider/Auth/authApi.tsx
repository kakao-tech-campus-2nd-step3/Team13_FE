import axios from 'axios'

// Function for login, storing tokens, and handling errors
export const AuthProvider = async (role: string, id: string, password: string) => {
  const endpoint = `/v1/auth/login/${role}`

  try {
    const response = await axios.post(endpoint, { userId: id, password })

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

// Function to renew access and refresh tokens
export const renewTokens = async () => {
  const refreshToken = localStorage.getItem('refreshToken')
  if (!refreshToken) {
    throw new Error('No refresh token available')
  }

  try {
    const response = await axios.post('/v1/auth/renew', { request: refreshToken })

    const { accessToken, refreshToken: newRefreshToken } = response.data

    // Store the new tokens
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', newRefreshToken)

    return accessToken
  } catch (error) {
    console.error('Error renewing tokens:', error)
    throw error
  }
}
