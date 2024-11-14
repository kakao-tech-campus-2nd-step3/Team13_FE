import fetchInstance from '@/api/instance/instance'
import { CareWorkerResponse, GuardianResponse } from './types'

const USER_BASE_URLS: { [role: string]: string } = {
  careworker: '/v1/careworker',
  guardian: '/v1/guardian',
}

export const getUserBaseURL = () => {
  const role = localStorage.getItem('role')
  return USER_BASE_URLS[role || 'careworker']
}

export const getUserInfo = async (): Promise<CareWorkerResponse | GuardianResponse> => {
  const baseURL = getUserBaseURL()

  const response = await fetchInstance.get(baseURL)
  return response.data.response
}

export const updateUserInfo = async (
  updatedData: Partial<CareWorkerResponse | GuardianResponse>,
) => {
  const baseURL = getUserBaseURL()
  return await fetchInstance.put(baseURL, updatedData)
}
