import { TableRow } from '@/components/common/Table/Table'

export interface Guardian extends TableRow {
  phone: string
  name: string
  isActive: boolean
  loginPassword?: string
}

export type GuardianResponseData = {
  response: Guardian[]
}

export type UpdateGuardianData = Omit<Guardian, 'isActive'> & {
  loginPassword?: string
}
