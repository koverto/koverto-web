import * as React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { Dashboard } from "../../pages/Dashboard"

export const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Dashboard} />
    </BrowserRouter>
  )
}
