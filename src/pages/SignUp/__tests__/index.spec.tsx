import { MockedProvider } from "@apollo/react-testing"
import {
  render as _render,
  RenderResult,
  waitFor,
} from "@testing-library/react"
import * as React from "react"
import { MemoryRouter } from "react-router-dom"
import { onSubmit as _onSubmit, QUERY, SignUp } from ".."
import { Session, SessionContext } from "../../../containers/Session/context"
import { CredentialType } from "../../../lib/koverto"

describe("onSubmit", () => {
  const createUser = jest.fn()
  const onSubmit = _onSubmit(createUser)

  it("builds the mutation parameters from the form data", () => {
    onSubmit({ email: "test@test", name: "test", password: "P@55w0rd!" })

    expect(createUser).toBeCalledWith({
      variables: {
        input: {
          user: { email: "test@test", name: "test" },
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
                  user: { email: "test@test", name: "test" },
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
          <SignUp />
        </MemoryRouter>
      </MockedProvider>
    </SessionContext.Provider>
  )

describe("SignUp", () => {
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
        {
          message: "could not create user",
          path: ["createUser"],
        },
      ],
    })

    const email = await findByTestId("email")
    const name = await findByTestId("name")
    const password = await findByTestId("password")
    const button = await findByTestId("submit")

    email.setAttribute("value", "test@test")
    name.setAttribute("value", "test")
    password.setAttribute("value", "P@55w0rd!")
    button.click()

    await findByTestId("signup-error")
    expect(localStorage.setItem).not.toBeCalled()
  })

  it("sets the token if one is included with the mutation result data", async () => {
    const { findByTestId } = render({
      data: {
        createUser: {
          token: "token",
          user: {
            id: "7527500c-1238-496d-aba8-1d21b6325f83",
            name: "test",
            email: "test@test",
          },
        },
      },
    })

    const email = await findByTestId("email")
    const name = await findByTestId("name")
    const password = await findByTestId("password")
    const button = await findByTestId("submit")

    email.setAttribute("value", "test@test")
    name.setAttribute("value", "test")
    password.setAttribute("value", "P@55w0rd!")
    button.click()

    await waitFor(() => expect(setToken).toBeCalledWith("token"))
  })
})
