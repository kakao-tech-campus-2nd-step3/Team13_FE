export interface CareWorker {
  id: number
  institutionId: number
  name: string
  email: string
  phone: string
}

export type CareWorkerResponseData = {
  recipients: CareWorker[]
}

// export type UpdateRecipientData = Omit<Recipient, 'id'>
