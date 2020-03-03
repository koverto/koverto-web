import { render } from "@testing-library/react"
import * as React from "react"
import { MemoryRouter } from "react-router-dom"
import { Dashboard } from ".."

describe("Dashboard", () => {
  it("matches the snapshot", () => {
    const { container } = render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    )

    expect(container).toMatchSnapshot()
  })
})
