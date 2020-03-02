import { render, wait, waitForElement } from "@testing-library/react"
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
    const { getByTestId, queryByTestId } = render(<Component />)
    const button = await waitForElement(() => getByTestId("submit"))

    button.click()

    await wait(() => expect(queryByTestId("email-error")).toBeTruthy())
    expect(onSubmit).not.toBeCalled()
  })

  it("requires the name field", async () => {
    const { getByTestId, queryByTestId } = render(<Component />)
    const button = await waitForElement(() => getByTestId("submit"))

    button.click()

    await wait(() => expect(queryByTestId("name-error")).toBeTruthy())
    expect(onSubmit).not.toBeCalled()
  })

  it("requires the password field", async () => {
    const { getByTestId, queryByTestId } = render(<Component />)
    const button = await waitForElement(() => getByTestId("submit"))

    button.click()

    await wait(() => expect(queryByTestId("password-error")).toBeTruthy())
    expect(onSubmit).not.toBeCalled()
  })

  it("calls the onSubmit callback", async () => {
    const { getByTestId } = render(<Component />)
    const email = await waitForElement(() => getByTestId("email"))
    const name = await waitForElement(() => getByTestId("name"))
    const password = await waitForElement(() => getByTestId("password"))
    const button = await waitForElement(() => getByTestId("submit"))

    email.setAttribute("value", "test@test")
    name.setAttribute("value", "test")
    password.setAttribute("value", "P@55w0rd!")
    button.click()

    await wait(() => expect(onSubmit).toBeCalled())
  })

  it("disables the button while loading", async () => {
    const { getByTestId } = render(<Component loading={true} />)
    const button = await waitForElement(() => getByTestId("submit"))
    expect(button.getAttribute("disabled")).not.toBeNull()
  })
})
