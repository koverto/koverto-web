import { Dispatch, SetStateAction, createContext } from "react"
import { ServerError } from "apollo-link-http-common"
import { ErrorResponse } from "apollo-link-error"
import { SessionProviderProps } from "./provider"

export interface SessionProps extends SessionProviderProps {
  isLoggedIn?: () => boolean
  setToken?: Dispatch<SetStateAction<string>>
}

export class Session implements SessionProps {
  private readonly _basePath: string
  private readonly _loginPath: string
  public readonly isLoggedIn: () => boolean
  public readonly setToken: Dispatch<SetStateAction<string>>

  constructor({
    basePath = "/",
    loginPath = "/login",
    isLoggedIn = (): boolean => false,
    setToken = (_): void => null,
  }: SessionProps = {}) {
    this._basePath = basePath
    this._loginPath = loginPath
    this.isLoggedIn = isLoggedIn
    this.setToken = setToken
  }

  get basePath(): string {
    return this._basePath
  }

  get loginPath(): string {
    return this._loginPath
  }

  public handleError = ({ networkError = null }: ErrorResponse): void => {
    if ((networkError as ServerError)?.statusCode === 401) {
      this.setToken(null)
    }
  }
}

export const SessionContext = createContext<Session>(new Session())
