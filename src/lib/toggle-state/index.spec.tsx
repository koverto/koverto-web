import * as React from "react"
import { toggleState } from "."
import { render } from "@testing-library/react"

const Component = (): JSX.Element => {
  const [toggle, setToggle] = React.useState(false)

  return (
    <div>
      {`${toggle}`}
      <button type="button" onClick={toggleState(setToggle)} />
    </div>
  )
}

describe("toggleState", () => {
  it("toggles the value", () => {
    const { container } = render(<Component />)
    expect(container.textContent).toBe("false")
    container.querySelector("button").click()
    expect(container.textContent).toBe("true")
  })
})
