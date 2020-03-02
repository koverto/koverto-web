import gql from "graphql-tag"
import * as React from "react"
import { MutationFunction, useMutation } from "react-apollo-typed-hooks"
import { OnSubmit } from "react-hook-form"
import { Link } from "react-router-dom"
import {
  UserForm,
  UserFormData,
  UserFormFields,
} from "../../components/UserForm"
import { useSession } from "../../containers/Session"
import { CredentialType, Mutation } from "../../lib/koverto"

export const QUERY = gql`
  mutation Login($input: Authentication!) {
    login(input: $input) {
      token
      user {
        id
        email
        name
      }
    }
  }
`

const LOGIN = new Mutation.Login(QUERY)

export const onSubmit = (
  login: MutationFunction<Mutation.Login>
): OnSubmit<UserFormData> => ({ email, password }): void => {
  const user = { email }
  const credential = {
    credentialType: CredentialType.PASSWORD,
    credential: password,
  }
  const variables = { input: { user, credential } }
  login({ variables })
}

export const Login = (): JSX.Element => {
  const [login, { data, loading, error }] = useMutation(LOGIN)
  const { setToken } = useSession()

  data?.login?.token && setToken(data.login.token)

  return (
    <div>
      <h1>Login</h1>
      {error && <span data-testid="login-error">{error.message}</span>}
      <UserForm
        fields={[UserFormFields.EMAIL, UserFormFields.PASSWORD]}
        label="Login"
        loading={loading}
        onSubmit={onSubmit(login)}
      />
      <Link to="/sign-up">Sign up</Link>
    </div>
  )
}
