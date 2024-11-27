import type { CareWorker, CareWorkerResponseData } from './types'
import fetchInstance from '@/api/instance/instance'

const CAREWORKER_BASE_URLS: { [role: string]: string } = {
  admin: '/v1/admin/careworker',
  institution: '/v1/institution/careworker',
}

const getCareWorkerBaseURL = () => {
  const role = localStorage.getItem('role')
  return CAREWORKER_BASE_URLS[role || 'admin']
}

export const addCareWorker = async (newCareWorker: Partial<CareWorker>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, isNew, ...careWorkerData } = newCareWorker

  const baseURL = getCareWorkerBaseURL()
  return await fetchInstance.post(baseURL, careWorkerData)
}

export const getCareWorkers = async (): Promise<CareWorker[]> => {
  const baseURL = getCareWorkerBaseURL()
  const response = await fetchInstance.get<CareWorkerResponseData>(baseURL)
  return response.data.response ?? []
}

export const updateCareWorker = async (id: number, updatedData: Partial<CareWorker>) => {
  const baseURL = getCareWorkerBaseURL()
  return await fetchInstance.put(`${baseURL}/${id}`, updatedData)
}

export const deleteCareWorker = async (id: number) => {
  const baseURL = getCareWorkerBaseURL()
  return await fetchInstance.delete(`${baseURL}/${id}`)
}
