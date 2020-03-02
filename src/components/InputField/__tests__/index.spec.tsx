import { render } from "@testing-library/react"
import * as React from "react"
import { InputField } from ".."

describe("InputField", () => {
  it("uses the label attribute for placeholder text", () => {
    const { getByTestId } = render(
      <InputField label="placeholder" name="name" />
    )
    expect(getByTestId("name").getAttribute("placeholder")).toBe("placeholder")
  })

  it("uses the name attribute for placeholder text when label is undefined", () => {
    const { getByTestId } = render(<InputField name="name" />)
    expect(getByTestId("name").getAttribute("placeholder")).toBe("name")
  })
})
