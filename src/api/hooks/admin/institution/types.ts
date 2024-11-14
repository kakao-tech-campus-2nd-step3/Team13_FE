import { TableRow } from '@/components/common/Table/Table'

export interface Institution extends TableRow {
  id: number
  institutionNumber: number
  institutionName: string
}

export type InstitutionResponseData = {
  response: Institution[]
}

export type UpdateInstitutionData = Partial<Institution> & {
  id: number
}
