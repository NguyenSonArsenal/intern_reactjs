var path = require('path');
const ROOT = path.resolve(__dirname, '../');  // basic/

module.exports = {
  entry: [
    ROOT + '/src/server/app.js'
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,  // regular expression to ckeck file which loaded
        exclude: /node_modules/, // ignore
        loader: 'react-hot-loader!babel-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  },
  //Files can process without specifying extention file
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    //path: path.resolve('src'),
    //path: path.resolve(__dirname, 'src'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './views',
    inline: true,
    hot: true,
    port: 8080
  }
};
