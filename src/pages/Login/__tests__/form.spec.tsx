import {
  render as _render,
  RenderResult,
  wait,
  waitForElement,
} from "@testing-library/react"
import * as React from "react"
import { LoginForm } from "../form"

const onSubmit = jest.fn()

const render = (loading = false): RenderResult =>
  _render(<LoginForm loading={loading} onSubmit={onSubmit} />)

describe("LoginForm", () => {
  it("matches the snapshot", () => {
    const { container } = render()
    expect(container).toMatchSnapshot()
  })

  it("requires the email field", async () => {
    const { getByTestId, queryByTestId } = render()
    const button = await waitForElement(() => getByTestId("submit"))

    button.click()

    await wait(() => expect(queryByTestId("email-error")).toBeTruthy())
    expect(onSubmit).not.toBeCalled()
  })

  it("requires the password field", async () => {
    const { getByTestId, queryByTestId } = render()
    const button = await waitForElement(() => getByTestId("submit"))

    button.click()

    await wait(() => expect(queryByTestId("password-error")).toBeTruthy())
    expect(onSubmit).not.toBeCalled()
  })

  it("calls the onSubmit callback", async () => {
    const { getByTestId } = render()
    const email = await waitForElement(() => getByTestId("email"))
    const password = await waitForElement(() => getByTestId("password"))
    const button = await waitForElement(() => getByTestId("submit"))

    email.setAttribute("value", "test@test")
    password.setAttribute("value", "P@55w0rd!")
    button.click()

    await wait(() => expect(onSubmit).toBeCalled())
  })
})
