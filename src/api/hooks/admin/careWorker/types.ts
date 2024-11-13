export interface CareWorker {
  id: number
  institutionId: number
  name: string
  email: string
  phone: string
  [key: string]: unknown
}

export type CareWorkerResponseData = {
  response: CareWorker[]
}

export type UpdateCareWorkerData = Omit<CareWorker, 'id'>
