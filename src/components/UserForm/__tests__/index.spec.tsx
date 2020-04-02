import { render, waitFor } from "@testing-library/react"
import * as React from "react"
import { UserForm, UserFormFields } from ".."

const onSubmit = jest.fn()

const Component = ({ loading = false }: { loading?: boolean }): JSX.Element => (
  <UserForm
    fields={[
      UserFormFields.EMAIL,
      UserFormFields.NAME,
      UserFormFields.PASSWORD,
    ]}
    label="User"
    loading={loading}
    onSubmit={onSubmit}
  />
)

describe("UserForm", () => {
  it("matches the snapshot", () => {
    const { container } = render(<Component />)
    expect(container).toMatchSnapshot()
  })

  it("requires the email field", async () => {
    const { findByTestId, queryByTestId } = render(<Component />)
    const button = await findByTestId("submit")

    button.click()

    await waitFor(() => expect(queryByTestId("email-error")).toBeTruthy())
    expect(onSubmit).not.toBeCalled()
  })

  it("requires the name field", async () => {
    const { findByTestId, queryByTestId } = render(<Component />)
    const button = await findByTestId("submit")

    button.click()

    await waitFor(() => expect(queryByTestId("name-error")).toBeTruthy())
    expect(onSubmit).not.toBeCalled()
  })

  it("requires the password field", async () => {
    const { findByTestId, queryByTestId } = render(<Component />)
    const button = await findByTestId("submit")

    button.click()

    await waitFor(() => expect(queryByTestId("password-error")).toBeTruthy())
    expect(onSubmit).not.toBeCalled()
  })

  it("calls the onSubmit callback", async () => {
    const { findByTestId } = render(<Component />)
    const email = await findByTestId("email")
    const name = await findByTestId("name")
    const password = await findByTestId("password")
    const button = await findByTestId("submit")

    email.setAttribute("value", "test@test")
    name.setAttribute("value", "test")
    password.setAttribute("value", "P@55w0rd!")
    button.click()

    await waitFor(() => expect(onSubmit).toBeCalled())
  })

  it("disables the button while loading", async () => {
    const { findByTestId } = render(<Component loading={true} />)
    const button = await findByTestId("submit")
    expect(button.getAttribute("disabled")).not.toBeNull()
  })
})
