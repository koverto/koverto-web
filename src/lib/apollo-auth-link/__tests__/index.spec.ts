import { AuthLink } from ".."

const token = [
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
  "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ",
  "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
].join(".")

const doesNotHaveHeader = (tokenGetter: () => string) => (): void => {
  const link = new AuthLink(tokenGetter)
  expect(link.setHeaders(null, {}).headers).not.toHaveProperty("Authorization")
}

describe("AuthLink", () => {
  describe("with a token", () => {
    const tokenGetter = (): string => token

    it("sets the authorization header", () => {
      const link = new AuthLink(tokenGetter)
      expect(link.setHeaders(null, {}).headers.Authorization).toBe(
        `Bearer ${token}`
      )
    })
  })

  describe("with no token", () => {
    const tokenGetter = (): string => null
    it(
      "does not set a null autorization header",
      doesNotHaveHeader(tokenGetter)
    )
  })

  describe("with empty token", () => {
    const tokenGetter = (): string => ""
    it(
      "does not set an empty autorization header",
      doesNotHaveHeader(tokenGetter)
    )
  })

  describe("with existing headers", () => {
    const tokenGetter = (): string => token

    it("merges the headers", () => {
      const link = new AuthLink(tokenGetter)
      expect(
        link.setHeaders(null, { headers: { foo: "bar" } }).headers
      ).toMatchObject({
        Authorization: `Bearer ${token}`,
        foo: "bar",
      })
    })
  })
})
