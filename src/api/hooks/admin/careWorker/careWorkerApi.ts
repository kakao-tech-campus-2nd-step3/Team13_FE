import { fetchInstance } from '@/api/instance/instance'
import type { CareWorker, CareWorkerResponseData } from './types'

const CAREWORKER_BASE_URL = '/v1/careworker'

export const addCareWorker = async (newCareWorker: Partial<CareWorker>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, isNew, ...careWorkerData } = newCareWorker

  return await fetchInstance.post(CAREWORKER_BASE_URL, careWorkerData)
}

export const getCareWorkers = async (): Promise<CareWorker[]> => {
  const response = await fetchInstance.get<CareWorkerResponseData>(CAREWORKER_BASE_URL)
  return response.data.recipients
}

export const updateCareWorker = async (id: number, updatedData: Partial<CareWorker>) => {
  // const updatedInstitution = { institutionNumber: id, ...updatedData }
  // console.log(updatedInstitution)
  return await fetchInstance.put(`${CAREWORKER_BASE_URL}/${id}`, updatedData)
}

export const deleteCareWorker = async (id: number) => {
  return await fetchInstance.delete(`${CAREWORKER_BASE_URL}/${id}`)
}
