import * as React from "react"
import {
  RouteProps,
  RouteComponentProps,
  Redirect,
  Route,
} from "react-router-dom"
import { useSession } from "../../containers/Session"
import { xor } from "../../lib/xor"

interface ProtectedRouteProps extends RouteProps {
  authRequired?: boolean
}

export const ProtectedRoute = ({
  authRequired,
  component: Component,
  ...rest
}: ProtectedRouteProps): JSX.Element => {
  const { basePath, loginPath, isLoggedIn } = useSession()

  const render = (props: RouteComponentProps): JSX.Element =>
    xor(isLoggedIn(), authRequired) ? (
      <Redirect to={authRequired ? loginPath : basePath} />
    ) : (
      <Component {...props} />
    )

  return <Route {...{ render, ...rest }} />
}
