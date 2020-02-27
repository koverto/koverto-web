import * as React from "react"
import { OnSubmit, useForm } from "react-hook-form"

export interface LoginFormData {
  email: string
  password: string
}

interface LoginFormProps {
  loading: boolean
  onSubmit: OnSubmit<LoginFormData>
}

export const LoginForm = ({
  loading,
  onSubmit,
}: LoginFormProps): JSX.Element => {
  const { register, handleSubmit, errors } = useForm<LoginFormData>()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="email"
        type="email"
        data-testid="email"
        ref={register({ required: true })}
      />
      {errors.email && (
        <span data-testid="email-error">E-mail address is required</span>
      )}

      <input
        name="password"
        type="password"
        data-testid="password"
        ref={register({ required: true })}
      />
      {errors.password && (
        <span data-testid="password-error">Password is required</span>
      )}

      <button type="submit" disabled={loading} data-testid="submit">
        Login
      </button>
    </form>
  )
}
