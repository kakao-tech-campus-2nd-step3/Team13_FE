export interface Guardian {
  phone: string
  name: string
  isActive: boolean
}

export type GuardianResponseData = {
  recipients: Guardian[]
}

export type UpdateGuardianData = Omit<Guardian, 'isActive'> & {
  loginPassword: string
}
