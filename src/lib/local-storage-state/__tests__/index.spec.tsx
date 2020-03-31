import { render } from "@testing-library/react"
import * as React from "react"
import { useStateFromLocalStorage } from ".."
import { toggleState } from "../../toggle-state"

const Component = (): JSX.Element => {
  const [value, setValue] = useStateFromLocalStorage("valueKey", "initial")
  const [toggle, setToggle] = useStateFromLocalStorage("toggleKey", false)
  const [, setClear] = useStateFromLocalStorage("clearKey", "exists")
  const [noInitial] = useStateFromLocalStorage("noInitialKey")

  const handleValueClick = (): void => setValue("clicked")
  const handleClearClick = (): void => setClear(undefined)

  return (
    <div>
      <div data-testid="value">
        {value}
        <button type="button" onClick={handleValueClick} />
      </div>
      <div data-testid="toggle">
        {`${toggle}`}
        <button type="button" onClick={toggleState(setToggle)} />
      </div>
      <div data-testid="noInitial">{`${noInitial}`}</div>
      <button data-testid="clear" type="button" onClick={handleClearClick} />
    </div>
  )
}

describe("useStateFromLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  describe("with a stored value", () => {
    beforeEach(() => {
      localStorage.__STORE__.valueKey = JSON.stringify("stored")
    })

    it("uses the stored value", () => {
      const component = render(<Component />)
      expect(component.getByTestId("value").textContent).toBe("stored")
    })
  })

  describe("without a stored value", () => {
    it("uses the default initial value", () => {
      const component = render(<Component />)
      expect(component.getByTestId("value").textContent).toBe("initial")
    })
  })

  describe("without an initial value", () => {
    it("uses a null initial value", () => {
      const component = render(<Component />)
      expect(component.getByTestId("noInitial").textContent).toBe("null")
    })
  })

  describe("with a static action", () => {
    it("sets the new value", () => {
      const component = render(<Component />)
      component.getByTestId("value").querySelector("button").click()
      expect(localStorage.setItem).toBeCalledWith(
        "valueKey",
        JSON.stringify("clicked")
      )
      expect(component.getByTestId("value").textContent).toBe("clicked")
    })
  })

  describe("with a callback action", () => {
    it("sets the new value from the callback", () => {
      const { getByTestId } = render(<Component />)

      getByTestId("toggle").querySelector("button").click()
      expect(localStorage.setItem).toBeCalledWith(
        "toggleKey",
        JSON.stringify(true)
      )
      expect(getByTestId("toggle").textContent).toBe("true")

      getByTestId("toggle").querySelector("button").click()
      expect(localStorage.setItem).toBeCalledWith(
        "toggleKey",
        JSON.stringify(false)
      )
      expect(getByTestId("toggle").textContent).toBe("false")
    })
  })

  describe("with an undefined value", () => {
    beforeEach(() => {
      localStorage.__STORE__.clearKey = JSON.stringify("stored")
    })

    afterEach(() => {
      localStorage.clear()
    })

    it("removes the item from local storage", () => {
      const { getByTestId } = render(<Component />)
      getByTestId("clear").click()
      expect(localStorage.removeItem).toBeCalledWith("clearKey")
    })
  })
})
