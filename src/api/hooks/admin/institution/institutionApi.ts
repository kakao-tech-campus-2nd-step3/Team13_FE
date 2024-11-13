import apiInstance from '@/provider/Auth/apiInstance'
import type { Institution, InstitutionResponseData } from './types'

const INSTITUTION_BASE_URL = '/v1/admin/institution'

export const addInstitution = async (newInstitution: Partial<Institution>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, isNew, ...institutionData } = newInstitution
  return await apiInstance.post(INSTITUTION_BASE_URL, institutionData)
}

export const getInstitutions = async (): Promise<Institution[]> => {
  const response = await apiInstance.get<InstitutionResponseData>(INSTITUTION_BASE_URL)
  return response.data.response ?? []
}

export const updateInstitution = async (id: number, updatedData: Partial<Institution>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: _, ...dataWithoutId } = updatedData
  return await apiInstance.put(`${INSTITUTION_BASE_URL}/${id}`, dataWithoutId)
}

export const deleteInstitution = async (institutionNumber: number) => {
  return await apiInstance.delete(`${INSTITUTION_BASE_URL}/${institutionNumber}`)
}
