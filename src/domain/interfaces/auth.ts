export type UserAuthResponse = {
  data: UserAuthResponseData
  message: string
}

type UserAuthResponseData = {
  token: string
  expiredIn: string
}

export type LoginForm = {
  username: string
  password: string
}

export type UserAuthCredentials = LoginForm & {
  token: string
}
