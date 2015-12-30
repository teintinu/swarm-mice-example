var path = require('path')
var webpack = require('webpack')

var cssLoader = 'style-loader!css-loader?modules'

var plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin()
];

if (process.env.NODE_ENV === 'production') {
  plugins = plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      output: {comments: false}
    }),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    })
  ]);
} else {
  cssLoader += '&localIdentName=[name]__[local]___[hash:base64:5]'
}

module.exports = {
  entry: [ './index' ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: plugins,
  module: {
    loaders: [
      { test: /\.css$/, loader: cssLoader },
      { test: /\.(png|gif)$/, loader: 'url-loader?name=[name]@[hash].[ext]&limit=50000' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/, include: __dirname }
    ]
  }
}
