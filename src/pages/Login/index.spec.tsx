import * as React from "react"
import { render } from "@testing-library/react"
import { Login } from "."

describe("Login", () => {
  it("matches the snapshot", () => {
    const { container } = render(<Login />)
    expect(container).toMatchSnapshot()
  })
})
