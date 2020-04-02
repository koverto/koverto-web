import { MockedProvider } from "@apollo/react-testing"
import {
  render as _render,
  RenderResult,
  waitFor,
} from "@testing-library/react"
import { GraphQLError } from "graphql"
import * as React from "react"
import { MemoryRouter } from "react-router-dom"
import { Logout, QUERY } from ".."
import { Session, SessionContext } from "../../../containers/Session/context"
import { LogoutResponse } from "../../../lib/koverto"

const setToken = jest.fn()
const render = (
  result: { data?: { logout: LogoutResponse }; errors?: GraphQLError[] } = {}
): RenderResult =>
  _render(
    <SessionContext.Provider value={new Session({ setToken })}>
      <MockedProvider
        addTypename={false}
        mocks={[{ request: { query: QUERY }, result }]}
      >
        <MemoryRouter>
          <Logout />
        </MemoryRouter>
      </MockedProvider>
    </SessionContext.Provider>
  )

describe("Logout", () => {
  it("logs the user out from the current session", async () => {
    render({ data: { logout: { ok: true } } })
    await waitFor(() => expect(setToken).toBeCalledWith(undefined))
  })
})
