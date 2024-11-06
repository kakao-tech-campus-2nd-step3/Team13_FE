import { fetchInstance } from '@/api/instance/instance'
import type { Guardian, GuardianResponseData } from './types'

const GUARDIAN_BASE_URL = '/v1/institution/guardian'

export const addGuardian = async (newGuardian: Partial<Guardian>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, isNew, isActive, ...guardianData } = newGuardian
  return await fetchInstance.post(GUARDIAN_BASE_URL, guardianData)
}

export const getGuardians = async (): Promise<Guardian[]> => {
  const response = await fetchInstance.get<GuardianResponseData>(GUARDIAN_BASE_URL)
  return response.data.guardians
}

export const updateGuardian = async (id: number, updatedData: Partial<Guardian>) => {
  return await fetchInstance.put(`${GUARDIAN_BASE_URL}/${id}`, updatedData)
}

export const deleteGuardian = async (id: number) => {
  return await fetchInstance.delete(`${GUARDIAN_BASE_URL}/${id}`)
}
