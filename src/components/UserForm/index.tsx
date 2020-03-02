import * as React from "react"
import { FieldErrors, OnSubmit, useForm } from "react-hook-form"
import { InputField } from "../InputField"

export enum UserFormFields {
  "EMAIL" = "email",
  "NAME" = "name",
  "PASSWORD" = "password",
}

const userFormFieldLabels = {
  [UserFormFields.EMAIL]: "E-mail address",
  [UserFormFields.NAME]: "Name",
  [UserFormFields.PASSWORD]: "Password",
}

const userFormFieldTypes = {
  [UserFormFields.EMAIL]: "email",
  [UserFormFields.NAME]: "text",
  [UserFormFields.PASSWORD]: "password",
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

const fieldForKey = (
  errors: FieldErrors<UserFormData>,
  ref: React.Ref<HTMLInputElement>
) => (key: string): JSX.Element => (
  <InputField
    name={key}
    label={userFormFieldLabels[key]}
    type={userFormFieldTypes[key]}
    error={errors[key]}
    ref={ref}
    key={key}
  />
)

const inputsForFields = (
  fields: UserFormFields[],
  mapper: (key: string) => JSX.Element
): JSX.Element[] => fields.map(mapper)

export const UserForm = ({
  fields,
  label,
  loading,
  onSubmit,
  children,
}: React.PropsWithChildren<UserFormProps>): JSX.Element => {
  const { register, handleSubmit, errors } = useForm<UserFormData>()
  const ref = register({ required: true })
  const inputs = inputsForFields(fields, fieldForKey(errors, ref))

  return (
    <div className="self-center w-full max-w-xs">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {inputs}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
          data-testid="submit"
        >
          {label}
        </button>
        {children}
      </form>
    </div>
  )
}
