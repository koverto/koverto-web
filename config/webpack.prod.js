const merge = require("webpack-merge")
const { DefinePlugin } = require("webpack")
const common = require("./webpack.common")

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new DefinePlugin({
      GRAPHQL_ENDPOINT: JSON.stringify("https://api.koverto.com/query"),
    }),
  ],
})
