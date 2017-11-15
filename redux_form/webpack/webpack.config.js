const path = require('path');
const ROOT = path.resolve(__dirname, '../'); // basic/

module.exports = {
  entry: [
    ROOT + '/src/server/app.js'
  ],
  module: {
    loaders: [
      {
        // regular expression to ckeck file which loaded
        test: /\.js?$/,
        exclude: /node_modules/, // ignore
        loader: 'babel-loader'
      },
      {test: /\.jpg/, loader: 'file-loader'},
      {test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'},
      {test: /\.css$/, loader: 'style-loader!css-loader!sass-loader'}
    ]
  },
  // Files can process without specifying extention file
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devtool: 'source-map',
  output: {
    // path: path.resolve('src'),
    // path: path.resolve(__dirname, 'src'),
    filename: '[name].js'
  },
  devServer: {
    contentBase: './views',
    inline: true,
    hot: true,
    port: 4000
  }
};
