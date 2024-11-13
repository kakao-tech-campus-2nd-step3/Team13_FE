import fetchInstance from '@/api/instance/instance'
import { Recipient, RecipientResponseData } from '../../admin/recipient/types'

const role = localStorage.getItem('role')

const getRecipientsPath = `/v1/${role}/recipient`

export const getRecipients = async (): Promise<Recipient[]> => {
  console.log(role)
  const response = await fetchInstance.get<RecipientResponseData>(getRecipientsPath)

  return response.data.response
}
