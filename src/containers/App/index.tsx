import * as React from "react"
import { BrowserRouter } from "react-router-dom"
import { Dashboard } from "../../pages/Dashboard"
import { Login } from "../../pages/Login"
import { ProtectedRoute } from "../../components/ProtectedRoute"
import { SessionProvider } from "../Session"

export const App = (): JSX.Element => {
  return (
    <React.StrictMode>
      <SessionProvider>
        <BrowserRouter>
          <ProtectedRoute authRequired exact path="/" component={Dashboard} />
          <ProtectedRoute path="/login" component={Login} />
        </BrowserRouter>
      </SessionProvider>
    </React.StrictMode>
  )
}
