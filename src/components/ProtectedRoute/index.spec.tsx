import * as React from "react"
import { Session, SessionContext } from "../../containers/Session/context"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { ProtectedRoute } from "."

const AuthedComponent = (): JSX.Element => <div>Authenticated</div>
const UnauthedComponent = (): JSX.Element => <div>Unauthenticated</div>

const assertRoute = (
  loggedIn: boolean,
  initialRoute: string,
  textContent: string
) => (): void => {
  const session = new Session({
    basePath: "/authed",
    loginPath: "/unauthed",
    isLoggedIn: (): boolean => loggedIn,
  })

  const { container } = render(
    <SessionContext.Provider value={session}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <ProtectedRoute
          authRequired
          path="/authed"
          component={AuthedComponent}
        />
        <ProtectedRoute path="/unauthed" component={UnauthedComponent} />
      </MemoryRouter>
    </SessionContext.Provider>
  )

  expect(container.textContent).toBe(textContent)
}

describe("ProtectedRoute", () => {
  describe("when authentication required", () => {
    describe("when logged in", () => {
      it("shows the authed page", assertRoute(true, "/authed", "Authenticated"))
    })

    describe("when not logged in", () => {
      it(
        "redirects to the unauthed page",
        assertRoute(false, "/authed", "Unauthenticated")
      )
    })
  })

  describe("when not authentication required", () => {
    describe("when logged in", () => {
      it(
        "redirects to the authed page",
        assertRoute(true, "/unauthed", "Authenticated")
      )
    })

    describe("when not logged in", () => {
      it(
        "shows the unauthed page",
        assertRoute(false, "/unauthed", "Unauthenticated")
      )
    })
  })
})
