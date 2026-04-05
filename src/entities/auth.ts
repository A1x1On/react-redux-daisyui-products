export interface IAuth {
  id: number
  username: string
  firstName: string
  lastName: string
  gender: string
  email: string
  image: string
  accessToken: string
  refreshToken: string
}

export interface IAuthRec {
  expiresInMins: number
  username: string
  password: string
}

export interface IAuthToken {
  accessToken: string
  refreshToken: string
}

export interface IAuthTokenRec {
  refreshToken: string
  expiresInMins: number
}

export interface IAuthFilter {
  name: string
}

export interface AuthState {
  data: IAuth | null
  token: string | null
  initialized: boolean
}

// CONSTANTS

export const AUTH_LOGIN_EXP_MINS = 30

export const AUTH_REFRESH_EXP_MINS = 30

export const AUTH_FILTER = {
  name: '',
}

export const AUTH: IAuth = {
  accessToken: '',
  email: '',
  firstName: '',
  gender: '',
  id: 0,
  image: '',
  lastName: '',
  refreshToken: '',
  username: '',
}

export const AUTH_REC: IAuthRec = {
  expiresInMins: 30,
  username: '',
  password: '',
}

export const AUTH_STATE: AuthState = {
  data: null,
  token: null,
  initialized: false,
}
