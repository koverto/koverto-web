import { xor } from "."

describe("xor", () => {
  test("true ^^ true === false", () => {
    expect(xor(true, true)).toBe(false)
  })

  test("true ^^ false === true", () => {
    expect(xor(true, false)).toBe(true)
  })

  test("false ^^ true === true", () => {
    expect(xor(false, true)).toBe(true)
  })

  test("false ^^ false === false", () => {
    expect(xor(false, false)).toBe(false)
  })
})
