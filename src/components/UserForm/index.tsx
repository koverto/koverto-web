import * as React from "react"
import { OnSubmit, useForm } from "react-hook-form"

export enum UserFormFields {
  "EMAIL",
  "NAME",
  "PASSWORD",
}

export interface UserFormData {
  email: string
  name?: string
  password: string
}

interface UserFormProps {
  fields: UserFormFields[]
  label: string
  loading: boolean
  onSubmit: OnSubmit<UserFormData>
}

export const UserForm = ({
  fields,
  label,
  loading,
  onSubmit,
}: UserFormProps): JSX.Element => {
  const { register, handleSubmit, errors } = useForm<UserFormData>()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.includes(UserFormFields.NAME) && (
        <div>
          <input
            name="name"
            type="text"
            data-testid="name"
            ref={register({ required: true })}
          />
          {errors.name && (
            <span data-testid="name-error">Name is required</span>
          )}
        </div>
      )}

      {fields.includes(UserFormFields.EMAIL) && (
        <div>
          <input
            name="email"
            type="email"
            data-testid="email"
            ref={register({ required: true })}
          />
          {errors.email && (
            <span data-testid="email-error">E-mail address is required</span>
          )}
        </div>
      )}

      {fields.includes(UserFormFields.PASSWORD) && (
        <div>
          <input
            name="password"
            type="password"
            data-testid="password"
            ref={register({ required: true })}
          />
          {errors.password && (
            <span data-testid="password-error">Password is required</span>
          )}
        </div>
      )}

      <button type="submit" disabled={loading} data-testid="submit">
        {label}
      </button>
    </form>
  )
}
