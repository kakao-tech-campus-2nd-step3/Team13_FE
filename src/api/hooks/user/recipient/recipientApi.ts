import fetchInstance from '@/api/instance/instance'
import { Recipient, RecipientResponseData } from '../../admin/recipient/types'

export const getRecipients = async (role: string): Promise<Recipient[]> => {
  const getRecipientsPath = `/v1/${role}/recipient`
  const response = await fetchInstance.get<RecipientResponseData>(getRecipientsPath)
  return response.data.response
}
