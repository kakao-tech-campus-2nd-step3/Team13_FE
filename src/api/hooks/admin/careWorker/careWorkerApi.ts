import apiInstance from '@/provider/Auth/apiInstance'
import type { CareWorker, CareWorkerResponseData } from './types'

const CAREWORKER_BASE_URL = '/v1/admin/careworker'

export const addCareWorker = async (newCareWorker: Partial<CareWorker>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, isNew, ...careWorkerData } = newCareWorker

  const loginPassword = localStorage.getItem('loginPassword')

  const requestData = {
    ...careWorkerData,
    loginPassword,
  }

  return await apiInstance.post(CAREWORKER_BASE_URL, requestData)
}

export const getCareWorkers = async (): Promise<CareWorker[]> => {
  const response = await apiInstance.get<CareWorkerResponseData>(CAREWORKER_BASE_URL)
  return response.data.response ?? []
}

export const updateCareWorker = async (id: number, updatedData: Partial<CareWorker>) => {
  return await apiInstance.put(`${CAREWORKER_BASE_URL}/${id}`, updatedData)
}

export const deleteCareWorker = async (id: number) => {
  return await apiInstance.delete(`${CAREWORKER_BASE_URL}/${id}`)
}
