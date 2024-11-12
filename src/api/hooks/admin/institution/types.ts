export interface Institution {
  institutionNumber: number
  institutionName: string
  [key: string]: unknown
}

export type InstitutionResponseData = {
  response: Institution[]
}

export type UpdateInstitutionData = Partial<Institution> & {
  institutionNumber: number
}
