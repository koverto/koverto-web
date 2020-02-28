import { render } from "@testing-library/react"
import * as React from "react"
import { toggleState } from "."

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
