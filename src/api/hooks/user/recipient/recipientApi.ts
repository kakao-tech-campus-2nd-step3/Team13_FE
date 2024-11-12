import { Recipient, RecipientResponseData } from '../../admin/recipient/types'
import apiInstance from '@/provider/Auth/apiInstance'

const role = localStorage.getItem('role')

const getRecipientsPath = `/v1/${role}/recipient`

export const getRecipients = async (): Promise<Recipient[]> => {
  const response = await apiInstance.get<RecipientResponseData>(getRecipientsPath)

  return response.data.response
}
