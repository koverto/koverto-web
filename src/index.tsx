import * as React from "react"
import * as ReactDOM from "react-dom"
import { App } from "./containers/App"

const app = document.createElement("div")
app.setAttribute("id", "app")

document.body.prepend(app)

ReactDOM.render(<App />, app)
