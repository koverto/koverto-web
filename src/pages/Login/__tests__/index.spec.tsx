import { MockedProvider } from "@apollo/react-testing"
import {
  render as _render,
  RenderResult,
  wait,
  waitForElement,
} from "@testing-library/react"
import * as React from "react"
import { MemoryRouter } from "react-router-dom"
import { Login, onSubmit as _onSubmit, QUERY } from ".."
import { Session, SessionContext } from "../../../containers/Session/context"
import { CredentialType } from "../../../lib/koverto"

describe("onSubmit", () => {
  const login = jest.fn()
  const onSubmit = _onSubmit(login)

  it("builds the mutation parameters from the form data", () => {
    onSubmit({ email: "test@test", password: "P@55w0rd!" })

    expect(login).toBeCalledWith({
      variables: {
        input: {
          user: { email: "test@test" },
          credential: {
            credentialType: CredentialType.PASSWORD,
            credential: "P@55w0rd!",
          },
        },
      },
    })
  })
})

const setToken = jest.fn()
const render = (result = {}): RenderResult =>
  _render(
    <SessionContext.Provider value={new Session({ setToken })}>
      <MockedProvider
        addTypename={false}
        mocks={[
          {
            request: {
              query: QUERY,
              variables: {
                input: {
                  user: { email: "test@test" },
                  credential: {
                    credentialType: CredentialType.PASSWORD,
                    credential: "P@55w0rd!",
                  },
                },
              },
            },
            result,
          },
        ]}
      >
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </MockedProvider>
    </SessionContext.Provider>
  )

describe("Login", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it("matches the snapshot", () => {
    const { container } = render()
    expect(container).toMatchSnapshot()
  })

  it("does not set the token if there is no mutation result data", () => {
    render()
    expect(localStorage.setItem).not.toBeCalled()
  })

  it("does not set the token if there is mutation result data containing an error", async () => {
    const { getByTestId } = render({
      errors: [
        {
          message: "invalid e-mail address or password",
          path: ["login"],
        },
      ],
    })

    const email = await waitForElement(() => getByTestId("email"))
    const password = await waitForElement(() => getByTestId("password"))
    const button = await waitForElement(() => getByTestId("submit"))

    email.setAttribute("value", "test@test")
    password.setAttribute("value", "P@55w0rd!")
    button.click()

    await waitForElement(() => getByTestId("login-error"))
    expect(localStorage.setItem).not.toBeCalled()
  })

  it("sets the token if one is included with the mutation result data", async () => {
    const { getByTestId } = render({
      data: {
        login: {
          token: "token",
          user: {
            id: "7527500c-1238-496d-aba8-1d21b6325f83",
            name: "test",
            email: "test@test",
          },
        },
      },
    })

    const email = await waitForElement(() => getByTestId("email"))
    const password = await waitForElement(() => getByTestId("password"))
    const button = await waitForElement(() => getByTestId("submit"))

    email.setAttribute("value", "test@test")
    password.setAttribute("value", "P@55w0rd!")
    button.click()

    await wait(() => expect(setToken).toBeCalledWith("token"))
  })
})
