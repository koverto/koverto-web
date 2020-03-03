import gql from "graphql-tag"
import * as React from "react"
import { useMutation } from "react-apollo-typed-hooks"
import { Redirect } from "react-router-dom"
import { useSession } from "../../containers/Session"
import { Mutation } from "../../lib/koverto"

export const QUERY = gql`
  mutation Logout {
    logout {
      ok
    }
  }
`

const LOGOUT = new Mutation.Logout(QUERY)

export const Logout = (): JSX.Element => {
  const [logoutMutation, { data }] = useMutation(LOGOUT)
  const { logout } = useSession()

  const tryLogout = (): void => {
    data?.logout?.ok ? logout() : logoutMutation()
  }

  React.useEffect(tryLogout, [data])

  return data?.logout?.ok ? <Redirect to="/" /> : <React.Fragment />
}
