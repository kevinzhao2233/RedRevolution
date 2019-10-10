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
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // limit: 20000, /* 图片大小小于1000字节限制时会自动转成 base64 码引用*/
              outputPath: 'img',      //输出文件夹
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: 'index.html',
      template: './public/index.html',
      chunks: ['index']
    }),
    new WebpackBar()
  ]
}