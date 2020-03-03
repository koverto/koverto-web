import * as React from "react"
import { Link } from "react-router-dom"

export const Dashboard = (): JSX.Element => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/logout">Logout</Link>
    </div>
  )
}
