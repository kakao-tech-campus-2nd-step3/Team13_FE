import apiInstance from '@/provider/Auth/apiInstance'
import type { Guardian, GuardianResponseData } from './types'

const GUARDIAN_BASE_URL = '/v1/institution/guardian'

export const addGuardian = async (newGuardian: Partial<Guardian>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, isNew, isActive, ...guardianData } = newGuardian
  return await apiInstance.post(GUARDIAN_BASE_URL, guardianData)
}

export const getGuardians = async (): Promise<Guardian[]> => {
  const response = await apiInstance.get<GuardianResponseData>(GUARDIAN_BASE_URL)
  return response.data.response
}

export const updateGuardian = async (id: number, updatedData: Partial<Guardian>) => {
  return await apiInstance.put(`${GUARDIAN_BASE_URL}/${id}`, updatedData)
}

export const deleteGuardian = async (id: number) => {
  return await apiInstance.delete(`${GUARDIAN_BASE_URL}/${id}`)
}
