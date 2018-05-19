const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.join(__dirname, "src"),
    output: {
        path: path.join(__dirname, "docs"),
        filename: "bundle.js"
    },
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
    plugins: [ 
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src/index.html")
        }),
        new webpack.HotModuleReplacementPlugin() 
    ],
    devServer: {
        contentBase: path.join(__dirname,'docs'),
        port: 3000,
        historyApiFallback: true
    }
};