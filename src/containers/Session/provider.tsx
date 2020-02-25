import { ApolloProvider } from "@apollo/react-hooks"
import * as React from "react"
import { Session, SessionContext } from "./context"
import { useStateFromLocalStorage } from "../../lib/local-storage-state"
import { ApolloLink } from "apollo-link"
import { AuthLink } from "../../lib/apollo-auth-link"
import { ErrorLink } from "apollo-link-error"
import { InMemoryCache } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"
import { ApolloClient } from "apollo-client"

const cache = new InMemoryCache()
const httpLink = new HttpLink({ uri: GRAPHQL_ENDPOINT })

export interface SessionProviderProps {
  basePath?: string
  loginPath?: string
}

export const SessionProvider = ({
  basePath = "/",
  loginPath = "/login",
  children,
}: React.PropsWithChildren<SessionProviderProps>): JSX.Element => {
  const [token, setToken] = useStateFromLocalStorage<string>("token")

  const getToken = React.useCallback(() => token, [token])
  const isLoggedIn = React.useCallback(() => !!token, [token])
  const session = new Session({ basePath, loginPath, isLoggedIn, setToken })

  const link = ApolloLink.from([
    new AuthLink(getToken),
    new ErrorLink(session.handleError),
    httpLink,
  ])

  const client = new ApolloClient({ cache, link })

  return (
    <SessionContext.Provider value={session}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </SessionContext.Provider>
  )
}
