import apiInstance from '@/provider/Auth/apiInstance'
import type { Recipient, RecipientResponseData } from './types'

const RECIPIENT_BASE_URL = '/v1/admin/recipient'

export const addRecipient = async (newRecipient: Partial<Recipient>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, isNew, ...recipientData } = newRecipient
  return await apiInstance.post(RECIPIENT_BASE_URL, recipientData)
}

export const getRecipients = async (): Promise<Recipient[]> => {
  const response = await apiInstance.get<RecipientResponseData>(RECIPIENT_BASE_URL)
  return response.data.response
}

export const updateRecipient = async (id: number, updatedData: Partial<Recipient>) => {
  // const updatedInstitution = { institutionNumber: id, ...updatedData }
  // console.log(updatedInstitution)
  return await apiInstance.put(`${RECIPIENT_BASE_URL}/${id}`, updatedData)
}

export const deleteRecipient = async (id: number) => {
  return await apiInstance.delete(`${RECIPIENT_BASE_URL}/${id}`)
}
