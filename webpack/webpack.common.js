const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const WebpackBar = require('webpackbar');

module.exports = {
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "..", "dist"),
    filename: "js/[name]-[hash].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,   // 不包含的文件
        use: {
          loader: 'babel-loader',
          // options: { 这里的内容会放到 .babelrc }
        }
      },

      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'img',      //输出文件夹
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '祭先烈 磅礴前行',
      filename: 'index.html',
      template: './public/index.html',
      chunks: ['index']
    }),
    new WebpackBar()
  ]
}