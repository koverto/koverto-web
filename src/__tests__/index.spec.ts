import { act } from "@testing-library/react"

describe("entrypoint", () => {
  it("renders the app container", () => {
    act(() => {
      require("../index")
    })
    const app = document.getElementById("app")

    expect(app).not.toBeNull()
    expect(app).toMatchSnapshot()
  })
})
