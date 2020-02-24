import * as React from "react"
import * as ReactDOM from "react-dom"

const app = document.createElement("div")
app.setAttribute("id", "app")

document.body.prepend(app)

ReactDOM.render(<h1>Hello, React!</h1>, app)
