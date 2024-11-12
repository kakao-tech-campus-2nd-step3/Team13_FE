export interface userInfo {
  userId: string
  password: string
}

export type UserResponseData = {
  refreshToken: string
  accessToken: string
  username: string
}
