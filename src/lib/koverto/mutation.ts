import { Mutation } from "react-apollo-typed-hooks"
import { Authentication, LoginResponse, User, UserInput } from "./schema"

export class CreateUser extends Mutation<
  { createUser: LoginResponse },
  { input: Authentication }
> {}

export class Login extends Mutation<
  { login: LoginResponse },
  { input: Authentication }
> {}

export class UpdateUser extends Mutation<
  { updateUser: User },
  { input: UserInput }
> {}
