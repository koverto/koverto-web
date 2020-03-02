import * as React from "react"
import { FieldError } from "react-hook-form"

export interface InputFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string
  error?: FieldError
}

const inputField = (
  { name, label, error, ...rest }: InputFieldProps,
  ref: React.Ref<HTMLInputElement>
): JSX.Element => (
  <div>
    <input
      data-testid={name}
      placeholder={label || name}
      {...{ name, ref, ...rest }}
    />
    {error && <span data-testid={`${name}-error`}>{error.message}</span>}
  </div>
)

export const InputField = React.forwardRef(inputField)
