import { fetchInstance } from '@/api/instance/instance'
import type { Recipient, RecipientResponseData } from './types'

const RECIPIENT_BASE_URL = '/v1/recipient'

export const addRecipient = async (newRecipient: Partial<Recipient>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, isNew, ...recipientData } = newRecipient
  return await fetchInstance.post(RECIPIENT_BASE_URL, recipientData)
}

export const getRecipients = async (): Promise<Recipient[]> => {
  const response = await fetchInstance.get<RecipientResponseData>(RECIPIENT_BASE_URL)
  return response.data.recipients
}

export const updateRecipient = async (id: number, updatedData: Partial<Recipient>) => {
  // const updatedInstitution = { institutionNumber: id, ...updatedData }
  // console.log(updatedInstitution)
  return await fetchInstance.put(`${RECIPIENT_BASE_URL}/${id}`, updatedData)
}

export const deleteRecipient = async (id: number) => {
  return await fetchInstance.delete(`${RECIPIENT_BASE_URL}/${id}`)
}
