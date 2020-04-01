const merge = require("webpack-merge")
const { DefinePlugin } = require("webpack")
const MiniCSSExtractPlugin = require("mini-css-extract-plugin")
const common = require("./webpack.common")

module.exports = merge.smart(common, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
            options: { esModule: true },
          },
          "css-loader",
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      GRAPHQL_ENDPOINT: JSON.stringify("https://api.koverto.com/query"),
    }),
    new MiniCSSExtractPlugin(),
  ],
})
