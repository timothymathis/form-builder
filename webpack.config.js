const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: './index.js',
    styles: './styles/index.scss',
  },

  context: path.resolve(__dirname, 'src'),

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.(scss|sass|css)$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {loader: 'css-loader', options: {minimize: false}},
            {loader: 'sass-loader', options: {sourceMap: false}}
          ]
        })
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin("styles.css"),
  ]
};
