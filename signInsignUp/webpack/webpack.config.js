const path = require('path');
const ROOT = path.resolve(__dirname, '../'); // inputMask/
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
require('dotenv-expand');
const myEnv = dotenv.config();

module.exports = {
  entry: [
    ROOT + '/src/server/main.js'
  ],
  output: {
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        // regular expression to ckeck file which loaded
        test: /\.js?$/,
        exclude: /node_modules/, // ignore
        loader: 'babel-loader'
      },
      {test: /\.html$/, loader: 'html-loader'},
      {test: /\.jpg/, loader: 'file-loader'},
      {test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'},
      {test: /\.css$/, loader: 'style-loader!css-loader!sass-loader'}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify('NODE_ENV')
    }),
    new HtmlWebpackPlugin({
      title: 'ReactModal',
      template: ROOT+'/views/main.html.ejs',
      google_map_api: myEnv.parsed.GOOGLE_MAP_KEY
    })
  ],
  // Files can process without specifying extention file
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devtool: '#source-map',
  devServer: {
    contentBase: './views',
    inline: true,
    hot: true,
    port: myEnv.parsed.APP_PORT
  }
};
