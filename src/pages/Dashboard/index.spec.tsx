import { render } from "@testing-library/react"
import * as React from "react"
import { Dashboard } from "."

describe("Dashboard", () => {
  it("matches the snapshot", () => {
    const { container } = render(<Dashboard />)
    expect(container).toMatchSnapshot()
  })
})
