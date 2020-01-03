const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
  entry: './src/script.mjs',
  output: {
    path: __dirname + '/public',
    filename: 'script.js'
  },
  plugins: [
    new HtmlWebpackPlugin({filename: './index.html', template: './src/index.html', hash: false, cache: true}),
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // all options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
        ignoreOrder: false, // Enable to remove warnings about conflicting order
      }),  
      new CopyPlugin([
        'favicon',
        'serviceWorker.js'
      ]),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ],
  },
}