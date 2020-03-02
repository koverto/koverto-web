import { Query } from "react-apollo-typed-hooks"
import { User } from "./schema"

export class GetUser extends Query<{ getUser: User }, {}> {}
