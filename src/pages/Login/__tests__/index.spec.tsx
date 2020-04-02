import { MockedProvider } from "@apollo/react-testing"
import {
  render as _render,
  RenderResult,
  waitFor,
} from "@testing-library/react"
import { GraphQLError } from "graphql"
import * as React from "react"
import { MemoryRouter } from "react-router-dom"
import { Login, onSubmit as _onSubmit, QUERY } from ".."
import { Session, SessionContext } from "../../../containers/Session/context"
import { CredentialType, LoginResponse } from "../../../lib/koverto"

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
const render = (
  result: {
    data?: { login: LoginResponse }
    errors?: GraphQLError[]
  } = {}
): RenderResult =>
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
    const { findByTestId } = render({
      errors: [
        new GraphQLError(
          "invalid e-mail address or password",
          null,
          null,
          null,
          ["login"]
        ),
      ],
    })

    const email = await findByTestId("email")
    const password = await findByTestId("password")
    const button = await findByTestId("submit")

    email.setAttribute("value", "test@test")
    password.setAttribute("value", "P@55w0rd!")
    button.click()

    await findByTestId("login-error")
    expect(localStorage.setItem).not.toBeCalled()
  })

  it("sets the token if one is included with the mutation result data", async () => {
    const { findByTestId } = render({
      data: {
        login: {
          token: "token",
          user: {
            id: "7527500c-1238-496d-aba8-1d21b6325f83",
            name: "test",
            email: "test@test",
            createdAt: new Date(),
          },
        },
      },
    })

    const email = await findByTestId("email")
    const password = await findByTestId("password")
    const button = await findByTestId("submit")

    email.setAttribute("value", "test@test")
    password.setAttribute("value", "P@55w0rd!")
    button.click()

    await waitFor(() => expect(setToken).toBeCalledWith("token"))
  })
})
