'use strict'

const webpack = require('webpack')
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer')
const baseConfig = require('./webpack.config.base')

const config = Object.create(baseConfig)

config.debug = true

config.devtool = 'cheap-module-eval-source-map'

config.entry = [
  'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
  'font-awesome-webpack!./font-awesome.config.js',
  './assets/js/libs/bootstrap.min.js',
  './src/index'
]

config.output.publicPath = 'http://localhost:3000/dist/'

config.module.loaders.push(
  {
    test: /\.less$/,
    loader: 'style!css?modules&importLoaders=2&sourceMap&browsers=last 2 version!less?outputStyle=expanded&sourceMap'
  }
)

config.stats = {
  // Configure the console output
  colors: true,
  modules: true,
  reasons: true
}

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    __DEV__: true,
    'process.env': {
      NODE_ENV: JSON.stringify('development')
    }
  })
)

config.target = webpackTargetElectronRenderer(config)

module.exports = config
