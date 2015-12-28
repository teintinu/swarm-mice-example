var path = require('path')
var webpack = require('webpack')

var cssLoader = 'style-loader!css-loader?modules'
if (process.env.NODE_ENV !== 'production') {
  cssLoader += '&localIdentName=[name]__[local]___[hash:base64:5]'
}

module.exports = {
  entry: [ './index' ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.css$/, loader: cssLoader },
      { test: /\.(png|gif)$/, loader: 'url-loader?name=[name]@[hash].[ext]&limit=50000' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/, include: __dirname }
    ]
  }
}
