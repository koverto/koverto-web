export interface Authentication {
  credential: Credential
  user?: UserInput
}

export interface Credential {
  userID?: string
  credentialType: CredentialType
  credential: string
}

export enum CredentialType {
  "NONE" = "NONE",
  "PASSWORD" = "PASSWORD",
}

export interface LoginResponse {
  token: string
  user: User
}

export interface LogoutResponse {
  ok: boolean
}

export interface User extends UserInput {
  id: string
  createdAt: Date
  updatedAt?: Date
}

export interface UserInput {
  name?: string
  email: string
}
