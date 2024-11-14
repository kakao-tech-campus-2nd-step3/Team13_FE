import type { Recipient, RecipientResponseData } from './types'
import fetchInstance from '@/api/instance/instance'

const RECIPIENT_BASE_URL: { [role: string]: string } = {
  admin: '/v1/admin/recipient',
  institution: '/v1/institution/recipient',
  // careworker: '/v1/careworker/recipient',
}

const getRecipientBaseURL = () => {
  const role = localStorage.getItem('role')
  return RECIPIENT_BASE_URL[role || 'admin']
}

export const addRecipient = async (newRecipient: Partial<Recipient>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, isNew, ...recipientData } = newRecipient

  const baseURL = getRecipientBaseURL()
  return await fetchInstance.post(baseURL, recipientData)
}

export const getRecipients = async (): Promise<Recipient[]> => {
  const baseURL = getRecipientBaseURL()
  const response = await fetchInstance.get<RecipientResponseData>(baseURL)
  return response.data.response
}

export const updateRecipient = async (id: number, updatedData: Partial<Recipient>) => {
  const baseURL = getRecipientBaseURL()
  return await fetchInstance.put(`${baseURL}/${id}`, updatedData)
}

export const deleteRecipient = async (id: number) => {
  const baseURL = getRecipientBaseURL()
  return await fetchInstance.delete(`${baseURL}/${id}`)
}
