export interface CareWorkerResponse {
  name: string
  phone: string
  institutionName: string
  alertTime: string
  workingDays: string[]
  smsSubscription: boolean
  lineSubscription: boolean
}

export interface GuardianResponse {
  name: string
  phone: string
  alertTime: string
  smsSubscription: boolean
  lineSubscription: boolean
}
