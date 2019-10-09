const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  devtool: "eval",
  plugins: [
    new MiniCssExtractPlugin({      // 压缩CSS
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader', 
          'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',   // Creates `style` nodes from JS strings
          'css-loader',     // Translates CSS into CommonJS
          'sass-loader',    // Compiles Sass to CSS
        ],
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    overlay: true,
    port: 9000
  },
  mode: "development"
})