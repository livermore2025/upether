const path = require('path');
const webpack = require('webpack');
const prod = process.env.NODE_ENV === 'production';

module.exports = {
  mode: prod ? 'production' : 'development',
  devtool: prod ? 'hidden-source-map' : 'eval',
  resolve: {
    extensions: ['.js', '.jsx', 'json'],
  },
  entry: './client',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      // NODE_ENV: prod ? 'development' : 'production',
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist/',
  },
  devServer: {
    devMiddleware: { publicPath: '/dist' },
    static: { directory: path.resolve(__dirname) },
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
};
