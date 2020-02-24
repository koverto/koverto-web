describe("entrypoint", () => {
  it("renders the app container", () => {
    require("./index")
    const app = document.getElementById("app")

    expect(app).not.toBeNull()
    expect(app).toMatchSnapshot()
  })
})
