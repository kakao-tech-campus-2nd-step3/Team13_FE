import axios from 'axios'

export const AuthProvider = async (role: string, id: string, password: string) => {
  const endpoint = `/v1/login/${role}`

  try {
    const response = await axios.post(endpoint, {
      id,
      password,
    })

    return response.data
  } catch (error) {
    console.error('Error during login:', error)
    throw error
  }
}
