import gql from "graphql-tag"
import * as React from "react"
import { MutationFunction, useMutation } from "react-apollo-typed-hooks"
import { OnSubmit } from "react-hook-form"
import {
  UserForm,
  UserFormData,
  UserFormFields,
} from "../../components/UserForm"
import { useSession } from "../../containers/Session"
import { CredentialType, Mutation } from "../../lib/koverto"

export const QUERY = gql`
  mutation SignUp($input: Authentication!) {
    createUser(input: $input) {
      token
      user {
        id
        email
        name
      }
    }
  }
`

const SIGN_UP = new Mutation.CreateUser(QUERY)

export const onSubmit = (
  signUp: MutationFunction<Mutation.CreateUser>
): OnSubmit<UserFormData> => ({ name, email, password }): void => {
  const user = { name, email }
  const credential = {
    credentialType: CredentialType.PASSWORD,
    credential: password,
  }
  const variables = { input: { user, credential } }
  signUp({ variables })
}

export const SignUp = (): JSX.Element => {
  const [signUp, { data, loading, error }] = useMutation(SIGN_UP)
  const { setToken } = useSession()

  data?.createUser?.token && setToken(data.createUser.token)

  return (
    <div>
      <h1>Sign Up</h1>
      {error && <span data-testid="signup-error">{error.message}</span>}
      <UserForm
        fields={[
          UserFormFields.NAME,
          UserFormFields.EMAIL,
          UserFormFields.PASSWORD,
        ]}
        label="Sign Up"
        loading={loading}
        onSubmit={onSubmit(signUp)}
      />
    </div>
  )
}
