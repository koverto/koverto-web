import * as React from "react"
import { BrowserRouter } from "react-router-dom"
import { ProtectedRoute } from "../../components/ProtectedRoute"
import { Dashboard } from "../../pages/Dashboard"
import { Login } from "../../pages/Login"
import { SignUp } from "../../pages/SignUp"
import { SessionProvider } from "../Session"

export const App = (): JSX.Element => {
  return (
    <React.StrictMode>
      <SessionProvider>
        <BrowserRouter>
          <ProtectedRoute authRequired exact path="/" component={Dashboard} />
          <ProtectedRoute path="/login" component={Login} />
          <ProtectedRoute path="/sign-up" component={SignUp} />
        </BrowserRouter>
      </SessionProvider>
    </React.StrictMode>
  )
}
