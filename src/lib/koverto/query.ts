import { Query } from "../apollo-hooks"
import { User } from "./schema"

export class GetUser extends Query<{ getUser: User }, {}> {}
