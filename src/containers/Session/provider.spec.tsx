import * as React from "react"
import { useSession } from "./context"
import { render as _render, RenderResult } from "@testing-library/react"
import { SessionProvider } from "./provider"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"

const TEST_QUERY = gql`
  {
    user {
      id
    }
  }
`

const Component = (): JSX.Element => {
  const { basePath, loginPath, isLoggedIn, setToken } = useSession()
  useQuery(TEST_QUERY)

  const toggleToken = (): void => setToken(isLoggedIn() ? null : "token")

  return (
    <div>
      <span data-testid="base-path">{basePath}</span>
      <span data-testid="login-path">{loginPath}</span>
      <span
        data-testid="logged-in"
        onClick={toggleToken}
      >{`${isLoggedIn()}`}</span>
    </div>
  )
}

const render = ({ ...props } = {}): RenderResult =>
  _render(
    <SessionProvider {...props}>
      <Component />
    </SessionProvider>
  )

describe("SessionProvider", () => {
  it("matches the snapshot", () => {
    const component = render()
    expect(component).toMatchSnapshot()
  })

  it("sets the base path", () => {
    const basePath = "BASE_PATH"
    const component = render({ basePath })
    expect(component.getByTestId("base-path").textContent).toBe(basePath)
  })

  it("sets the login path", () => {
    const loginPath = "LOGIN_PATH"
    const component = render({ loginPath })
    expect(component.getByTestId("login-path").textContent).toBe(loginPath)
  })
})
