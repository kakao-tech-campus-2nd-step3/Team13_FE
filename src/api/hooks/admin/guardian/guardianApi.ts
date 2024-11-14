import fetchInstance from '@/api/instance/instance'
import type { Guardian, GuardianResponseData } from './types'

const GUARDIAN_BASE_URL: { [role: string]: string } = {
  admin: '/v1/admin/guardian',
  institution: '/v1/institution/guardian',
}

const getGuardianBaseURL = () => {
  const role = localStorage.getItem('role')
  return GUARDIAN_BASE_URL[role || 'admin']
}

export const addGuardian = async (newGuardian: Partial<Guardian>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, isNew, isActive, ...guardianData } = newGuardian

  const baseURL = getGuardianBaseURL()
  return await fetchInstance.post(baseURL, guardianData)
}

export const getGuardians = async (): Promise<Guardian[]> => {
  const baseURL = getGuardianBaseURL()
  const response = await fetchInstance.get<GuardianResponseData>(baseURL)
  return response.data.response
}

export const updateGuardian = async (id: number, updatedData: Partial<Guardian>) => {
  const baseURL = getGuardianBaseURL()
  return await fetchInstance.put(`${baseURL}/${id}`, updatedData)
}

export const deleteGuardian = async (id: number) => {
  const baseURL = getGuardianBaseURL()
  return await fetchInstance.delete(`${baseURL}/${id}`)
}
