import { ApolloLink } from "apollo-link"
import { ContextSetter } from "apollo-link-context"

export class AuthLink extends ApolloLink {
  private tokenGetter: () => string

  constructor(tokenGetter: () => string) {
    super()

    this.tokenGetter = tokenGetter
  }

  public setHeaders: ContextSetter = (_, { headers = {} }) => {
    const token = this.tokenGetter()

    if (token) {
      headers.authorization = `Bearer ${token}`
    }

    return headers
  }
}
