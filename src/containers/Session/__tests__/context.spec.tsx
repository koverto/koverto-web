import { render } from "@testing-library/react"
import { ErrorResponse } from "apollo-link-error"
import * as React from "react"
import { Session, useSession } from "../context"

const errorResponse = (statusCode: number = null): ErrorResponse => {
  const err: ErrorResponse = {
    operation: null,
    forward: null,
  }

  if (statusCode) {
    err.networkError = {
      name: "test error",
      message: "test error",
      statusCode,
      response: null,
      result: null,
    }
  }

  return err
}

describe("Session", () => {
  it("instantiates with default values", () => {
    const session = new Session()

    expect(session.basePath).toBe("/")
    expect(session.loginPath).toBe("/login")
    expect(session.isLoggedIn()).toBe(false)
    expect(session.setToken("")).toBeNull()
  })

  describe("handleError", () => {
    const session = new Session({ setToken: jest.fn() })

    it("sets the token to null if handling an HTTP 401 error", () => {
      session.handleError(errorResponse(401))
      expect(session.setToken).toBeCalledWith(null)
    })

    it("does not set the token if handling any other HTTP error", () => {
      session.handleError(errorResponse(503))
      expect(session.setToken).not.toBeCalled()
    })

    it("does not set the token if handling a non-network error", () => {
      session.handleError(errorResponse())
      expect(session.setToken).not.toBeCalled()
    })
  })
})

const Component = (): JSX.Element => {
  useSession()

  return <div />
}

describe("useSession", () => {
  beforeAll(() => {
    console.error = jest.fn()
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  it("throws if called outside of a SessionProvider", () => {
    expect(() => {
      render(<Component />)
    }).toThrow("useSession must be used within a SessionProvider")
  })
})
