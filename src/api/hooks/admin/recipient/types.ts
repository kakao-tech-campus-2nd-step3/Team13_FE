export interface Recipient {
  id: number
  name: string
  birth: string
  gender: string
  careLevel: string
  careNumber: string
  startDate: string
  institution: string
  institutionNumber: number
  institutionId: number
  careworkerId: number
  [key: string]: unknown
}

export type RecipientResponseData = {
  response: Recipient[]
}

export type UpdateRecipientData = Omit<Recipient, 'id'>
