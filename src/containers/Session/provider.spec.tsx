import { useQuery } from "@apollo/react-hooks"
import { render as _render, RenderResult } from "@testing-library/react"
import gql from "graphql-tag"
import * as React from "react"
import { useSession } from "./context"
import { SessionProvider } from "./provider"

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

  describe("with no token", () => {
    beforeEach(() => {
      localStorage.clear()
    })

    it("is not logged in", () => {
      const component = render()
      expect(component.getByTestId("logged-in").textContent).toBe("false")
    })

    it("allows logging in", () => {
      const component = render()
      const el = component.getByTestId("logged-in")
      el.click()

      expect(localStorage.setItem).toBeCalledWith(
        "token",
        JSON.stringify("token")
      )
      expect(el.textContent).toBe("true")
    })
  })

  describe("with a token", () => {
    beforeEach(() => {
      localStorage.clear()
      localStorage.__STORE__.token = JSON.stringify("token")
    })

    afterEach(() => {
      localStorage.clear()
    })

    it("is logged in", () => {
      const component = render()
      expect(component.getByTestId("logged-in").textContent).toBe("true")
    })

    it("allows logging out", () => {
      const component = render()
      const el = component.getByTestId("logged-in")
      el.click()

      expect(localStorage.setItem).toBeCalledWith("token", JSON.stringify(null))
      expect(el.textContent).toBe("false")
    })
  })
})
