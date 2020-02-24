const fs = require("fs")
const merge = require("webpack-merge")
const path = require("path")
const { HotModuleReplacementPlugin, DefinePlugin } = require("webpack")
const common = require("./webpack.common")

const config = merge(common, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.resolve(common.context, "dist"),
    historyApiFallback: true,
    port: process.env.PORT || 9000,
  },
  entry: ["./src/index.tsx"],
  plugins: [
    new HotModuleReplacementPlugin(),
    new DefinePlugin({
      GRAPHQL_ENDPOINT: JSON.stringify("https://localhost:8080/query"),
    }),
  ],
})

try {
  const certPath =
    process.env.TLS_CERT || path.resolve(common.context, "localhost+2.pem")
  const keyPath =
    process.env.TLS_KEY || path.resolve(common.context, "localhost+2-key.pem")

  const cert = fs.readFileSync(certPath)
  const key = fs.readFileSync(keyPath)

  config.devServer.https = { cert, key }
} catch {
  config.devServer.https = true
}

module.exports = config
