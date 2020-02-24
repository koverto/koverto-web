import * as React from "react"
import { render } from "@testing-library/react"
import { App } from "."

describe("App", () => {
  it("matches the snapshot", () => {
    const { container } = render(<App />)
    expect(container).toMatchSnapshot()
  })
})
