const path = require("path");
const webpack = require("webpack");

// TODO: Figure out if this is needed. Doesn't work locally.
const bundlePath = path.resolve(__dirname, "/dist/");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components|projects)/,
        loader: 'babel-loader',
        options: { presets: ['env'] }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
	  {
		  test: /\.(gif|png|jpe?g|svg)$/i,
		  use: [ 'file-loader', 'image-webpack-loader' ]
	  }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    publicPath: '/dist/',
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname,'public'),
    port: 3000
  },
  plugins: [ new webpack.HotModuleReplacementPlugin() ]
};