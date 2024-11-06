export interface CareWorker {
  institutionId: number
  name: string
  email: string
  phone: string
}

export type CareWorkerResponseData = {
  recipients: CareWorker[]
}
