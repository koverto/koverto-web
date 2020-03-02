import * as React from "react"
import * as ReactDOM from "react-dom"
import { App } from "./containers/App"
import "./styles/main.css"

const app = document.createElement("div")
app.setAttribute("id", "app")
app.setAttribute("class", "bg-gray-400 h-screen flex justify-center")

document.body.prepend(app)

ReactDOM.render(<App />, app)
