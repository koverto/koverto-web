import { render } from "@testing-library/react"
import * as React from "react"
import { App } from "."

describe("App", () => {
  it("matches the snapshot", () => {
    const { container } = render(<App />)
    expect(container).toMatchSnapshot()
  })

  describe("when logged in", () => {
    beforeEach(() => {
      localStorage.clear()
      localStorage.__STORE__.token = JSON.stringify("token")
    })

    it("shows the dashboard", () => {
      const { container } = render(<App />)
      expect(container.textContent).toContain("Dashboard")
    })
  })

  describe("when not logged in", () => {
    beforeEach(() => {
      localStorage.clear()
    })

    it("redirects to login", () => {
      const { container } = render(<App />)
      expect(container.textContent).toContain("Login")
    })
  })
})
