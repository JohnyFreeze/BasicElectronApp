'use strict'

const path = require('path')
const webpack = require('webpack')

module.exports = {
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader:'style!css!'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader?limit=8192&name=[path][name].[ext]?[hash]'

      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }, {
        test: /\.js?$/,
        loader: 'imports?jQuery=jquery'
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jQuery',
      'windows.jQuery': 'jquery'
    })
  ],
  externals: [
    {
      'socket.io': 'socket.io'
    },
    /^[a-z\-0-9]+$/
  ]
}
