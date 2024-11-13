import type { Recipient, RecipientResponseData } from './types'
import fetchInstance from '@/api/instance/instance'

const RECIPIENT_BASE_URL = '/v1/admin/recipient'

export const addRecipient = async (newRecipient: Partial<Recipient>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, isNew, ...recipientData } = newRecipient
  return await fetchInstance.post(RECIPIENT_BASE_URL, recipientData)
}

export const getRecipients = async (): Promise<Recipient[]> => {
  const response = await fetchInstance.get<RecipientResponseData>(RECIPIENT_BASE_URL)
  return response.data.response
}

export const updateRecipient = async (id: number, updatedData: Partial<Recipient>) => {
  return await fetchInstance.put(`${RECIPIENT_BASE_URL}/${id}`, updatedData)
}

export const deleteRecipient = async (id: number) => {
  return await fetchInstance.delete(`${RECIPIENT_BASE_URL}/${id}`)
}
