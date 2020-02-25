import { ApolloLink } from "apollo-link"
import { ContextSetter, setContext } from "apollo-link-context"

export class AuthLink extends ApolloLink {
  constructor(private tokenGetter: () => string) {
    super()

    this.request = setContext(this.setHeaders).request
  }

  public setHeaders: ContextSetter = (_, { headers = {} }) => {
    const token = this.tokenGetter()

    if (token) {
      headers.authorization = `Bearer ${token}`
    }

    return headers
  }
}
