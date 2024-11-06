export interface Institution {
  institutionNumber: number
  institutionName: string
  [key: string]: unknown
}

export type InstitutionResponseData = {
  institutions: Institution[]
}
