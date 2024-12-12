const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: path.join(__dirname, "src"),
    output: {
        path: path.join(__dirname),
        filename: "docs/bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components|projects)/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['@babel/preset-env', '@babel/preset-react'] }
                },
            },
            {
                test: /\.css$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'docs/[name][ext]', // Output path and naming convention
                },
            }
        ]
    },
    resolve: { extensions: ['*', '.js', '.jsx'] },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src/index.html")
        }),
        //new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',  // Use contenthash for production
            chunkFilename: '[id].[contenthash].css',
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname,'docs'),
        },
        port: 3000,
        historyApiFallback: true
    }
};