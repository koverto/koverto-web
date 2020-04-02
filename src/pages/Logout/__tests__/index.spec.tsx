import { MockedProvider } from "@apollo/react-testing"
import {
  render as _render,
  RenderResult,
  waitFor,
} from "@testing-library/react"
import * as React from "react"
import { MemoryRouter } from "react-router-dom"
import { Logout, QUERY } from ".."
import { Session, SessionContext } from "../../../containers/Session/context"

const setToken = jest.fn()
const render = (result = {}): RenderResult =>
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
