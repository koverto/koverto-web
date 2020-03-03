import { Mutation } from "react-apollo-typed-hooks"
import {
  Authentication,
  LoginResponse,
  LogoutResponse,
  User,
  UserInput,
} from "./schema"

export class CreateUser extends Mutation<
  { createUser: LoginResponse },
  { input: Authentication }
> {}

export class Login extends Mutation<
  { login: LoginResponse },
  { input: Authentication }
> {}

export class Logout extends Mutation<{ logout: LogoutResponse }, {}> {}

export class UpdateUser extends Mutation<
  { updateUser: User },
  { input: UserInput }
> {}
